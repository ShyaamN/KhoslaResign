create table if not exists pending_signatories (
  id text primary key,
  email text not null,
  email_normalized text not null,
  name text not null,
  role text not null check (role in ('student', 'staff')),
  affiliation text,
  message text,
  code_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists pending_signatories_email_idx
  on pending_signatories (email_normalized);

create table if not exists signatures (
  id text primary key,
  name text not null,
  role text not null check (role in ('student', 'staff')),
  affiliation text,
  message text,
  email_hash text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists signatures_created_at_idx
  on signatures (created_at desc);
