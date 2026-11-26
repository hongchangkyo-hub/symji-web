"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";

export function AccountPanel() {
  const { user, ready, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <p className="mt-10 text-sm text-muted">불러오는 중…</p>;
  }

  return (
    <div className="mt-10 space-y-8">
      <dl className="space-y-3 border-y border-line py-6 text-sm">
        <div className="flex gap-6">
          <dt className="w-16 text-muted">이름</dt>
          <dd className="font-semibold">{user.displayName || "-"}</dd>
        </div>
        <div className="flex gap-6">
          <dt className="w-16 text-muted">이메일</dt>
          <dd className="font-semibold">{user.email || "-"}</dd>
        </div>
      </dl>
      <p className="text-sm text-muted">주문 내역과 배송지 관리는 결제 기능과 함께 추가돼요.</p>
      <div className="flex gap-3">
        <Link
          href="/shop"
          className="rounded-full bg-brown px-6 py-3 text-sm font-bold text-pink hover:bg-brown-deep"
        >
          쇼핑 계속하기
        </Link>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            router.replace("/");
          }}
          className="rounded-full border border-charcoal/20 px-6 py-3 text-sm font-bold hover:bg-paper"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
