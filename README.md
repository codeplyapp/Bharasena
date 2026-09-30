# BHARASENA — Website Prom Night Taruna Bhayangkara 6
> Batalyon Bhara Arsa Nawasena · SMAN 2 Taruna Bhayangkara · 11–13 Desember 2026

Website one-page scroll resmi sebagai portal informasi dan dokumentasi Prom Night Taruna Bhayangkara 6 (BHARASENA), dilengkapi panel admin untuk manajemen konten dinamis dan upload dokumentasi acara.

---

## 🚀 Ringkasan Stack Teknologi

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme`)
- **UI Kit**: [Shadcn/UI](https://ui.shadcn.com/) (Dark mode only)
- **ORM & Database**: [Prisma 5](https://www.prisma.io/) + [PostgreSQL 16](https://www.postgresql.org/)
- **Media Storage**: [Cloudinary](https://cloudinary.com/) (Dokumentasi & guest star)
- **Deployment**: [Docker Compose v2](https://docs.docker.com/compose/) + [Caddy 2](https://caddyserver.com/) (Auto SSL)

---

## 📁 Struktur Folder `src/`

```text
src/
├── app/
│   ├── admin/               # Panel admin & login
│   ├── api/                 # Endpoint upload & auth
│   ├── globals.css          # Desain token Tailwind v4 (@theme) & shadcn
│   ├── layout.tsx           # Layout utama + font self-hosted
│   └── page.tsx             # Halaman utama one-page scroll (Server Component)
├── components/
│   ├── admin/               # Komponen UI panel admin
│   ├── sections/            # Section publik (About, GuestStar, Rundown, dsb.)
│   ├── ui/                  # Primitif Shadcn/UI (Button, Dialog, Sheet, dll.)
│   ├── Hero.tsx             # Section hero banner
│   └── Navbar.tsx           # Sticky navbar interaktif
└── lib/
    ├── auth.ts              # Autentikasi sesi admin
    ├── cloudinary.ts        # Helper integrasi Cloudinary
    ├── images.ts            # Helper transformasi URL Cloudinary & optimasi
    ├── mock/                # Fixture data mock dev
    ├── mode.ts              # Kalkulasi mode server (Pre-Event vs Event)
    ├── prisma.ts            # Prisma client singleton
    ├── sections.ts          # Navigasi anchor & section registry
    └── types.ts             # Definisi tipe view-model kontrak frontend-backend
```

---

## ⚡ Panduan Instalasi & Menjalankan

### 1. Development Lokal

```bash
# Salin konfigurasi environment
cp .env.example .env

# Pasang dependensi
npm install

# Migrasi & Seed Database
npx prisma migrate dev
npx prisma db seed

# Jalankan server dev
npm run dev
```

### 2. Menjalankan dengan Docker Compose

```bash
docker compose up -d
```

---

## 📚 Dokumen Spesifikasi (Source of Truth)

Dokumen lengkap spesifikasi dan panduan berada di folder `docs/`:

| Dokumen | Deskripsi |
| :--- | :--- |
| [PRD — Product Requirements](file:///e:/BHARASENA%2026/Project/docs/PRD.md) | Ringkasan produk, tujuan, user journey, matriks prioritas, dan timeline |
| [SRS — Software Requirements](file:///e:/BHARASENA%2026/Project/docs/SRS.md) | Kebutuhan fungsional (FR-01 s/d FR-08), NFR, use case, dan status matriks |
| [TSD — Technical Specification](file:///e:/BHARASENA%2026/Project/docs/TSD.md) | Arsitektur, ERD database, alur auth/upload/mode, docker & env |
| [USER MANUAL — Panduan Pengguna](file:///e:/BHARASENA%2026/Project/docs/USER_MANUAL.md) | Panduan operasional untuk pengunjung & admin panitia |
| [README Docs](file:///e:/BHARASENA%2026/Project/docs/README.md) | Ringkasan teknis paket dokumentasi |

Asset logo resmi: [assets/Logo.png](file:///e:/BHARASENA%2026/Project/assets/Logo.png) *(Catatan: Asset master ~2.9MB, dioptimasi ke webp pada bundle aplikasi)*.

---

## 🔒 Lisensi & Hak Cipta

Proyek internal Prom Night SMAN 2 Taruna Bhayangkara · Batalyon Bhara Arsa Nawasena 2026.
Bukan untuk distribusi publik.
