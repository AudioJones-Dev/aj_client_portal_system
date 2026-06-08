-- AJ Digital Client Portal — demo seed (Florida Ramp & Lift).
-- Mirrors src/lib/seed.ts. Idempotent-ish: truncate demo tenant first.
-- Apply via the Supabase MCP (execute_sql) or `supabase db reset`.

-- Fixed ids so re-running is stable.
-- tenant   11111111-…  | client 22222222-…
-- projects a0000000-…-000{1..6}

delete from tenants where id = '11111111-1111-1111-1111-111111111111';

insert into tenants (id, name, slug) values
  ('11111111-1111-1111-1111-111111111111', 'Florida Ramp & Lift', 'florida-ramp-lift');

insert into app_users (id, tenant_id, name, email, role, avatar_color) values
  ('seed_user_michael', '11111111-1111-1111-1111-111111111111', 'Michael Alvarez', 'michael@floridaramplift.com', 'owner', '#2563eb');

insert into clients (id, tenant_id, company_name, primary_contact, industry, engine_phase, locations) values
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111',
   'Florida Ramp & Lift', 'Michael Alvarez', 'Mobility Access & Home Modification', 'build',
   array['Tampa, FL','St. Petersburg, FL','Sarasota, FL']);

insert into projects (id, tenant_id, client_id, name, phase, status, owner, objective, start_date, target_date, current_milestone, next_action, summary, progress) values
  ('a0000000-0000-0000-0000-000000000001','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','AI Readiness Diagnostic','diagnose','complete','aj_digital','increase_signal','2026-04-10','2026-04-28','Findings delivered','Review priority fixes with Michael','Baseline assessment of systems, data quality, and revenue leaks to sequence the build.',100),
  ('a0000000-0000-0000-0000-000000000002','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','Speed-to-Lead System','build','on_track','aj_digital','increase_profit','2026-05-05','2026-06-20','Routing & instant-response live in staging','Approve the new inbound response message','Capture every inbound lead and respond within 60 seconds across calls, forms, and messages.',72),
  ('a0000000-0000-0000-0000-000000000003','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','Client CRM Setup','build','waiting','client','increase_signal','2026-05-12','2026-06-25','Pipeline stages configured','Confirm CRM access so we can import contacts','A single source of truth for leads, jobs, and follow-ups with clean pipeline stages.',45),
  ('a0000000-0000-0000-0000-000000000004','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','Voice Agent / Receptionist','design','blocked','aj_digital','reduce_spend','2026-05-20','2026-07-10','Call-flow script drafted','Approve call-handling script & after-hours policy','Never miss a call — answer, qualify, and book after-hours and overflow inquiries automatically.',30),
  ('a0000000-0000-0000-0000-000000000005','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','Content Engine','operate','on_track','aj_digital','increase_signal','2026-03-15','2026-12-31','Weekly publishing cadence running','Approve June content calendar','Consistent, on-brand authority content that compounds local search visibility.',88),
  ('a0000000-0000-0000-0000-000000000006','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','Attribution Dashboard','design','on_track','aj_digital','increase_profit','2026-06-01','2026-07-20','Metric definitions agreed','Connect Google Analytics property','Trace outcomes back to the actions that produced them — leads, revenue, and time saved.',18);

insert into milestones (tenant_id, project_id, title, due_date, done) values
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','Lead capture wired across channels','2026-05-18',true),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','Instant-response live in staging','2026-06-02',true),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','Inbound message approved & shipped','2026-06-12',false),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','Production rollout + monitoring','2026-06-20',false),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000003','Pipeline stages configured','2026-05-28',true),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000003','CRM access granted','2026-06-10',false),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000003','Contacts imported & deduped','2026-06-25',false),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000004','Call-flow script approved','2026-06-14',false);

insert into approval_requests (tenant_id, project_id, type, title, decision_required, recommended_choice, why_it_matters, risk_level, business_impact, status, requested_at, due_by, decided_at, decided_by) values
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','content','Inbound instant-response message','Approve the auto-response sent to every new lead within 60 seconds.','Approve as written','This is the first thing every prospect sees. Faster, on-brand responses are the single biggest driver of booked estimates.','low','Estimated +15–25% lead-to-estimate conversion','pending','2026-06-06T15:30:00Z','2026-06-10T23:59:00Z',null,null),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000004','strategy','Call-handling script & after-hours policy','Approve how after-hours and overflow calls are answered, qualified, and booked.','Approve with the recommended after-hours booking window','Missed calls are missed revenue. This unblocks the receptionist build and protects your reputation for responsiveness.','medium','Recover an estimated 8–12 missed calls / week','pending','2026-06-05T18:10:00Z','2026-06-14T23:59:00Z',null,null),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000005','content','June content calendar','Approve the 8-piece June publishing plan across blog and social.','Approve all 8 pieces','Keeps your authority content compounding without a gap in cadence heading into peak season.','low','Sustains local search momentum','pending','2026-06-04T12:00:00Z','2026-06-09T23:59:00Z',null,null),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000003','access','CRM access for contact import','Grant import access so we can migrate and dedupe your existing contacts.','Approve read/write for the migration window','We can''t populate your new pipeline until contacts are imported. This is the current blocker.','medium','Unblocks CRM go-live by ~2 weeks','pending','2026-06-03T09:45:00Z',null,null,null),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000001','strategy','Diagnostic priority fixes','Approve the recommended build sequence from the readiness diagnostic.','Approve recommended sequence','Sets the order of the whole engagement around the highest-impact fixes first.','low','Focuses spend on highest-ROI systems','approved','2026-04-26T16:00:00Z',null,'2026-04-27T10:00:00Z','seed_user_michael');

