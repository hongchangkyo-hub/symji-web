import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase 웹 앱 설정 (심지 프로젝트: symji-e378e).
 * 이 값들은 브라우저에 그대로 노출되는 공개 설정이라 코드에 넣어도 안전합니다.
 * 실제 보안은 firestore.rules 와 Authentication 설정이 담당합니다.
 * 다른 프로젝트로 바꾸려면 NEXT_PUBLIC_FIREBASE_* 환경변수로 덮어쓰세요.
 */
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyCgKVANkZ8uEhEa2wrdvABlE32ZQ65au6Q",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "symji-e378e.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "symji-e378e",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "symji-e378e.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "565348100519",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:565348100519:web:dea70c3410e618d0a36e82",
};

/** 설정이 비어 있으면 false → 샘플 데이터로 화면만 동작 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore | null {
  const firebaseApp = getFirebaseApp();
  return firebaseApp ? getFirestore(firebaseApp) : null;
}
