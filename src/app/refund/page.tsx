import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "교환·환불 정책" };

export default function Page() {
  return (
    <ComingSoon eyebrow="Refund" title="교환·환불 정책">
      <p>PG 심사 전에 꼭 올려야 하는 페이지예요. 6단계에서 내용을 채워요.</p>
    </ComingSoon>
  );
}
