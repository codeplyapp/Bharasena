# BHARASENA — Website Prom Night Taruna Bhayangkara 6
> Batalyon Bhara Arsa Nawasena · SMAN 2 Taruna Bhayangkara · 11–13 Desember 2026

```mermaid
graph LR
    A["🎓 BHARASENA"] --> B["📋 Informasi Acara"]
    A --> C["💰 Proposal Sponsorship"]
    A --> D["📸 Galeri Dokumentasi"]
    A --> E["🔐 Admin Panel"]
```

---

## Stack

```mermaid
graph TD
    FE["Frontend\nNext.js 14 · TypeScript\nTailwind CSS v4 · Shadcn/UI"]
    BE["Backend\nNext.js Server Components\nServer Actions"]
    DB["Database\nPostgreSQL 16\nPrisma ORM"]
    ST["Storage\nCloudinary\nfoto dokumentasi"]
    DP["Deploy\nDocker Compose\nCaddy SSL"]

    FE --> BE --> DB
    BE --> ST
    DP --- FE
```

---

## Prasyarat

```mermaid
flowchart LR
    A["Node.js ≥ 18 LTS"] --> OK
    B["Docker + Compose v2"] --> OK
    C["Akun Cloudinary"] --> OK
    D["Git"] --> OK
    OK["✅ Siap Install"]
```

---

## Instalasi & Menjalankan

### 1. Clone & Setup Env

```bash
git clone https://github.com/codeplyapp/Bharasena.git
cd Bharasena
cp .env.example .env
# Isi semua variabel di .env
```

### 2. Jalankan dengan Docker Compose

```bash
docker compose up -d
```

```mermaid
sequenceDiagram
    participant Dev
    participant Compose as Docker Compose
    participant DB as PostgreSQL
    participant App as Next.js App

    Dev->>Compose: docker compose up -d
    Compose->>DB: Start postgres:16-alpine
    DB->>Compose: Healthy ✅
    Compose->>App: Start Next.js standalone
    App->>DB: prisma migrate deploy
    App->>DB: prisma db seed
    App->>Compose: Ready :3000 ✅
    Dev->>Dev: Buka http://localhost:3000
```

### 3. (Alternatif) Development Lokal

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

---

## Struktur Folder

```mermaid
graph TD
    ROOT["bharasena/"] --> SRC["src/"]
    ROOT --> PRISMA["prisma/ (schema + seed)"]
    ROOT --> DOCKER["docker-compose.yml"]
    ROOT --> ENV[".env.example"]

    SRC --> APP["app/ (routes & pages)"]
    SRC --> COMP["components/ (UI)"]
    SRC --> LIB["lib/ (prisma · mode · cloudinary · auth)"]

    APP --> PUB["/ → halaman publik"]
    APP --> ADM["/admin → panel admin"]
    APP --> API["/api → upload · auth"]
```

---

## Konfigurasi Environment

```mermaid
block-beta
    columns 2
    H1["Variabel"] H2["Keterangan"]
    A1["DATABASE_URL"] A2["URL koneksi PostgreSQL"]
    B1["ADMIN_PASSWORD"] B2["Password login /admin"]
    C1["CLOUDINARY_CLOUD_NAME"] C2["Nama cloud Cloudinary kamu"]
    D1["CLOUDINARY_API_KEY"] D2["API Key dari dashboard Cloudinary"]
    E1["CLOUDINARY_API_SECRET"] E2["⚠️ Jangan di-commit ke Git!"]
    F1["CLOUDINARY_UPLOAD_PRESET"] F2["Unsigned preset untuk upload foto"]
    G1["NEXT_PUBLIC_BASE_URL"] G2["URL domain publik website"]
```

---

## Cara Kerja Mode Pre-Event vs Event

```mermaid
timeline
    title Timeline Konten Website Bharasena
    section Sebelum 11 Des 2026
        Pre-Event Mode : Proposal Kegiatan tampil
                       : Proposal Sponsorship tampil
                       : Proposal UMKM tampil
                       : Galeri tersembunyi
    section 11–13 Des 2026
        Event Mode : Galeri Day 1/2/3 tampil
                   : Foto real-time diupload admin
                   : Proposal tersembunyi
```

---

## Perintah Berguna

```bash
# Masuk ke admin panel
open http://localhost:3000/admin

# Reset database & seed ulang
npx prisma migrate reset

# Build production
npm run build

# Cek tipe TypeScript
npm run typecheck

# Lint
npm run lint

# Deploy ulang setelah update kode
docker compose build && docker compose up -d
```

---

## Kontribusi (Tim Panitia Dev)

```mermaid
gitGraph
    commit id: "init: scaffold next.js"
    commit id: "feat: prisma schema + seed"
    branch feature/public-sections
    checkout feature/public-sections
    commit id: "feat: hero + navbar"
    commit id: "feat: tentang + rundown"
    commit id: "feat: guest star + panitia"
    checkout main
    merge feature/public-sections id: "merge: public sections"
    branch feature/admin
    checkout feature/admin
    commit id: "feat: admin login"
    commit id: "feat: admin CRUD"
    commit id: "feat: upload cloudinary"
    checkout main
    merge feature/admin id: "merge: admin panel"
    commit id: "chore: dockerfile + compose"
    commit id: "deploy: production v1.0"
```

---

## Lisensi

Proyek internal Prom Night SMAN 2 Taruna Bhayangkara · Batalyon Bhara Arsa Nawasena 2026.
Tidak untuk distribusi publik.

---

*BHARASENA · Bhara Arsa Nawasena · Batalyon 6 · 2026*
