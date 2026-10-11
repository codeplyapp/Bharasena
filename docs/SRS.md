# SRS — Software Requirements Specification
## Website Informasi Prom Night BHARASENA
**Batalyon Bhara Arsa Nawasena · SMAN 2 Taruna Bhayangkara**
**Versi 1.0 · September 2026**

---

## 1. Pengantar

Dokumen ini mendefinisikan kebutuhan fungsional dan non-fungsional sistem website BHARASENA, mengikuti format IEEE 830. Sistem ini adalah aplikasi web one-page untuk Prom Night Taruna Bhayangkara 6 yang berlangsung pada 11–13 Desember 2026.

---

## 2. Use Case Diagram

```mermaid
graph TD
    subgraph Aktor
        P[👤 Pengunjung Umum]
        S[💼 Calon Sponsor]
        A[🔐 Admin Panitia]
    end

    subgraph Website Bharasena
        UC1[Lihat informasi acara]
        UC2[Lihat rundown 3 hari]
        UC3[Lihat guest star]
        UC4[Lihat tamu undangan]
        UC5[Lihat susunan panitia]
        UC6[Unduh proposal kegiatan]
        UC7[Unduh proposal sponsorship]
        UC8[Unduh proposal UMKM]
        UC9[Hubungi CP via WhatsApp]
        UC10[Lihat galeri dokumentasi]
        UC11[Login ke admin panel]
        UC12[CRUD semua konten]
        UC13[Upload foto dokumentasi]
        UC14[Override mode pre/event]
    end

    P --> UC1
    P --> UC2
    P --> UC3
    P --> UC4
    P --> UC5
    P --> UC10

    S --> UC1
    S --> UC6
    S --> UC7
    S --> UC8
    S --> UC9

    A --> UC11
    A --> UC12
    A --> UC13
    A --> UC14

    style A fill:#B93636,color:#fff
    style S fill:#FFCB56,color:#1e1e1e
```

---

## 3. Kebutuhan Fungsional

### 3.1 Section Publik

```mermaid
flowchart LR
    subgraph NAV["F01 Navbar"]
        N1[Logo BS]
        N2[Anchor links]
        N3[Sticky pada scroll]
    end

    subgraph HERO["F02 Hero"]
        H1[Nama acara]
        H2[Tagline]
        H3[Badge tanggal 11–13 Des]
        H4[Tempat]
        H5[CTA scroll ke bawah]
    end

    subgraph TENTANG["F03 Tentang"]
        T1[Tujuan acara]
        T2[Harapan acara]
        T3[Arti nama Bhara Arsa Nawasena]
        T4[Filosofi logo]
    end

    subgraph GUEST["F04 Guest Star"]
        G1[Kartu penampil]
        G2[Nama & peran]
        G3[Foto]
    end

    subgraph RUNDOWN["F05 Rundown"]
        R1[Tab Day 1]
        R2[Tab Day 2]
        R3[Tab Day 3]
        R4[Timeline waktu per item]
    end

    subgraph UNDANGAN["F06 Tamu Undangan"]
        U1[Kepala Satuan Pendidikan]
        U2[Wakil Kepala]
        U3[Pembina]
    end

    subgraph PANITIA["F07 Susunan Panitia"]
        P1[Dikelompokkan per divisi]
        P2[Nama + jabatan anggota]
    end
```

### 3.2 Section Kondisional

```mermaid
flowchart TD
    MODE{Mode Server}

    MODE -->|Pre-event| PROPOSAL
    MODE -->|Event| GALERI

    subgraph PROPOSAL["F08 Proposal & Sponsorship (< 11 Des)"]
        PR1[Kartu Proposal Kegiatan + PDF link]
        PR2[Kartu Sponsorship + PDF link]
        PR3[Kartu UMKM + PDF link]
        PR4[Paket sponsorship tiers]
    end

    subgraph GALERI["F09 Galeri Dokumentasi (≥ 11 Des)"]
        GA1[Tab Day 1 / 2 / 3]
        GA2[Grid foto Cloudinary]
        GA3[Caption per foto]
        GA4[Lightbox / expand foto]
    end

    subgraph CP["F10 Kontak Humas (selalu tampil)"]
        CP1[3 CP Humas Acara]
        CP2[3 CP Sponsorship]
        CP3[3 CP UMKM]
        CP4[Tombol WA langsung]
    end

    PROPOSAL --> CP
    GALERI --> CP
```

