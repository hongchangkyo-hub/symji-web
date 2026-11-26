import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "로그인" };

export default function Page() {
  return (
    <ComingSoon eyebrow="Login" title="로그인">
      <p>구글·카카오·네이버 로그인은 4단계에서 만들어요.</p>
    </ComingSoon>
  );
}
