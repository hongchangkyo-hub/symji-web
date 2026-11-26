import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "장바구니" };

export default function Page() {
  return (
    <ComingSoon eyebrow="Cart" title="장바구니">
      <p>장바구니와 토스페이먼츠 결제는 5단계에서 만들어요.</p>
    </ComingSoon>
  );
}
