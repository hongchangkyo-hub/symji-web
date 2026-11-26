"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";

/** 헤더의 로그인 / 내 정보 링크 */
export function AuthNavLink({ className }: { className?: string }) {
  const { user, ready } = useAuth();
  if (ready && user) {
    return (
      <Link href="/account" className={className}>
        내 정보
      </Link>
    );
  }
  return (
    <Link href="/login" className={className}>
      로그인
    </Link>
  );
}
