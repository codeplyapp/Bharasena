# User Manual — Website BHARASENA
## Panduan Penggunaan untuk Admin & Pengunjung
**Prom Night Taruna Bhayangkara 6 · SMAN 2 Taruna Bhayangkara · 2026**

---

## Bagian A: Panduan Pengunjung

### A.1 Cara Navigasi Website

```mermaid
flowchart TD
    BUKA["🌐 Buka bharasena.com"] --> NAVBAR["Navbar Sticky di Atas"]

    NAVBAR --> S1["Hero\n▼ scroll"]
    S1 --> S2["Tentang Acara\n▼ scroll"]
    S2 --> S3["Guest Star\n▼ scroll"]
    S3 --> S4["Rundown\n▼ scroll"]
    S4 --> S5["Tamu Undangan\n▼ scroll"]
    S5 --> S6["Susunan Panitia\n▼ scroll"]
    S6 --> S7{Mode Website}

    S7 -->|Sebelum 11 Des| S8["Proposal & Sponsorship\n▼ scroll"]
    S7 -->|11–13 Des| S9["Galeri Momen Acara\n▼ scroll"]

    S8 --> S10["Kontak Humas\n▼ scroll"]
    S9 --> S10

    S10 --> S11["Footer"]

    style S7 fill:#B93636,color:#fff
    style S8 fill:#FFCB56,color:#1e1e1e
    style S9 fill:#FFCB56,color:#1e1e1e
```

---

### A.2 Cara Melihat Rundown

```mermaid
flowchart LR
    SCROLL["Scroll ke Section Rundown"] --> TAB["Klik tab yang diinginkan"]
    TAB --> D1["📅 Day 1\n11 Desember"]
    TAB --> D2["📅 Day 2\n12 Desember"]
    TAB --> D3["📅 Day 3\n13 Desember"]

    D1 --> ITEM["Lihat timeline:\n⏰ Waktu — 🎯 Kegiatan"]
    D2 --> ITEM
    D3 --> ITEM
```

---

### A.3 Cara Mengunduh Proposal (Calon Sponsor)

```mermaid
flowchart TD
    A["Scroll ke Section\nProposal & Sponsorship"] --> B{Pilih jenis proposal}
    B --> C["📄 Proposal Kegiatan"]
    B --> D["💎 Proposal Sponsorship\n+ Paket Sponsor"]
    B --> E["🏪 Proposal UMKM"]

    C --> F["Klik tombol\n'Lihat / Unduh PDF'"]
    D --> F
    E --> F

    F --> G["PDF terbuka di tab baru"]
    G --> H["Unduh PDF ke perangkat\nCtrl+S / ikon unduh"]

    H --> I["📞 Hubungi CP via tombol WhatsApp"]
```

---

### A.4 Cara Menghubungi Panitia

```mermaid
sequenceDiagram
    actor Sponsor
    participant Website
    participant WA as WhatsApp

    Sponsor->>Website: Scroll ke Section Kontak Humas
    Website->>Sponsor: Tampilkan 3 jenis CP:
    Note right of Website: 📋 CP Humas Acara<br>💰 CP Sponsorship<br>🏪 CP UMKM
    Sponsor->>Website: Klik tombol "Chat WhatsApp"
    Website->>WA: Buka wa.me/628xxx?text=...
    WA->>Sponsor: Langsung terbuka chat WA
    Sponsor->>WA: Kirim pesan ke panitia
```

---

### A.5 Cara Melihat Galeri Dokumentasi (Saat & Setelah Acara)

```mermaid
flowchart LR
    A["Scroll ke Section\nMomen Acara"] --> B["Pilih tab hari"]
    B --> D1["Day 1 · 11 Des"]
    B --> D2["Day 2 · 12 Des"]
    B --> D3["Day 3 · 13 Des"]
    D1 --> GRID["Grid foto acara"]
    D2 --> GRID
    D3 --> GRID
    GRID --> KLIK["Klik foto untuk\nlihat lebih besar"]
```

---

## Bagian B: Panduan Admin Panitia

### B.1 Cara Login ke Admin Panel

```mermaid
flowchart TD
    A["Buka bharasena.com/admin"] --> B{Sudah punya session?}
    B -- Ya --> C["Langsung masuk Dashboard"]
    B -- Tidak --> D["Halaman Login muncul"]
    D --> E["Masukkan password admin\n(dari ketua / penanggung jawab)"]
    E --> F{Password benar?}
    F -- Ya --> G["✅ Masuk Dashboard /admin"]
    F -- Tidak --> H["❌ Muncul pesan error\nCoba lagi"]
    H --> E

    style G fill:#B93636,color:#fff
    style H fill:#2a2a2a,color:#fff
```

> ⚠️ **Penting:** Password tidak disimpan di manapun di website. Minta dari penanggung jawab teknis panitia.

---

### B.2 Navigasi Admin Panel

```mermaid
mindmap
  root((Dashboard Admin))
    Tab Tentang
      Edit tujuan acara
      Edit harapan acara
      Edit arti nama
      Edit filosofi logo
      Upload logo resmi
    Tab Guest Star
      Tambah penampil baru
      Upload foto penampil
      Edit nama dan peran
      Hapus penampil
      Atur urutan tampil
    Tab Rundown
      Tambah item jadwal
      Pilih Day 1 / 2 / 3
      Set waktu dan judul
      Edit deskripsi kegiatan
      Hapus item jadwal
    Tab Undangan
      Edit nama kepala sekolah
      Edit nama wakasek
      Edit nama pembina
    Tab Panitia
      Tambah divisi baru
      Tambah anggota per divisi
      Edit nama dan jabatan
      Atur urutan divisi
    Tab Proposal & CP
      Upload / ganti URL PDF
      Edit deskripsi proposal
      Tambah / edit CP Humas
      Tambah / edit CP Sponsor
      Tambah / edit CP UMKM
    Tab Dokumentasi
      Upload foto per hari
      Isi caption foto
      Atur urutan foto
      Hapus foto
```

