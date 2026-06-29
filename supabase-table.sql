create table participants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  first_name text not null,
  last_name text not null,
  birthdate date,
  address text,
  zip text,
  city text,
  email text not null,
  phone text not null,
  winner boolean default false
);

create unique index unique_participant_email on participants (lower(email));
