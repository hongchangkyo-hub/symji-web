"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";

const ERROR_MESSAGES: Record<string, string> = {
  "auth/popup-closed-by-user": "로그인 창이 닫혔어요. 다시 시도해 주세요.",
  "auth/cancelled-popup-request": "로그인 창이 닫혔어요. 다시 시도해 주세요.",
  "auth/unauthorized-domain":
    "이 주소에서는 아직 로그인을 쓸 수 없어요. (Firebase 승인된 도메인 설정 필요)",
  "auth/operation-not-allowed":
    "구글 로그인이 아직 켜져 있지 않아요. (Firebase Authentication 설정 필요)",
};

/** 로그인 후 돌아갈 주소. 외부 주소로 튕기지 않도록 사이트 안 경로만 허용 */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export function LoginPanel() {
  const { user, ready, signInWithGoogle } = useAuth();
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  async function handleGoogle() {
    setPending(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e) {
      const code = (e as { code?: string }).code ?? "";
      setError(ERROR_MESSAGES[code] ?? "로그인 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.");
      console.error("[login]", e);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10 w-full space-y-3">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={pending || !ready}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-charcoal/15 bg-white py-3.5 text-sm font-bold text-charcoal transition-colors hover:bg-paper disabled:opacity-60"
      >
        <GoogleIcon />
        {pending ? "로그인 중…" : "Google로 계속하기"}
      </button>
      <button
        type="button"
        disabled
        className="w-full rounded-full bg-[#FEE500] py-3.5 text-sm font-bold text-[#191919] opacity-50"
      >
        카카오로 계속하기 (준비 중)
      </button>
      <button
        type="button"
        disabled
        className="w-full rounded-full bg-[#03C75A] py-3.5 text-sm font-bold text-white opacity-50"
      >
        네이버로 계속하기 (준비 중)
      </button>
      {error && (
        <p role="alert" className="pt-2 text-sm font-semibold text-brown">
          {error}
        </p>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
