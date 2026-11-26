import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const soldOut = product.stock <= 0;
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <ProductImage
          product={product}
          index={index}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.summary}</p>
        </div>
        <p className="shrink-0 text-sm font-bold">
          {soldOut ? <span className="text-muted">품절</span> : formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
