# TSD — Technical Specification Document
## Website Informasi Prom Night BHARASENA
**Batalyon Bhara Arsa Nawasena · SMAN 2 Taruna Bhayangkara**
**Versi 1.0 · September 2026**

---

## 1. Arsitektur Sistem

```mermaid
architecture-beta
    group client(cloud)[Client]
    group server(server)[VPS / Server]
    group storage(database)[Storage]

    service browser(internet)[Browser Pengunjung] in client
    service admin_browser(internet)[Browser Admin] in client

    service caddy(server)[Caddy / Nginx Reverse Proxy] in server
    service nextjs(server)[Next.js App :3000] in server
    service postgres(database)[PostgreSQL :5432] in server

    service cloudinary(cloud)[Cloudinary CDN]

    browser:R --> L:caddy
    admin_browser:R --> L:caddy
    caddy:R --> L:nextjs
    nextjs:B --> T:postgres
    nextjs:R --> L:cloudinary
```

---

## 2. Stack Teknologi

```mermaid
block-beta
    columns 4
    A["Layer"] B["Teknologi"] C["Versi"] D["Fungsi"]

    A1["Frontend"] B1["Next.js App Router"] C1["14+"] D1["SSR + server components"]
    A2["Language"] B2["TypeScript"] C2["5.x"] D2["Type safety"]
    A3["Styling"] B3["Tailwind CSS v4"] C3["4.x"] D3["Utility-first CSS"]
    A4["UI Kit"] B4["Shadcn/UI"] C4["latest"] D4["Komponen dasar"]
    A5["ORM"] B5["Prisma"] C5["5.x"] D5["Type-safe DB queries"]
    A6["Database"] B6["PostgreSQL"] C6["16"] D6["Penyimpanan data"]
    A7["Storage"] B7["Cloudinary"] C7["SDK v2"] D7["Upload & hosting foto"]
    A8["Deploy"] B8["Docker Compose"] C8["v2"] D8["Orkestrasi container"]
    A9["Proxy"] B9["Caddy"] C9["2.x"] D9["SSL otomatis + routing"]
```

---

## 3. Struktur Folder Proyek

```mermaid
graph TD
    ROOT[bharasena/] --> SRC[src/]
    ROOT --> PRISMA[prisma/]
    ROOT --> DOCKER[docker-compose.yml]
    ROOT --> ENV[.env.example]
    ROOT --> DOCKERFILE[Dockerfile]
    ROOT --> MIDDLEWARE[middleware.ts]

    SRC --> APP[app/]
    SRC --> LIB[lib/]
    SRC --> COMP[components/]

    APP --> PAGE["page.tsx (/)"]
    APP --> GLOBALS["globals.css (Tailwind v4 @theme)"]
    APP --> LAYOUT["layout.tsx"]
    APP --> ADMIN["admin/"]
    APP --> API["api/"]

    ADMIN --> ADMINPAGE["page.tsx"]
    ADMIN --> ADMINLOGIN["login/page.tsx"]

    API --> APIUPLOAD["upload/route.ts"]
    API --> APIAUTH["auth/route.ts"]

    LIB --> LIBPRISMA["prisma.ts"]
    LIB --> LIBMODE["mode.ts"]
    LIB --> LIBDATA["data.ts"]
    LIB --> LIBTYPES["types.ts"]
    LIB --> LIBMOCK["mock/data.ts"]
    LIB --> LIBSECT["sections.ts"]
    LIB --> LIBIMG["images.ts"]
    LIB --> LIBCLOUD["cloudinary.ts"]
    LIB --> LIBAUTH["auth.ts"]

    COMP --> COMPNAV["Navbar.tsx"]
    COMP --> COMPHERO["Hero.tsx"]
    COMP --> COMPSECT["sections/"]
    COMP --> COMPADMIN["admin/"]
    COMP --> COMPUI["ui/ (shadcn)"]
    COMP --> COMPFOOT["Footer.tsx"]

    PRISMA --> SCHEMA["schema.prisma"]
    PRISMA --> SEED["seed.ts"]

    style ROOT fill:#1e1e1e,color:#FFCB56
    style SRC fill:#2a2a2a,color:#fff
    style PRISMA fill:#2a2a2a,color:#fff
    style LIB fill:#B93636,color:#fff
    style APP fill:#B93636,color:#fff
```

---

## 4. Skema Database (ERD)

```mermaid
erDiagram
    SiteSetting {
        int     id         PK
        string  key        UK
        string  value
        datetime updatedAt
    }

    GuestStar {
        int     id         PK
        string  name
        string  role
        string  imageUrl
        int     order
    }

    RundownItem {
        int     id         PK
        int     day
        string  time
        string  title
        string  description
        int     order
    }

    OfficialGuest {
        int     id         PK
        string  name
        string  role
        string  category
    }

    CommitteeSection {
        int     id         PK
        string  title
        int     order
    }

    CommitteeMember {
        int     id          PK
        int     sectionId   FK
        string  name
        string  role
        int     order
    }

    Proposal {
        int     id         PK
        string  type
        string  title
        string  description
        string  pdfUrl
    }

    ContactPerson {
        int     id         PK
        string  type
        string  label
        string  name
        string  phoneWa
    }

    DocumentationPhoto {
        int     id         PK
        int     day
        string  imageUrl
        string  caption
        int     order
        datetime createdAt
    }

    CommitteeSection ||--o{ CommitteeMember : "memiliki"
```

