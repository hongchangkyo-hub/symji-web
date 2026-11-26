import Image from "next/image";
import { Flower } from "@/components/brand/logo";
import type { Product } from "@/lib/types";

const TONES = [
  "bg-pink text-charcoal",
  "bg-brown text-pink",
  "bg-charcoal text-pink",
] as const;

/** 상품 사진이 없으면 브랜드 컬러 + 꽃 캐릭터 플레이스홀더를 보여줍니다 */
export function ProductImage({
  product,
  index = 0,
  priority = false,
  sizes,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
  sizes: string;
}) {
  const src = product.imageUrls[0];
  if (src) {
    return (
      <div className="relative aspect-square overflow-hidden bg-pink">
        <Image
          src={src}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex aspect-square items-center justify-center ${TONES[index % TONES.length]}`}
      role="img"
      aria-label={`${product.name} 이미지 준비 중`}
    >
      <Flower className="h-1/3 w-1/3" />
    </div>
  );
}
