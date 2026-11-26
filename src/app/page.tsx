import Link from "next/link";
import { Flower, Wordmark } from "@/components/brand/logo";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* 히어로: 심지 브라운 + 핑크 로고타입 */}
      <section className="bg-brown text-pink">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="eyebrow">We plant, you bloom.</p>
          <h1 className="mt-8 w-full max-w-xl">
            <Wordmark className="h-auto w-full" title="Symji 심지" />
          </h1>
          <p className="mt-8 text-lg font-bold sm:text-xl">
            마음의 땅, 심지(心地)
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-pink/85 sm:text-base">
            나를 다정하게 돌보는 셀프 마인드케어 키트로
            <br />
            오늘의 마음에 작은 씨앗을 심어보세요.
          </p>
          <Link
            href="/shop"
            className="mt-10 rounded-full bg-pink px-7 py-3 text-sm font-bold text-brown transition-colors hover:bg-pink-soft"
          >
            상품 보러가기
          </Link>
        </div>
      </section>

      {/* 브랜드 메시지 */}
      <section className="bg-pink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div className="flex items-center gap-4">
            <Flower className="h-16 w-16 shrink-0 text-charcoal" />
            <p className="eyebrow leading-6">
              Plant positivity,
              <br />
              cultivate a healthy mind.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black leading-snug sm:text-3xl">
              I am precious
              <br />
              just as I am.
            </h2>
            <p className="mt-5 leading-[1.7] text-charcoal/85">
              ‘마음 심(心)’과 ‘땅 지(地)’. 심지는 마음에 건강한 자양분을 채워
              더 행복하고 건강한 삶을 살 수 있도록 돕기 위해 태어났습니다.
            </p>
            <Link
              href="/story"
              className="mt-6 inline-block border-b-2 border-charcoal pb-0.5 text-sm font-bold hover:border-brown hover:text-brown"
            >
              브랜드 스토리 읽기
            </Link>
          </div>
        </div>
      </section>

      {/* 상품 */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow text-brown">Shop</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              마음을 가꾸는 도구들
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-bold hover:text-brown">
            전체 보기
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
