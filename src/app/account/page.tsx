import type { Metadata } from "next";
import { AccountPanel } from "./account-panel";

export const metadata: Metadata = { title: "내 정보" };

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-brown">My page</p>
      <h1 className="mt-2 text-3xl font-black">내 정보</h1>
      <AccountPanel />
    </section>
  );
}
