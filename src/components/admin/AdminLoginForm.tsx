"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, KeyRound, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Silakan masukkan password admin.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 401) {
        setError("Password salah. Silakan coba lagi.");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal melakukan autentikasi.");
      }

      // Login berhasil
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kendala saat login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-charcoal-850/90 border border-stone-800 shadow-2xl backdrop-blur-md">
      <div className="text-center mb-8">
        <div className="relative w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,203,86,0.3)]">
          <Image
            src="/logo.webp"
            alt="Logo BHARASENA"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="font-display text-2xl font-bold text-stone-100">
          Admin Portal <span className="text-gold-400">BHARASENA</span>
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Prom Night Taruna Bhayangkara 6 · 2026
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-stone-300 uppercase tracking-wider block"
          >
            Password Admin
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-charcoal-900 border border-stone-700 text-stone-100 text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all"
              autoFocus
            />
            <KeyRound className="w-5 h-5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-crimson-600/15 border border-crimson-500/30 text-crimson-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={loading || !password}
          className="w-full justify-center shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span>Memeriksa Sandi...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              <span>Masuk ke Panel Admin</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
