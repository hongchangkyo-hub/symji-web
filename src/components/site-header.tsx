import Link from "next/link";
import { AuthNavLink } from "@/components/auth/auth-nav-link";
import { Wordmark } from "@/components/brand/logo";

const NAV = [
  { href: "/story", label: "브랜드 스토리" },
  { href: "/shop", label: "상품" },
  { href: "/cart", label: "장바구니" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-pink-soft/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Symji 홈" className="shrink-0 text-charcoal">
          <Wordmark className="h-6 w-auto sm:h-7" />
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-3 text-[13px] font-semibold sm:gap-6 sm:text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap transition-colors hover:text-brown"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <AuthNavLink className="whitespace-nowrap transition-colors hover:text-brown" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
