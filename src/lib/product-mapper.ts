import type { DocumentData } from "firebase/firestore";
import type { Product } from "./types";

/** Firestore 문서 → Product (빠진 값은 기본값으로) */
export function toProduct(id: string, data: DocumentData): Product {
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
