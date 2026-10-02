import { Metadata } from "next";
import { getSiteMode } from "@/lib/data";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Dashboard Admin — BHARASENA 2026",
  description: "Panel manajemen konten Prom Night Taruna Bhayangkara 6.",
};

export default async function AdminPage() {
  const mode = await getSiteMode();

  return (
    <AdminShell mode={mode}>
      <div className="space-y-6">
        <div className="border-b border-stone-800 pb-4">
          <h2 className="font-display text-2xl font-bold text-stone-100">
            Selamat Datang di Panel Admin <span className="font-cinzel text-gold-400 tracking-wide">BHARASENA</span>
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Gunakan tab navigasi di sebelah kiri untuk mengelola konten informasi, susunan panitia, rundown acara, proposal sponsorship, dan galeri dokumentasi foto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-charcoal-800 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">Status Mode Acara</span>
            <span className="font-display text-lg font-bold text-gold-400">
              {mode === "event" ? "Event Mode (Hari-H)" : "Pre-Event (Sponsorship)"}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-800 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">Target Pelaksanaan</span>
            <span className="font-display text-lg font-bold text-stone-100">
              11–13 Des 2026
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-800 border border-stone-800">
            <span className="text-xs text-stone-400 block mb-1">Hak Akses</span>
            <span className="font-display text-lg font-bold text-crimson-400">
              Panitia Terotorisasi
            </span>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
