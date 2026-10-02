import { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Login Admin — BHARASENA 2026",
  description: "Portal masuk admin panitia Prom Night Taruna Bhayangkara 6.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />

      <AdminLoginForm />
    </div>
  );
}