### 3.3 Admin Panel

```mermaid
flowchart TD
    LOGIN[/admin/login] -->|Password benar| PANEL[Dashboard /admin]

    PANEL --> TAB1[Tab: Tentang]
    PANEL --> TAB2[Tab: Guest Star]
    PANEL --> TAB3[Tab: Rundown]
    PANEL --> TAB4[Tab: Undangan]
    PANEL --> TAB5[Tab: Panitia]
    PANEL --> TAB6[Tab: Proposal & CP]
    PANEL --> TAB7[Tab: Dokumentasi]
    PANEL --> LOGOUT[Logout]

    TAB7 --> UP1[Pilih Day 1/2/3]
    TAB7 --> UP2[Upload foto ke Cloudinary]
    TAB7 --> UP3[Isi caption]
    TAB7 --> UP4[Atur urutan]
    TAB7 --> UP5[Hapus foto]

    style LOGIN fill:#B93636,color:#fff
    style PANEL fill:#1e1e1e,color:#FFCB56
```

---

## 4. Kebutuhan Non-Fungsional

```mermaid
mindmap
  root((NFR Bharasena))
    Performa
      LCP < 2.5 detik koneksi 4G
      Gambar dioptimasi next/image + Cloudinary
      Server component minimal JS kirim ke client
    Keamanan
      Admin cookie HttpOnly Secure SameSite=Strict
      Password di env tidak di source code
      HTTPS via Caddy SSL otomatis
      Input sanitasi di server action
    Keandalan
      Volume Postgres persisten antar restart
      Seed data siap bila DB kosong
      Graceful 404 bila konten belum diisi
    Aksesibilitas
      Kontras warna WCAG AA pada dark background
      Keyboard navigable
      Alt text pada semua foto
    Maintainability
      Satu admin untuk satu sekolah tim siswa
      Seed bertanda GANTI memudahkan input konten
      Docker Compose satu perintah deploy
```

---

## 5. Constraint Sistem

```mermaid
graph LR
    subgraph Teknis
        C1[Node.js ≥ 18 LTS]
        C2[PostgreSQL 16]
        C3[Docker + Compose v2]
        C4[Cloudinary akun aktif]
    end

    subgraph Waktu
        C5[Website live sebelum Oktober 2026]
        C6[Konten resmi masuk November 2026]
        C7[Foto hari-H upload real-time]
    end

    subgraph Manusia
        C8[1 admin teknis panitia]
        C9[Tim siswa SMA kelola konten]
        C10[Tidak ada SysAdmin profesional]
    end
```

---

## 6. Matriks Kebutuhan vs Fitur

```mermaid
block-beta
    columns 5
    H1["ID"] H2["Kebutuhan"] H3["Fitur"] H4["Prioritas"] H5["Status"]

    R1["FR-01"] R2["Tampilkan info acara"] R3["Section Tentang + Hero"] R4["P1"] R5["Done (UI)"]
    R6["FR-02"] R7["Tampilkan rundown"] R8["Tab Rundown 3 hari"] R9["P1"] R10["Done (UI)"]
    R11["FR-03"] R12["Tampilkan guest star"] R13["Section Guest Star"] R14["P1"] R15["Done (UI)"]
    R16["FR-04"] R17["Proposal untuk sponsor"] R18["Section Proposal + PDF"] R19["P1"] R20["Done (UI)"]
    R21["FR-05"] R22["Kontak CP via WA"] R23["Section Kontak Humas"] R24["P1"] R25["Done (UI)"]
    R26["FR-06"] R27["Galeri dokumentasi"] R28["Section Momen + Cloudinary"] R29["P1"] R30["Done (UI)"]
    R31["FR-07"] R32["Admin kelola konten"] R33["Panel /admin + CRUD"] R34["P1"] R35["In Progress (UI Done)"]
    R36["FR-08"] R37["Mode otomatis pre/event"] R38["mode.ts server-side"] R39["P1"] R40["Done (Server-side & UI)"]
    R41["NFR-01"] R42["Performa cepat"] R43["SSR + next/image"] R44["P2"] R45["Done"]
    R46["NFR-02"] R47["Aman dari akses tidak sah"] R48["Cookie HttpOnly + middleware"] R49["P1"] R50["To Do (Backend)"]
```

---

*Dokumen ini merupakan bagian dari paket dokumentasi Bharasena Website v1.0*
