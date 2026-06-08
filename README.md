# AJ Digital — Client Portal

`clientportal.ajdigital.app` — a premium client operating cockpit for founder-led
service businesses. Built as a separate client-facing shell from the internal
dashboard (`dash.ajdigital.app`).

> **Doctrine:** expose **control, confidence, and outcomes** — not raw complexity.
> Client-facing language only: *systems, diagnostics, approvals, deliverables,
> outcomes, business memory* — never bots / prompts / agents.

---

## Stack

Matches the AJ Digital house stack (from `aj-digital-dashboard-system`), plus the
multi-tenant backend the portal needs.

| Concern   | Choice |
| --------- | ------ |
| Framework | Next.js 14.2.35 (App Router), `src/` layout |
| UI        | React 18 · TypeScript · Tailwind 3 |
| Theme     | "Dark signal cockpit" — light-first + dark toggle (`next-themes`, CSS-variable tokens) |
| Fonts     | Syne (display) · Inter (body) · JetBrains Mono (mono) |
| Auth      | **Clerk** (`@clerk/nextjs` v6) — env-gated; off → open seed-mode |
| Data      | Supabase Postgres (project `aj-client-portal` / `vuassgfabnbitcjzgabm`), RLS schema in `supabase/` |
| Icons     | lucide-react |
| Deploy    | Vercel |

### Run modes
- **Seed-mode (default):** no env → open, demo data from `src/lib/seed.ts`. Used for local/preview.
- **Live:** set Clerk keys (auth on) + `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
  (data on, reads + persistence). See `.env.example`. Visit `/design-system` for the design preview.

**Current data source:** typed seed (`src/lib/seed.ts`) for the *Florida Ramp &
Lift* demo client. The data-access layer (`src/lib/data.ts`) is async and
tenant-shaped, so swapping seed → Supabase is mechanical and the UI never
changes.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:7600  → redirects to /home
```

No env vars are needed to run on seed data. To wire Supabase, copy
`.env.example` → `.env.local`, fill the two `NEXT_PUBLIC_SUPABASE_*` values,
apply `supabase/migrations/0001_init.sql`, then port the bodies in
`src/lib/data.ts` to Supabase queries.

---

## Folder structure

```
aj_client_portal_system/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # fonts + ThemeProvider
│  │  ├─ page.tsx                # / → redirect to /home
│  │  ├─ globals.css             # light/dark tokens, glass utilities
│  │  └─ (portal)/               # authenticated shell (sidebar + topbar)
│  │     ├─ layout.tsx
│  │     ├─ home/                # MVP
│  │     ├─ projects/            # MVP  (+ [id] detail)
│  │     ├─ approvals/           # MVP
│  │     ├─ deliverables/        # MVP
│  │     ├─ reports/             # MVP
│  │     ├─ support/             # MVP
│  │     ├─ settings/            # MVP
│  │     ├─ diagnostics/         # Phase 2 (stub)
│  │     ├─ memory/              # Phase 2 (stub)
│  │     ├─ systems/             # Phase 2 (light preview)
│  │     └─ outcomes/            # Phase 2 (stub)
│  ├─ components/
│  │  ├─ ui/                     # design-system primitives
│  │  ├─ shell/                  # sidebar, topbar, theme toggle
│  │  ├─ home/ projects/ approvals/ support/ shared/
│  │  └─ theme-provider.tsx
│  └─ lib/
│     ├─ types.ts                # domain types (mirror the SQL schema)
│     ├─ labels.ts               # enum → client-friendly label + tone maps
│     ├─ seed.ts                 # Florida Ramp & Lift demo data
│     ├─ data.ts                 # async data-access layer (seed today)
│     ├─ utils.ts                # cn(), date/format helpers
│     └─ supabase/               # browser + server clients (ready to wire)
├─ supabase/migrations/0001_init.sql   # schema + RLS
├─ middleware.ts                 # auth seam (pass-through today)
├─ tailwind.config.ts            # tokens → CSS variables
├─ PLAN.md  TEST_PLAN.md  DEPLOY notes (below)
```

---

## Page map

| Route | Section | State |
| ----- | ------- | ----- |
| `/` | redirect → `/home` | — |
| `/home` | Home dashboard: greeting hero, outcomes, active projects, activity, deliverables, system health | **MVP** |
| `/projects` | Project list + status summary | **MVP** |
| `/projects/[id]` | Project detail: phase, facts, milestones, approvals, deliverables, activity | **MVP** |
| `/approvals` | Approval inbox: awaiting-you + recently-decided | **MVP** |
| `/deliverables` | Deliverables vault | **MVP** |
| `/reports` | Reports + outcome stats | **MVP** |
| `/support` | Support intake form + request list | **MVP** |
| `/settings` | Profile, workspace, appearance, notifications | **MVP** |
| `/diagnostics` `/memory` `/outcomes` | Phase-2 placeholders | Stub |
| `/systems` | Integration health (light preview) | Preview |

---

## Component map

**`components/ui/` (design system)**
`Card` / `CardHeader` / `CardBody` / `CardTitle` / `CardEyebrow` · `Badge`
(tone-driven) · `Button` (signal / primary / outline / ghost / danger) ·
`Progress` · `PhaseTrack` (Diagnose→Design→Build→Operate stepper) ·
`SectionHeading`.

**`components/shell/`** `Sidebar` · `Topbar` · `ThemeToggle`.

**Feature components** `home/GreetingHero`, `home/OutcomeStat` ·
`projects/ProjectCard` · `approvals/ApprovalCard` (full decision anatomy +
Approve / Request changes / Reject) · `support/NewRequestForm` ·
`shared/ActivityFeed`, `shared/SystemHealth`, `shared/ComingSoon`.

---

## Design system

Tokens live as CSS variables in `globals.css` and are exposed to Tailwind in
`tailwind.config.ts`, so the same class names resolve to the light **or** dark
palette via the `.dark` class.

- **Signal yellow** `#E8FF5A` — inherited brand accent, reserved for the single
  most important action on a surface (and the recommended-choice highlight).
- **Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (mono).
- **Surfaces** — light: off-white `#F6F7F9` bg, white cards, soft shadows.
  Dark: `#0D1117` bg echoing the internal dash, but calmer.
- **Glass** — `.glass` utility, reserved for the hero / summary surface only.

See **PLAN.md** for the data model and MVP build plan, and **TEST_PLAN.md** for
the verification checklist.
