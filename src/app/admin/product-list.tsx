"use client";

import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDb } from "@/lib/firebase/client";
import { formatPrice } from "@/lib/format";
import { toProduct } from "@/lib/product-mapper";
import type { Product } from "@/lib/types";

export function AdminProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getDb();
    if (!db) return;
    getDocs(collection(db, "products"))
      .then((snap) =>
        setProducts(
          snap.docs
            .map((d) => toProduct(d.id, d.data()))
            .sort((a, b) => a.sortOrder - b.sortOrder),
        ),
      )
      .catch((e) => {
        console.error(e);
        setError("상품 목록을 불러오지 못했어요.");
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brown">Admin</p>
          <h1 className="mt-1 text-3xl font-black">상품 관리</h1>
        </div>
        <Link
          href="/admin/product"
          className="rounded-full bg-brown px-6 py-3 text-sm font-bold text-pink hover:bg-brown-deep"
        >
          + 상품 추가
        </Link>
      </div>

      {error && <p className="mt-8 text-sm font-semibold text-brown">{error}</p>}
      {!error && products === null && <p className="mt-8 text-sm text-muted">불러오는 중…</p>}
      {products?.length === 0 && (
        <p className="mt-16 text-center text-muted">
          아직 상품이 없어요. ‘상품 추가’로 첫 상품을 등록해 보세요.
        </p>
      )}

      {!!products?.length && (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl bg-white">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/product?id=${encodeURIComponent(p.id)}`}
                className="flex items-center gap-4 px-4 py-4 hover:bg-pink-soft sm:px-6"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-pink">
                  {p.imageUrls[0] && (
                    // 관리 화면 썸네일이라 최적화 없이 바로 표시
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrls[0]} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{p.name || "(이름 없음)"}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {formatPrice(p.price)} · 재고 {p.stock} · 순서 {p.sortOrder}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    p.isActive ? "bg-brown text-pink" : "bg-line text-muted"
                  }`}
                >
                  {p.isActive ? "판매 중" : "숨김"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
