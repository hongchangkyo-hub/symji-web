import { cacheLife, cacheTag } from "next/cache";
import {
  collection,
  doc,
  getDocFromServer,
  getDocsFromServer,
  query,
  where,
} from "firebase/firestore";
import { getDb } from "./firebase/client";
import { toProduct } from "./product-mapper";
import { SAMPLE_PRODUCTS } from "./sample-products";
import type { Product } from "./types";

/** 판매 중인 상품 목록 (정렬 순서대로) */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const db = getDb();
  if (!db) return SAMPLE_PRODUCTS.filter((p) => p.isActive);

  try {
    const snap = await getDocsFromServer(
      query(collection(db, "products"), where("isActive", "==", true)),
    );
    return snap.docs
      .map((d) => toProduct(d.id, d.data()))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    // Firestore가 아직 만들어지지 않았거나 접근이 막힌 경우: 사이트가 깨지지 않도록 임시 상품 표시
    console.warn("[products] Firestore 읽기 실패, 임시 상품으로 대체:", error);
    return SAMPLE_PRODUCTS.filter((p) => p.isActive);
  }
}

/** 상품 하나 (없거나 판매 중지면 null) */
export async function getProduct(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products", `product:${id}`);

  const db = getDb();
  if (!db) return SAMPLE_PRODUCTS.find((p) => p.id === id && p.isActive) ?? null;

  try {
    const snap = await getDocFromServer(doc(db, "products", id));
    if (!snap.exists()) return null;
    const product = toProduct(snap.id, snap.data());
    return product.isActive ? product : null;
  } catch (error) {
    console.warn(`[products] Firestore 읽기 실패(${id}), 임시 상품으로 대체:`, error);
    return SAMPLE_PRODUCTS.find((p) => p.id === id && p.isActive) ?? null;
  }
}
