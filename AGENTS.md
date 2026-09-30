# AGENTS.md

BHARASENA — one-page info site for Prom Night Taruna Bhayangkara 6 (SMAN 2 Taruna Bhayangkara, 11–13 Dec 2026). Internal school-committee project, not for public distribution.

## Current state: docs only

The repo currently contains **no application code** — only `docs/` (PRD, SRS, TSD, USER_MANUAL) and `assets/Logo.png`. There is no `package.json`, no git repo, no CI.

`docs/` is a **specification, and it is the source of truth**. Read it before writing any code. When code changes schema, routes, or behavior, update the affected spec in the same change:
- `docs/TSD.md` — folder structure, ERD field names, auth/upload/mode flows, env vars
- `docs/SRS.md` — feature inventory and the FR/NFR status matrix (currently everything `To Do`)

**The mermaid diagrams are the real spec, not the prose.** The diagrams encode exact field names, column types, cookie names, and cutoff dates; surrounding paragraphs are thin. Read the diagram, not the sentence above it.

## Language convention

All docs are in **Indonesian**, and so must the app: UI copy, button labels, admin form labels, error messages, and all `prisma/seed.ts` placeholder content. Do not add an English UI or an i18n layer.

## Target stack (fixed — do not substitute)

Next.js 14+ App Router · TypeScript 5 · Tailwind CSS v4 · Shadcn/UI · Prisma 5 · PostgreSQL 16 · Cloudinary · Docker Compose v2 + Caddy 2.

One Next.js app, no monorepo. `src/` layout: `app/`, `components/`, `lib/{prisma,mode,cloudinary,auth}.ts`, plus `prisma/`, `docker-compose.yml`, `Dockerfile`, `.env.example`.

Note `middleware.ts` sits at the **project root, not `src/`** — it is not listed in the TSD folder tree but the auth flow depends on it.

## Commands

```bash
# Local dev (after .env is filled from .env.example)
npm install
npx prisma migrate dev     # create/apply a migration — run before dev
npx prisma db seed
npm run dev

npm run lint && npm run typecheck && npm run build   # verify in this order

npx prisma migrate reset   # wipe + re-seed (throws away local data)

docker compose up -d      # full stack: db healthy → migrate deploy → seed → app :3000
docker compose build && docker compose up -d        # redeploy after a code change
```

Verify order matters: `lint` → `typecheck` → `build` → tests.

## Tests

Vitest for unit tests (target `src/lib/*`: `mode.ts`, `auth.ts`, cloudinary helpers) and Playwright for e2e against the public page, the pre/event mode switch, and the admin login + CRUD/upload flows.

Vitest and Playwright are not mentioned in the specs — they were chosen by the team, so there is no doc to update for them. E2E needs a seeded database and reachable Cloudinary credentials; keep e2e out of the default `npm test` run.

## Invariants an agent will get wrong

**Pre/event content mode is server-side and mutually exclusive.** `src/lib/mode.ts` computes `today >= 2026-12-11` using `Intl.DateTimeFormat` in `Asia/Jakarta` — do not use `new Date()` or UTC, or the site flips a day early. A manual override stored in `SiteSetting` takes precedence. In `event` mode render `GallerySection` and hide `ProposalSection`; in `pre` mode the reverse. Never gate this on the client.

**Auth is one shared password, not users.** `POST /api/auth` compares the submitted password against `ADMIN_PASSWORD` from the env and sets an `admin_session` cookie (HttpOnly, `SameSite=Strict`, 7 days). There is no user table, no hashing, and no user management. Never read the password from source or a DB row.

**`order` is a manual integer, not auto-increment.** Every sortable model (`GuestStar`, `RundownItem`, `CommitteeSection`, `CommitteeMember`, `DocumentationPhoto`) has an `order` column that the admin changes with ⬆️/⬇️ buttons. New sortable content must be inserted at the end, not at `order = 1` or `0`, or it silently collides with existing rows.

**Seed data is placeholder.** `prisma/seed.ts` is expected to be tagged `GANTI` so the committee can spot and replace it. Keep it non-destructive and re-runnable, since `docker compose up` and `npx prisma migrate reset` both invoke it. NFR requires the site to render gracefully with empty/unfilled content.

**Uploads go through Cloudinary, not local disk.** `POST /api/upload` takes `FormData`, validates the `admin_session` cookie, uploads, then inserts a `DocumentationPhoto`. Accept only jpg/png/webp, max 10MB. Storing files in `public/` is out of spec.

**`assets/Logo.png` is ~2.9 MB.** Never copy it into `public/` as-is; run it through `next/image` or Cloudinary first, and keep the original out of the app bundle.

## Out of scope — do not add

Native mobile app, multi-language/i18n, online ticket registration, payment gateway, live-streaming embed. Multiple admin accounts. Server/VPS is not provisioned and the domain is undecided, so don't hardcode a hostname — read it from `NEXT_PUBLIC_BASE_URL`.

## Content editing is via the admin panel

Guest star, rundown, committee, proposals, and contacts are all DB rows edited through `/admin`. If asked to "add X to the website", the usual right answer is a schema change + a seed entry + an admin tab, not hardcoded JSX in `app/page.tsx`.
