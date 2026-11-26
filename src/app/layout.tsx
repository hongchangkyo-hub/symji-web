import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
// 민산스(Min Sans, SIL OFL) 가변 폰트. 화면에 쓰인 글자 묶음만 내려받습니다
import "@/styles/min-sans.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://symji.kr"),
  title: {
    default: "Symji 심지 — 마음의 땅",
    template: "%s | Symji 심지",
  },
  description:
    "Plant positivity, cultivate a healthy mind. 마음의 땅을 가꾸는 셀프 마인드케어 브랜드, 심지(心地).",
  openGraph: {
    siteName: "Symji 심지",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#994429",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