---

## 5. Alur Autentikasi Admin

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant Browser
    participant Middleware as middleware.ts
    participant Route as /admin/login
    participant Cookie as Cookie (HttpOnly)
    participant DB as Prisma / DB

    Admin->>Browser: Akses /admin
    Browser->>Middleware: GET /admin
    Middleware->>Middleware: Cek cookie admin_session
    alt Cookie tidak ada / invalid
        Middleware->>Browser: Redirect /admin/login
        Admin->>Browser: Input password
        Browser->>Route: POST /api/auth {password}
        Route->>Route: Bandingkan dengan ADMIN_PASSWORD (env)
        alt Password benar
            Route->>Cookie: Set cookie admin_session (HttpOnly, 7 hari)
            Route->>Browser: 200 OK + redirect /admin
        else Password salah
            Route->>Browser: 401 Unauthorized
        end
    else Cookie valid
        Middleware->>Browser: Lanjut ke /admin
        Browser->>DB: Fetch semua data CRUD
        DB->>Browser: Return data
    end
```

---

## 6. Alur Upload Foto Dokumentasi

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant Browser
    participant API as /api/upload
    participant Cloudinary
    participant DB as PostgreSQL

    Admin->>Browser: Pilih foto (Day 1/2/3) + isi caption
    Browser->>Browser: Encode file ke FormData
    Browser->>API: POST /api/upload (FormData)
    API->>API: Validasi cookie admin_session
    API->>Cloudinary: Upload via SDK (unsigned preset / API key)
    Cloudinary->>API: Return { secure_url, public_id }
    API->>DB: INSERT DocumentationPhoto { day, imageUrl, caption, order }
    DB->>API: Photo record
    API->>Browser: 201 Created { photo }
    Browser->>Browser: Render thumbnail baru di admin
```

---

## 7. Logika Mode Server (mode.ts)

```mermaid
flowchart TD
    A([Request masuk ke page.tsx]) --> B[Ambil tanggal server\nIntl.DateTimeFormat Asia/Jakarta]
    B --> C{today >= 2026-12-11?}
    C -- Ya --> D[mode = 'event']
    C -- Tidak --> E[mode = 'pre']
    D --> F{Override manual\ndi SiteSetting?}
    E --> F
    F -- Ada override --> G[Gunakan override]
    F -- Tidak ada --> H[Gunakan mode kalkulasi]
    G --> I[Return mode ke Server Components]
    H --> I
    I --> J{mode == 'event'?}
    J -- Ya --> K[Render GallerySection\nSembunyikan ProposalSection]
    J -- Tidak --> L[Render ProposalSection\nSembunyikan GallerySection]

    style D fill:#B93636,color:#fff
    style E fill:#FFCB56,color:#1e1e1e
    style K fill:#B93636,color:#fff
    style L fill:#FFCB56,color:#1e1e1e
```

---

## 8. Docker Compose & Deployment

```mermaid
graph LR
    subgraph HOST["VPS Host"]
        subgraph COMPOSE["Docker Compose"]
            APP["app\nnextjs:standalone\n:3000"]
            DB["db\npostgres:16-alpine\n:5432"]
            VOLUME[("pgdata\nvolume")]
        end
        PROXY["Caddy\n:80 / :443"]
    end
    INTERNET["Internet\n(HTTPS)"] --> PROXY
    PROXY --> APP
    APP --> DB
    DB --- VOLUME

    style APP fill:#B93636,color:#fff
    style DB fill:#2a2a2a,color:#FFCB56
    style PROXY fill:#1e1e1e,color:#FFCB56
```

---

## 9. Environment Variables

```mermaid
block-beta
    columns 3
    H1["Variabel"] H2["Contoh Nilai"] H3["Keterangan"]

    A1["DATABASE_URL"] A2["postgresql://user:pass@db:5432/bharasena"] A3["Koneksi Prisma ke Postgres"]
    B1["ADMIN_PASSWORD"] B2["rahasia123"] B3["Password login admin panel"]
    C1["CLOUDINARY_CLOUD_NAME"] C2["my-cloud"] C3["Nama cloud Cloudinary"]
    D1["CLOUDINARY_API_KEY"] D2["123456789"] D3["API key Cloudinary"]
    E1["CLOUDINARY_API_SECRET"] E2["abc...xyz"] E3["Secret (jangan di-commit!)"]
    F1["CLOUDINARY_UPLOAD_PRESET"] F2["bharasena_unsigned"] F3["Unsigned preset untuk upload"]
    G1["NEXT_PUBLIC_BASE_URL"] G2["https://bharasena.com"] G3["URL publik website"]
```

---

*Dokumen ini merupakan bagian dari paket dokumentasi Bharasena Website v1.0*
