import Link from "next/link";
import { Flower } from "@/components/brand/logo";

/**
 * 사업자 정보 — 전자상거래법상 쇼핑몰 하단에 표시해야 합니다.
 * TODO: 실제 정보로 채워주세요. (PG 심사 때도 확인합니다)
 */
const BUSINESS = {
  name: "심지(Symji)",
  ceo: "(대표자명)",
  registrationNo: "(사업자등록번호)",
  mailOrderNo: "(통신판매업 신고번호)",
  address: "(사업장 주소)",
  email: "hello@symji.kr",
  phone: "(고객센터 전화번호)",
};

const POLICIES = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침", strong: true },
  { href: "/refund", label: "교환·환불 정책" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-pink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="eyebrow text-pink/80">Plant positivity,</p>
            <p className="eyebrow text-pink/80">cultivate a healthy mind.</p>
            <Flower className="mt-6 h-10 w-10 text-pink" />
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {POLICIES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={`hover:underline ${"strong" in p ? "font-bold" : ""}`}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-10 grid gap-x-6 gap-y-1 text-xs leading-relaxed text-pink/70 sm:grid-cols-2">
          <div>
            <dt className="inline">상호 </dt>
            <dd className="inline">{BUSINESS.name}</dd>
            <span aria-hidden> · </span>
            <dt className="inline">대표 </dt>
            <dd className="inline">{BUSINESS.ceo}</dd>
          </div>
          <div>
            <dt className="inline">사업자등록번호 </dt>
            <dd className="inline">{BUSINESS.registrationNo}</dd>
          </div>
          <div>
            <dt className="inline">통신판매업 신고 </dt>
            <dd className="inline">{BUSINESS.mailOrderNo}</dd>
          </div>
          <div>
            <dt className="inline">주소 </dt>
            <dd className="inline">{BUSINESS.address}</dd>
          </div>
          <div>
            <dt className="inline">이메일 </dt>
            <dd className="inline">{BUSINESS.email}</dd>
            <span aria-hidden> · </span>
            <dt className="inline">전화 </dt>
            <dd className="inline">{BUSINESS.phone}</dd>
          </div>
        </dl>

        <p className="mt-8 text-[11px] tracking-[0.2em] text-pink/50">
          COPYRIGHT © {2024} SYMJI. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
