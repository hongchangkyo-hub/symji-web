"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase/auth";
import { getDb, isFirebaseConfigured } from "@/lib/firebase/client";

type AuthState = {
  user: User | null;
  /** 첫 로그인 상태 확인이 끝났는지 */
  ready: boolean;
  /** Firestore admins/{이메일} 문서가 있는 관리자인지 (확인 전에는 null) */
  isAdmin: boolean | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

/** 처음 로그인한 회원이면 users/{uid} 문서를 만듭니다 */
async function ensureUserProfile(user: User) {
  const db = getDb();
  if (!db) return;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;
  await setDoc(ref, {
    uid: user.uid,
    email: user.email,
    name: user.displayName ?? "",
    phone: user.phoneNumber,
    provider: "google",
    defaultAddress: null,
    createdAt: serverTimestamp(),
  });
}

/** admins/{이메일} 문서가 있으면 관리자 */
async function checkAdmin(user: User): Promise<boolean> {
  const db = getDb();
  if (!db || !user.email) return false;
  try {
    const snap = await getDoc(doc(db, "admins", user.email));
    return snap.exists();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Firebase 설정이 없으면 확인할 로그인 상태도 없으므로 바로 준비 완료
  const [ready, setReady] = useState(!isFirebaseConfigured);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, (next) => {
      setUser(next);
      setReady(true);
      setIsAdmin(next ? null : false);
      if (next) {
        checkAdmin(next).then(setIsAdmin);
        ensureUserProfile(next).catch((error) =>
          console.error("[auth] 회원 정보 저장 실패:", error),
        );
      }
    });
  }, []);

  async function signInWithGoogle() {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase가 설정되지 않았습니다.");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      // 팝업이 막힌 브라우저(일부 모바일·인앱 브라우저)는 페이지 이동 방식으로 재시도
      const code = (error as { code?: string }).code;
      if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
        await signInWithRedirect(auth, provider);
        return;
      }
      throw error;
    }
  }

  async function signOut() {
    const auth = getFirebaseAuth();
    if (auth) await firebaseSignOut(auth);
  }

  return (
    <AuthContext value={{ user, ready, isAdmin, signInWithGoogle, signOut }}>
      {children}
    </AuthContext>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 안에서만 쓸 수 있어요.");
  return ctx;
}
