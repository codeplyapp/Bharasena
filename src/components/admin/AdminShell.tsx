"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Mic2,
  Calendar,
  Award,
  Users,
  Handshake,
  Camera,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

interface AdminShellProps {
  children?: React.ReactNode;
  activeTab?: string;
  mode?: string;
}

const ADMIN_TABS = [
  { id: "tentang", label: "Tentang Acara", icon: FileText },
  { id: "guest-star", label: "Guest Star", icon: Mic2 },
  { id: "rundown", label: "Rundown 3 Hari", icon: Calendar },
  { id: "undangan", label: "Tamu Undangan", icon: Award },
  { id: "panitia", label: "Susunan Panitia", icon: Users },
  { id: "proposal-cp", label: "Proposal & CP", icon: Handshake },
  { id: "dokumentasi", label: "Dokumentasi Foto", icon: Camera },
];

export function AdminShell({
  children,
  activeTab = "tentang",
  mode = "pre",
}: AdminShellProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-stone-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-charcoal-950 border-b border-stone-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.webp"
              alt="Logo BHARASENA"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-cinzel font-bold text-base sm:text-lg text-gold-400 block leading-tight tracking-wide">
              Admin Panel BHARASENA
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              Mode Sistem:{" "}
              <span
                className={`font-semibold uppercase ${
                  mode === "event" ? "text-crimson-400" : "text-emerald-400"
                }`}
              >
                {mode === "event" ? "Event Mode (Live)" : "Pre-Event (Proposal)"}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
            <Link href="/" target="_blank">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              <span>Lihat Website</span>
            </Link>
          </Button>

          <Button
            onClick={handleLogout}
            size="sm"
            variant="ghost"
            className="text-stone-400 hover:text-crimson-400 hover:bg-crimson-600/10"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            <span>Keluar</span>
          </Button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 p-1.5 rounded-2xl bg-charcoal-850/80 border border-stone-800">
            {ADMIN_TABS.map((tab) => {
              const IconComp = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-crimson-600 text-white font-semibold shadow-md"
                      : "text-stone-400 hover:text-stone-200 hover:bg-charcoal-800"
                  }`}
                >
                  <IconComp
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-white" : "text-gold-400"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 min-w-0">
          <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-850/60 border border-stone-800 shadow-xl min-h-[500px]">
            {children ? (
              children
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 text-stone-400 space-y-3">
                <Sparkles className="w-8 h-8 text-gold-400/60" />
                <h3 className="text-lg font-bold text-stone-200">
                  Panel Tab:{" "}
                  {ADMIN_TABS.find((t) => t.id === currentTab)?.label}
                </h3>
                <p className="text-xs sm:text-sm max-w-md text-stone-500">
                  Komponen form siap dihubungkan dengan Server Action database PostgreSQL.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