---

### B.3 Cara Mengedit Konten "Tentang"

```mermaid
sequenceDiagram
    actor Admin
    participant Panel as Dashboard /admin
    participant Server as Server Action
    participant DB as PostgreSQL

    Admin->>Panel: Klik tab "Tentang"
    Panel->>DB: Fetch SiteSetting (tujuan, harapan, arti nama, filosofi)
    DB->>Panel: Return data saat ini
    Panel->>Admin: Tampilkan form dengan konten sekarang
    Admin->>Panel: Edit teks di form
    Admin->>Panel: Klik "Simpan"
    Panel->>Server: POST server action updateSetting()
    Server->>DB: UPDATE SiteSetting SET value = ...
    DB->>Server: OK
    Server->>Panel: Revalidate path
    Panel->>Admin: ✅ "Berhasil disimpan!"
```

---

### B.4 Cara Upload Foto Dokumentasi

```mermaid
flowchart TD
    A["Buka tab Dokumentasi di admin"] --> B["Pilih hari:\nDay 1 / Day 2 / Day 3"]
    B --> C["Klik 'Upload Foto'"]
    C --> D["Pilih file foto dari perangkat\n.jpg / .png / .webp, maks 10MB"]
    D --> E["Isi caption foto\ncontoh: 'Pembukaan acara Day 1'"]
    E --> F["Klik 'Upload'"]
    F --> G{Proses upload}
    G --> H["⬆️ Foto dikirim ke Cloudinary"]
    H --> I["✅ URL tersimpan di database"]
    I --> J["Thumbnail foto muncul\ndi admin"]
    J --> K["Foto otomatis tampil\ndi halaman publik"]

    G -- Gagal --> L["❌ Muncul pesan error"]
    L --> M["Cek koneksi internet"]
    M --> F

    style I fill:#B93636,color:#fff
    style K fill:#FFCB56,color:#1e1e1e
```

---

### B.5 Cara Mengatur Urutan Tampil

```mermaid
flowchart LR
    A["Item muncul\ndi daftar admin"] --> B{Cara atur urutan}
    B --> C["Klik ⬆️ untuk naikan"]
    B --> D["Klik ⬇️ untuk turunkan"]
    C --> E["Urutan tersimpan otomatis\ndi field 'order' DB"]
    D --> E
    E --> F["Halaman publik render\nsesuai urutan baru"]
```

---

### B.6 Cara Logout

```mermaid
flowchart LR
    A["Di dashboard admin"] --> B["Klik tombol 'Logout'\ndi pojok kanan atas"]
    B --> C["Cookie admin_session\ndihapus dari browser"]
    C --> D["Redirect ke\n/admin/login"]
    D --> E["✅ Sudah logout aman"]
```

---

### B.7 Alur Kerja Admin Saat Hari-H

```mermaid
timeline
    title Alur Kerja Admin Saat Acara Berlangsung
    section 11 Desember (Day 1)
        Pagi : Login ke /admin
             : Pastikan rundown Day 1 sudah benar
        Siang : Website otomatis masuk Event Mode
              : Section galeri muncul kosong
        Sore–Malam : Upload foto Day 1 dari fotografer
                   : Isi caption tiap foto
                   : Foto langsung tampil publik
    section 12 Desember (Day 2)
        Pagi : Login ulang jika perlu
             : Cek foto Day 1 sudah semua
        Siang–Malam : Upload foto Day 2
                    : Caption foto
    section 13 Desember (Day 3)
        Pagi : Upload sisa foto Day 2 jika ada
        Siang–Malam : Upload foto Day 3
                    : Lengkapi semua caption
        Setelah acara : Review semua galeri
                      : Hapus foto yang buram/salah
```

---

### B.8 Troubleshooting Admin

```mermaid
flowchart TD
    MASALAH{Masalah yang dihadapi}

    MASALAH --> P1["❌ Tidak bisa login"]
    MASALAH --> P2["❌ Upload foto gagal"]
    MASALAH --> P3["❌ Konten tidak update"]
    MASALAH --> P4["❌ Website tidak bisa diakses"]

    P1 --> S1["Cek password ke penanggung jawab teknis\nPassword case-sensitive"]
    P2 --> S2["Cek koneksi internet\nUkuran foto maks 10MB\nCek status Cloudinary"]
    P3 --> S3["Hard refresh browser: Ctrl+Shift+R\nCek pesan error di form\nHubungi dev"]
    P4 --> S4["Cek status server ke dev\nCoba dari jaringan berbeda\nCek domain aktif"]
```

---

## Kontak Tim Teknis

Untuk pertanyaan teknis seputar website, hubungi penanggung jawab dev panitia BHARASENA.

---

*User Manual ini merupakan bagian dari paket dokumentasi Bharasena Website v1.0*
*BHARASENA · Bhara Arsa Nawasena · Batalyon 6 · SMAN 2 Taruna Bhayangkara · 2026*
