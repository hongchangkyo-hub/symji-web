import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";
import { getProduct, getProducts } from "@/lib/products";

/** 빌드 때 상품 상세 페이지를 미리 만들어 둡니다 */
export async function generateStaticParams() {
  const products = await getProducts();
  // Cache Components 사용 시 최소 1개가 필요해서, 상품이 없으면 자리표시 값을 둡니다
  return products.length
    ? products.map((p) => ({ id: p.id }))
    : [{ id: "__placeholder__" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "상품을 찾을 수 없어요" };
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: PageProps<"/shop/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const soldOut = product.stock <= 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-sm text-muted" aria-label="경로">
        <Link href="/shop" className="hover:text-brown">
          상품
        </Link>
        <span aria-hidden> / </span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <ProductImage
          product={product}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
        />

        <div className="md:pt-4">
          <h1 className="text-3xl font-black leading-snug">{product.name}</h1>
          <p className="mt-3 text-muted">{product.summary}</p>
          <p className="mt-6 text-2xl font-black">{formatPrice(product.price)}</p>

          <dl className="mt-8 space-y-2 border-y border-line py-5 text-sm">
            <div className="flex gap-6">
              <dt className="w-16 text-muted">배송비</dt>
              <dd>3,000원 (5만 원 이상 무료) · 임시</dd>
            </div>
            <div className="flex gap-6">
              <dt className="w-16 text-muted">재고</dt>
              <dd>{soldOut ? "품절" : "구매 가능"}</dd>
            </div>
          </dl>

          {/* 4·5단계(로그인, 장바구니·결제)에서 실제 동작을 붙입니다 */}
          <button
            type="button"
            disabled
            className="mt-8 w-full rounded-full bg-brown py-4 text-sm font-bold text-pink disabled:opacity-50"
          >
            {soldOut ? "품절" : "장바구니 담기 (준비 중)"}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            심지는 회원만 구매할 수 있어요. 구글·카카오·네이버로 간편하게 로그인하세요.
          </p>

          <div className="mt-12 whitespace-pre-line leading-[1.7]">
            {product.description}
          </div>
        </div>
      </div>
    </section>
  );
}
