import { Suspense } from "react";
import { ProductEditor } from "./product-editor";

export default function AdminProductPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">불러오는 중…</p>}>
      <ProductEditor />
    </Suspense>
  );
}