insert into deliverables (tenant_id, project_id, title, category, status, added_at, href, notes, approval_status) values
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000001','AI Readiness Diagnostic — Findings & Roadmap','strategy','delivered','2026-04-28T10:00:00Z','#','Score, risks, and prioritized build sequence.','approved'),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000005','Brand Voice & Messaging Guide','brand','delivered','2026-05-02T10:00:00Z','#',null,null),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','Speed-to-Lead — Workflow Map','system_docs','delivered','2026-06-02T10:00:00Z','#',null,null),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000002','Inbound Response Message — Draft v2','content','in_review','2026-06-06T10:00:00Z','#',null,'pending'),
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000005','June Content Calendar','content','in_review','2026-06-04T10:00:00Z','#',null,'pending');

insert into reports (tenant_id, title, period, published_at, summary, href) values
  ('11111111-1111-1111-1111-111111111111','May Operating Recap','May 2026','2026-06-01T09:00:00Z','Speed-to-Lead build progress, content performance, and time-saved breakdown.','#'),
  ('11111111-1111-1111-1111-111111111111','April Operating Recap','April 2026','2026-05-01T09:00:00Z','Diagnostic findings and the agreed build roadmap.','#');

insert into support_requests (tenant_id, project_id, type, priority, subject, description, status, created_by, created_at) values
  ('11111111-1111-1111-1111-111111111111','a0000000-0000-0000-0000-000000000003','access','high','Where do I grant CRM access?','Not sure which permission level to give for the contact import.','in_progress','seed_user_michael','2026-06-05T11:00:00Z'),
  ('11111111-1111-1111-1111-111111111111',null,'question','normal','Can we add Sarasota to the service area pages?','We just started taking jobs in Sarasota — want it reflected in content.','open','seed_user_michael','2026-06-06T19:30:00Z');

insert into integrations (tenant_id, name, category, status) values
  ('11111111-1111-1111-1111-111111111111','Website','Web','connected'),
  ('11111111-1111-1111-1111-111111111111','Google Business Profile','Local','connected'),
  ('11111111-1111-1111-1111-111111111111','Email','Comms','connected'),
  ('11111111-1111-1111-1111-111111111111','Call System','Comms','connected'),
  ('11111111-1111-1111-1111-111111111111','Calendar','Scheduling','pending_approval'),
  ('11111111-1111-1111-1111-111111111111','CRM','Sales','needs_setup'),
  ('11111111-1111-1111-1111-111111111111','Social Scheduler','Content','paused'),
  ('11111111-1111-1111-1111-111111111111','Analytics','Measurement','needs_setup'),
  ('11111111-1111-1111-1111-111111111111','Payment System','Finance','not_connected');

insert into attribution_events (tenant_id, label, value, unit, period) values
  ('11111111-1111-1111-1111-111111111111','estimated_time_saved',14.5,'hours','June 2026'),
  ('11111111-1111-1111-1111-111111111111','revenue_influenced',9200,'USD','June 2026'),
  ('11111111-1111-1111-1111-111111111111','manual_work_reduced',63,'steps','June 2026'),
  ('11111111-1111-1111-1111-111111111111','operational_risk_reduced',2,'leaks closed','June 2026');

insert into business_memory_records (tenant_id, category, key, value, updated_at) values
  ('11111111-1111-1111-1111-111111111111','Company profile','Services','Wheelchair ramps, stair lifts, vehicle lifts, home access modifications','2026-05-02T10:00:00Z'),
  ('11111111-1111-1111-1111-111111111111','Customer memory','ICP','Adult children arranging access for aging parents; occupational therapists referring patients','2026-05-02T10:00:00Z'),
  ('11111111-1111-1111-1111-111111111111','Sales memory','Top revenue leak','After-hours calls going to voicemail and never returned','2026-04-28T10:00:00Z'),
  ('11111111-1111-1111-1111-111111111111','Brand memory','Tone','Warm, reassuring, expert — dignity-first language, never clinical','2026-05-02T10:00:00Z');

insert into activity_logs (tenant_id, kind, message, project_id, at) values
  ('11111111-1111-1111-1111-111111111111','approval_requested','Approval requested: Inbound instant-response message','a0000000-0000-0000-0000-000000000002','2026-06-06T15:30:00Z'),
  ('11111111-1111-1111-1111-111111111111','deliverable_added','Deliverable added: Inbound Response Message — Draft v2','a0000000-0000-0000-0000-000000000002','2026-06-06T10:00:00Z'),
  ('11111111-1111-1111-1111-111111111111','milestone_reached','Milestone reached: Instant-response live in staging','a0000000-0000-0000-0000-000000000002','2026-06-02T16:20:00Z'),
  ('11111111-1111-1111-1111-111111111111','report_published','Report published: May Operating Recap',null,'2026-06-01T09:00:00Z'),
  ('11111111-1111-1111-1111-111111111111','approval_requested','Approval requested: June content calendar','a0000000-0000-0000-0000-000000000005','2026-06-04T12:00:00Z'),
  ('11111111-1111-1111-1111-111111111111','integration_changed','Calendar integration is pending your approval',null,'2026-06-03T14:00:00Z');
