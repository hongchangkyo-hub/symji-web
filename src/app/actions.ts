"use server";

import { updateTag } from "next/cache";

/**
 * 관리자 페이지에서 상품을 저장한 뒤 호출합니다.
 * 상품 목록 캐시를 비워 사이트에 바로 반영되게 합니다.
 * (데이터를 바꾸는 게 아니라 캐시만 비우므로 누가 호출해도 안전합니다)
 */
export async function refreshProducts(productId?: string) {
  updateTag("products");
  if (productId) updateTag(`product:${productId}`);
}
