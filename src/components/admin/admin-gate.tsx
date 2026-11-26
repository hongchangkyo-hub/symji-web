"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

/** 관리자만 내용을 볼 수 있게 막는 문. 실제 보안은 Firestore·Storage 규칙이 담당합니다 */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, ready, isAdmin } = useAuth();

  if (!ready || (user && isAdmin === null)) {
    return <p className="py-20 text-center text-sm text-muted">확인 중…</p>;
  }
  if (!user) {
    return (
      <Notice>
        관리자 계정으로 로그인해 주세요.
        <Link href="/login?next=/admin" className="mt-6 block font-bold text-brown underline">
          로그인하기
        </Link>
      </Notice>
    );
  }
  if (!isAdmin) {
    return (
      <Notice>
        <strong className="block text-charcoal">{user.email}</strong>
        이 계정은 관리자로 등록되어 있지 않아요.
        <span className="mt-4 block text-xs">
          Firebase 콘솔 → Firestore → <code>admins</code> 컬렉션에 이 이메일을 문서 ID로 추가하면
          관리자가 됩니다.
        </span>
      </Notice>
    );
  }
  return <>{children}</>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center text-sm leading-relaxed text-muted">
      {children}
    </div>
  );
}
