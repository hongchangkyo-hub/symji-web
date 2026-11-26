import { cacheLife, cacheTag } from "next/cache";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "./firebase/client";
import { SAMPLE_PRODUCTS } from "./sample-products";
import type { Product } from "./types";

function toProduct(id: string, data: DocumentData): Product {
  return {
    id,
    name: String(data.name ?? ""),
    price: Number(data.price ?? 0),
    summary: String(data.summary ?? ""),
    description: String(data.description ?? ""),
    imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls.map(String) : [],
    stock: Number(data.stock ?? 0),
    isActive: Boolean(data.isActive),
    sortOrder: Number(data.sortOrder ?? 0),
  };
}

/** 판매 중인 상품 목록 (정렬 순서대로) */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const db = getDb();
  if (!db) return SAMPLE_PRODUCTS.filter((p) => p.isActive);

  const snap = await getDocs(
    query(collection(db, "products"), where("isActive", "==", true)),
  );
  return snap.docs
    .map((d) => toProduct(d.id, d.data()))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** 상품 하나 (없거나 판매 중지면 null) */
export async function getProduct(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products", `product:${id}`);

  const db = getDb();
  if (!db) return SAMPLE_PRODUCTS.find((p) => p.id === id && p.isActive) ?? null;

  const snap = await getDoc(doc(db, "products", id));
  if (!snap.exists()) return null;
  const product = toProduct(snap.id, snap.data());
  return product.isActive ? product : null;
}
