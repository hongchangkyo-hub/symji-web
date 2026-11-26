"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { refreshProducts } from "@/app/actions";
import { getDb } from "@/lib/firebase/client";
import { getFirebaseStorage } from "@/lib/firebase/storage";
import { toProduct } from "@/lib/product-mapper";

type Form = {
  name: string;
  price: string;
  summary: string;
  description: string;
  stock: string;
  sortOrder: string;
  isActive: boolean;
  imageUrls: string[];
};

const EMPTY: Form = {
  name: "",
  price: "",
  summary: "",
  description: "",
  stock: "0",
  sortOrder: "10",
  isActive: true,
  imageUrls: [],
};

const MAX_IMAGE_MB = 10;

export function ProductEditor() {
  const router = useRouter();
  const editingId = useSearchParams().get("id");
  const isNew = !editingId;

  const [form, setForm] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const db = getDb();
    if (!editingId || !db) return;
    getDoc(doc(db, "products", editingId))
      .then((snap) => {
        if (!snap.exists()) {
          setMessage("상품을 찾을 수 없어요.");
          return;
        }
        const p = toProduct(snap.id, snap.data());
        setForm({
          name: p.name,
          price: String(p.price),
          summary: p.summary,
          description: p.description,
          stock: String(p.stock),
          sortOrder: String(p.sortOrder),
          isActive: p.isActive,
          imageUrls: p.imageUrls,
        });
      })
      .catch(() => setMessage("상품을 불러오지 못했어요."))
      .finally(() => setLoading(false));
  }, [editingId]);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleUpload(files: FileList | null) {
    const storage = getFirebaseStorage();
    if (!files?.length || !storage) return;
    setUploading(true);
    setMessage(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
          setMessage(`${file.name}: ${MAX_IMAGE_MB}MB 이하 사진만 올릴 수 있어요.`);
          continue;
        }
        const safeName = file.name.replace(/[^\w.-]+/g, "_");
        const fileRef = ref(storage, `products/${Date.now()}-${safeName}`);
        await uploadBytes(fileRef, file, { contentType: file.type });
        urls.push(await getDownloadURL(fileRef));
      }
      setForm((f) => ({ ...f, imageUrls: [...f.imageUrls, ...urls] }));
    } catch (e) {
      console.error(e);
      setMessage(
        "사진을 올리지 못했어요. Firebase Storage가 켜져 있고 규칙이 게시됐는지 확인해 주세요.",
      );
    } finally {
      setUploading(false);
    }
  }

  function moveImage(index: number, dir: -1 | 1) {
    setForm((f) => {
      const next = [...f.imageUrls];
      const target = index + dir;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, imageUrls: next };
    });
  }

  function removeImage(index: number) {
    setForm((f) => ({ ...f, imageUrls: f.imageUrls.filter((_, i) => i !== index) }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const db = getDb();
    if (!db) return;

    const price = Number(form.price);
    const stock = Number(form.stock);
    const sortOrder = Number(form.sortOrder);
    if (!form.name.trim()) return setMessage("상품 이름을 입력해 주세요.");
    if (!Number.isInteger(price) || price < 0) return setMessage("가격은 0 이상의 숫자로 입력해 주세요.");
    if (!Number.isInteger(stock) || stock < 0) return setMessage("재고는 0 이상의 숫자로 입력해 주세요.");
    if (!Number.isFinite(sortOrder)) return setMessage("정렬 순서는 숫자로 입력해 주세요.");

    setSaving(true);
    setMessage(null);
    try {
      const productRef = editingId
        ? doc(db, "products", editingId)
        : doc(collection(db, "products"));
      await setDoc(
        productRef,
        {
          name: form.name.trim(),
          price,
          summary: form.summary.trim(),
          description: form.description.trim(),
          stock,
          sortOrder,
          isActive: form.isActive,
          imageUrls: form.imageUrls,
          updatedAt: serverTimestamp(),
          ...(isNew ? { createdAt: serverTimestamp() } : {}),
        },
        { merge: true },
      );
      await refreshProducts(productRef.id);
      router.push("/admin");
    } catch (e) {
      console.error(e);
      setMessage("저장하지 못했어요. 관리자 권한과 Firestore 규칙을 확인해 주세요.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    const db = getDb();
    if (!db || !editingId) return;
    if (!confirm(`‘${form.name}’ 상품을 삭제할까요? 되돌릴 수 없어요.\n판매만 멈추려면 ‘판매 중’ 체크를 끄세요.`)) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "products", editingId));
      await refreshProducts(editingId);
      router.push("/admin");
    } catch (e) {
      console.error(e);
      setMessage("삭제하지 못했어요.");
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-muted">불러오는 중…</p>;

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none focus:border-brown";

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-muted hover:text-brown">
        ← 상품 목록
      </Link>
      <h1 className="mt-3 text-3xl font-black">{isNew ? "상품 추가" : "상품 수정"}</h1>

      <div className="mt-8 space-y-6 rounded-2xl bg-white p-5 sm:p-8">
        <label className="block text-sm font-bold">
          상품 이름 *
          <input className={field} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </label>

        <div className="grid gap-6 sm:grid-cols-3">
          <label className="block text-sm font-bold">
            가격 (원) *
            <input
              className={field}
              inputMode="numeric"
              value={form.price}
              onChange={(e) => update("price", e.target.value.replace(/[^\d]/g, ""))}
            />
          </label>
          <label className="block text-sm font-bold">
            재고
            <input
              className={field}
              inputMode="numeric"
              value={form.stock}
              onChange={(e) => update("stock", e.target.value.replace(/[^\d]/g, ""))}
            />
          </label>
          <label className="block text-sm font-bold">
            정렬 순서
            <input
              className={field}
              inputMode="numeric"
              value={form.sortOrder}
              onChange={(e) => update("sortOrder", e.target.value.replace(/[^\d-]/g, ""))}
            />
            <span className="mt-1 block text-xs font-medium text-muted">작을수록 앞에 보여요</span>
          </label>
        </div>

        <label className="block text-sm font-bold">
          한 줄 소개
          <input
            className={field}
            value={form.summary}
            onChange={(e) => update("summary", e.target.value)}
            placeholder="상품 목록에 보이는 짧은 설명"
          />
        </label>

        <label className="block text-sm font-bold">
          상세 설명
          <textarea
            className={`${field} min-h-48 leading-relaxed`}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="줄바꿈이 그대로 보여요"
          />
        </label>

        <div>
          <p className="text-sm font-bold">사진</p>
          <p className="mt-1 text-xs text-muted">첫 번째 사진이 대표 사진이에요. 정사각형 사진이 가장 잘 보여요.</p>
          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {form.imageUrls.map((url, i) => (
              <li key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="aspect-square w-full rounded-lg object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-charcoal px-1.5 py-0.5 text-[10px] font-bold text-pink">
                    대표
                  </span>
                )}
                <div className="mt-1 flex justify-between text-xs">
                  <button type="button" onClick={() => moveImage(i, -1)} className="px-1.5 py-1" aria-label="앞으로">◀</button>
                  <button type="button" onClick={() => removeImage(i)} className="px-1.5 py-1 font-bold text-brown">삭제</button>
                  <button type="button" onClick={() => moveImage(i, 1)} className="px-1.5 py-1" aria-label="뒤로">▶</button>
                </div>
              </li>
            ))}
            <li>
              <label className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line text-xs font-bold text-muted hover:border-brown hover:text-brown">
                {uploading ? "올리는 중…" : "+ 사진 추가"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  disabled={uploading}
                  onChange={(e) => {
                    handleUpload(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </li>
          </ul>
        </div>

        <label className="flex items-center gap-3 text-sm font-bold">
          <input
            type="checkbox"
            className="h-5 w-5 accent-[#994429]"
            checked={form.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
          />
          판매 중 (끄면 사이트에서 숨겨져요)
        </label>
      </div>

      {message && (
        <p role="alert" className="mt-4 text-sm font-semibold text-brown">
          {message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-brown px-8 py-3.5 text-sm font-bold text-pink hover:bg-brown-deep disabled:opacity-50"
        >
          {saving ? "저장 중…" : "저장"}
        </button>
        {!isNew && (
          <Link
            href={`/shop/${editingId}`}
            target="_blank"
            className="rounded-full border border-charcoal/20 px-6 py-3.5 text-sm font-bold hover:bg-white"
          >
            사이트에서 보기
          </Link>
        )}
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving}
            className="ml-auto text-sm font-bold text-muted hover:text-brown"
          >
            상품 삭제
          </button>
        )}
      </div>
    </form>
  );
}
