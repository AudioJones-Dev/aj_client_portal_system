# Client Portal — Test Plan

## Build / health
- [ ] `npm install` succeeds.
- [ ] `npm run typecheck` passes (no TS errors).
- [ ] `npm run dev` serves on :7600; `/` redirects to `/home`.
- [ ] `npm run build` completes (production build).
- [ ] No console errors on any MVP route.

## Navigation & shell
- [ ] Sidebar links route correctly; active item is highlighted with the signal bar.
- [ ] "Coming soon" items are badged and route to in-shell placeholders (no dead ends).
- [ ] Topbar shows company context, pending-approval bell count, user initials.
- [ ] Responsive: sidebar collapses below `lg`; layout holds at 375 / 768 / 1280.

## Theme (light + dark)
- [ ] Default is light. Toggle switches to dark and persists across reloads.
- [ ] All surfaces, text, badges, and the signal accent remain legible in both themes.
- [ ] No hydration warning from the theme toggle (mounted placeholder works).

## Home
- [ ] Greeting reflects time of day; first name shown.
- [ ] Phase track shows the engagement phase (Build) as active.
- [ ] Outcome stats render with defensible labels ("estimated").
- [ ] Active projects (≤4), recent activity, latest deliverables, system health all populate.
- [ ] Primary actions route to /approvals, /projects, /deliverables.

## Projects
- [ ] List shows status summary counts + a card per project.
- [ ] Each card shows status, phase track, progress, owner, objective, next action.
- [ ] Card click opens `/projects/[id]`; an unknown id renders not-found.
- [ ] Detail shows facts, milestones, related approvals, deliverables, activity.

## Approvals (most important)
- [ ] Each approval shows: type, risk, decision required, recommended choice,
      why it matters, business impact, and Approve / Request changes / Reject.
- [ ] Clicking a decision updates the card state; "Undo" reverts.
- [ ] Empty state appears when nothing is pending.
- [ ] Pending count in the sidebar/topbar/hero matches the list.

## Deliverables / Reports / Support / Settings
- [ ] Deliverables list shows category, project, date, status/approval badges.
- [ ] Reports list renders with outcome stats.
- [ ] Support: new-request form validates required fields and shows a success state.
- [ ] Support: existing requests list shows status + priority badges.
- [ ] Settings: profile/workspace render; theme toggle works from this page.

## Accessibility (smoke)
- [ ] Focus rings visible on buttons/links (signal ring).
- [ ] Color is never the only status signal (badges include text + dot).
- [ ] Interactive controls are keyboard reachable.

## Language guardrails
- [ ] No "bot", "prompt", "agent", or raw log language anywhere in the client UI.

---

## When Supabase is wired (Phase 1.5)
- [ ] Logging in as a tenant user shows only that tenant's data (RLS).
- [ ] A second tenant cannot read the first tenant's rows.
- [ ] Approving an item persists and writes an activity_logs row.
- [ ] Submitting a support request persists and appears in the list.
