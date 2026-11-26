import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "상품",
  description: "심지의 셀프 마인드케어 키트와 제품",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-brown">Shop</p>
      <h1 className="mt-2 text-3xl font-black">전체 상품</h1>
      <p className="mt-3 text-sm text-muted">{products.length}개의 상품</p>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          곧 새로운 상품으로 찾아올게요.
        </p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
