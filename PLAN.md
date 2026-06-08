# Client Portal — Data Model & MVP Plan

## 1. Data model

Entities (see `supabase/migrations/0001_init.sql` for the authoritative schema and
`src/lib/types.ts` for the TypeScript mirror).

```
Tenant ──┬─< AppUser            (auth.users → tenant + role)
         ├─< Client ──┬─< Project ──┬─< Milestone
         │            │             ├─< ApprovalRequest
         │            │             ├─< Deliverable
         │            │             └─< ActivityLog
         │            ├─< Diagnostic*           (Phase 2)
         │            ├─< BusinessMemoryRecord  (Phase 2 UI)
         │            ├─< AttributionEvent
         │            └─< Integration
         ├─< Report
         └─< SupportRequest
```

`*` Diagnostic table is reserved for Phase 2 (not in 0001).

### Multi-tenancy

- Every tenant-scoped table carries `tenant_id`.
- `current_tenant_id()` resolves the signed-in user's tenant from `app_users`.
- RLS `SELECT` policies restrict every table to `tenant_id = current_tenant_id()`.
- Client-writable surfaces: `approval_requests` (update = decide) and
  `support_requests` (insert/update). All other writes happen from the internal
  control plane via the service-role key (bypasses RLS).

---

## 2. MVP build plan

### ✅ Phase 1 — this pass (design system + key screens on seed data)

1. Scaffold Next.js 14 + Tailwind + theme tokens (light + dark toggle) — **done**
2. Design-system primitives (Card, Badge, Button, Progress, PhaseTrack…) — **done**
3. App shell (sidebar + topbar + theme toggle) — **done**
4. Home dashboard — **done**
5. Projects list + project detail — **done**
6. Approval inbox with full decision anatomy — **done**
7. Deliverables, Reports, Support (with intake form), Settings — **done**
8. Supabase schema + RLS + client/server helpers (ready to wire) — **done**
9. Seed data for *Florida Ramp & Lift* — **done**

### ▶ Phase 1.5 — make it live

- Create/confirm Supabase project; apply `0001_init.sql`.
- Seed one tenant + demo client (port `seed.ts` into SQL inserts).
- Wire auth: `/login`, session refresh in `middleware.ts`, gate `(portal)`.
- Port `src/lib/data.ts` bodies to Supabase queries (UI unchanged).
- Make Approve / Request changes / Reject persist + write an `activity_logs` row.
- Persist support-request submissions.

### ▶ Phase 2 — intelligence portal

- Diagnostics center (productized audits with scores + recommendations).
- Business Memory (structured company/brand/offer/customer/process records).
- Outcomes & Attribution dashboard (defensible labels only).
- Integration health controls (connect / pause / reconnect).

### ▶ Phase 3 — operating-system portal

- Workflow launcher, client-facing controls, proposals/scope changes, billing,
  knowledge assistant over the client's own business memory.

---

## 3. Deferred in v1 (intentionally)

Full chat app · analytics overload · real-time agent console · custom CRM ·
complex permission matrix · client workflow builder · any "AI magic" language.

---

## 4. Brand tokens carried from the internal dash

`signal #E8FF5A` / `signal-hover #D6F23A` · dark `bg #0D1117`, `surface #1F2937`
· status `ok / warn / bad` · Space Grotesk + Inter + JetBrains Mono · card radius.
The portal adds a **light** palette as the default client-facing surface.
