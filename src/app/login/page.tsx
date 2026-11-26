import type { Metadata } from "next";
import { Suspense } from "react";
import { Flower } from "@/components/brand/logo";
import { LoginPanel } from "./login-panel";

export const metadata: Metadata = { title: "로그인" };

export default function LoginPage() {
  return (
    <section className="mx-auto flex max-w-sm flex-col items-center px-4 py-20 text-center sm:py-24">
      <Flower className="h-14 w-14 text-brown" />
      <p className="eyebrow mt-8 text-brown">Login</p>
      <h1 className="mt-3 text-3xl font-black">심지에 오신 걸 환영해요</h1>
      <p className="mt-4 text-sm leading-[1.7] text-muted">
        심지는 회원만 구매할 수 있어요.
        <br />
        간편하게 로그인하고 마음의 땅을 가꿔보세요.
      </p>
      <Suspense>
        <LoginPanel />
      </Suspense>
      <p className="mt-8 text-xs leading-relaxed text-muted">
        로그인하면 심지의 이용약관과 개인정보처리방침에 동의하게 됩니다.
      </p>
    </section>
  );
}
