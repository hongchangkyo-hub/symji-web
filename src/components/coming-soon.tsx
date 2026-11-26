import Link from "next/link";
import { Flower } from "@/components/brand/logo";

/** 아직 만들지 않은 페이지에 쓰는 안내 화면 */
export function ComingSoon({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <Flower className="h-14 w-14 text-brown" />
      <p className="eyebrow mt-8 text-brown">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-black">{title}</h1>
      <div className="mt-5 leading-[1.7] text-muted">{children}</div>
      <Link
        href="/"
        className="mt-10 text-sm font-bold underline-offset-4 hover:text-brown hover:underline"
      >
        홈으로
      </Link>
    </section>
  );
}
