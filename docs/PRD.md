# PRD — Product Requirements Document
## Website Informasi Prom Night BHARASENA
**Batalyon Bhara Arsa Nawasena · SMAN 2 Taruna Bhayangkara**
**Versi 1.0 · September 2026**

---

## 1. Ringkasan Produk

Website one-page scroll sebagai portal informasi resmi Prom Night Taruna Bhayangkara 6 — BHARASENA (11–13 Desember 2026). Website berfungsi ganda: menarik sponsor sebelum acara, dan mendokumentasikan momen selama acara berlangsung.

---

## 2. Tujuan Produk

```mermaid
mindmap
  root((BHARASENA Website))
    Informasi
      Rundown acara 3 hari
      Profil guest star
      Susunan kepanitiaan
      Tamu undangan resmi
    Sponsorship
      Proposal kegiatan
      Paket sponsorship
      Proposal UMKM
      Kontak humas
    Dokumentasi
      Galeri foto Day 1
      Galeri foto Day 2
      Galeri foto Day 3
    Manajemen
      Admin panel
      CRUD konten
      Upload foto Cloudinary
```

---

## 3. Pengguna & Kebutuhan

```mermaid
journey
    title User Journey — Calon Sponsor
    section Menemukan Website
      Menerima link dari panitia: 5: Sponsor
      Membuka website: 4: Sponsor
    section Mencari Informasi
      Membaca tentang acara: 4: Sponsor
      Melihat profil guest star: 3: Sponsor
      Membaca rundown 3 hari: 3: Sponsor
    section Keputusan Sponsorship
      Mengunduh proposal kegiatan: 5: Sponsor
      Mengunduh paket sponsorship: 5: Sponsor
      Menghubungi CP via WA: 5: Sponsor
```

```mermaid
journey
    title User Journey — Pengunjung Umum (Hari-H)
    section Akses Website
      Scan QR / buka link: 5: Pengunjung
    section Eksplorasi
      Cek rundown hari ini: 5: Pengunjung
      Lihat siapa guest star: 4: Pengunjung
    section Dokumentasi
      Lihat galeri foto hari ini: 5: Pengunjung
      Share foto ke sosmed: 4: Pengunjung
```

---

## 4. Fitur & Prioritas

```mermaid
quadrantChart
    title Prioritas Fitur
    x-axis Kompleksitas Rendah --> Kompleksitas Tinggi
    y-axis Dampak Rendah --> Dampak Tinggi
    quadrant-1 Wajib dikerjakan
    quadrant-2 Dikerjakan tapi bisa disederhanakan
    quadrant-3 Bisa dihapus
    quadrant-4 Dikerjakan nanti
    Hero + Navbar: [0.15, 0.90]
    Tentang Acara: [0.20, 0.80]
    Rundown 3 Hari: [0.35, 0.88]
    Guest Star: [0.25, 0.75]
    Tamu Undangan: [0.20, 0.65]
    Susunan Panitia: [0.30, 0.60]
    Proposal + CP: [0.40, 0.92]
    Galeri Dokumentasi: [0.70, 0.88]
    Admin Panel CRUD: [0.75, 0.85]
    Upload Cloudinary: [0.65, 0.78]
    Mode Pre/Event Otomatis: [0.50, 0.95]
    Footer: [0.10, 0.40]
```

---

## 5. Logika Mode Konten

```mermaid
stateDiagram-v2
    [*] --> CekTanggal : Request masuk (server-side)
    CekTanggal --> PreEvent : Tanggal < 11 Des 2026
    CekTanggal --> EventMode : Tanggal ≥ 11 Des 2026

    state PreEvent {
        [*] --> TampilProposal
        TampilProposal --> SembunyikanGaleri
    }

    state EventMode {
        [*] --> TampilGaleri
        TampilGaleri --> SembunyikanProposal
    }

    PreEvent --> [*] : Render halaman
    EventMode --> [*] : Render halaman
```

---

## 6. Batasan & Asumsi

```mermaid
block-beta
    columns 3
    A["✅ Dalam Scope"] B["❌ Di Luar Scope"] C["⚠️ Asumsi"]
    D["One-page scroll"] E["Aplikasi mobile native"] F["Cloudinary sudah tersedia"]
    G["Admin panel sederhana"] H["Multi-bahasa (EN/ID)"] I["Konten placeholder dulu"]
    J["Foto via Cloudinary"] K["Pendaftaran tiket online"] L["Server/VPS disiapkan nanti"]
    M["Mode pre/event otomatis"] N["Live streaming embed"] O["1 admin password, 1 orang"]
    P["Docker Compose deploy"] Q["Integrasi payment gateway"] R["Domain belum ditentukan"]
```

---

## 7. Timeline Pengembangan

```mermaid
gantt
    title Timeline Pengembangan Website Bharasena
    dateFormat  YYYY-MM-DD
    section Setup
        Scaffold Next.js + Prisma      :a1, 2026-09-29, 2d
        Token tema + Shadcn/UI         :a2, after a1, 1d
    section Backend
        Schema DB + Seed               :b1, after a2, 2d
        Lib (mode, auth, cloudinary)   :b2, after b1, 1d
    section Frontend
        Section public (navbar–footer) :c1, after b1, 5d
        Admin panel + actions          :c2, after c1, 3d
    section Devops
        Dockerfile + Compose           :d1, after c2, 1d
        Deploy & SSL                   :d2, after d1, 1d
    section Konten
        Input konten resmi             :e1, after d1, 7d
        Upload foto (hari-H)           :e2, 2026-12-11, 3d
```

---

*Dokumen ini merupakan bagian dari paket dokumentasi Bharasena Website v1.0*
