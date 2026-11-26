import type { Metadata } from "next";
import { AdminGate } from "@/components/admin/admin-gate";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="bg-paper">
      <div className="mx-auto min-h-[70vh] max-w-5xl px-4 py-10 sm:px-6">
        <AdminGate>{children}</AdminGate>
      </div>
    </div>
  );
}
