create extension if not exists pgcrypto;
create table if not exists public.transactions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 100),
 amount numeric(14,2) not null check (amount > 0),
 type text not null check (type in ('expense','income','investment','saving','transfer')),
 category text not null check (char_length(category) between 1 and 80),
 platform text check (platform is null or char_length(platform)<=100),
 purpose text check (purpose is null or char_length(purpose)<=200),
 payment_method text check (payment_method is null or char_length(payment_method)<=50),
 account_name text check (account_name is null or char_length(account_name)<=100),
 occurred_on date not null default current_date,
 recurring boolean not null default false,
 notes text check (notes is null or char_length(notes)<=500),
 created_at timestamptz not null default now()
);
create index if not exists transactions_user_date_idx on public.transactions(user_id,occurred_on desc);
create table if not exists public.budgets (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 category text not null check (char_length(category) between 1 and 80),
 monthly_limit numeric(14,2) not null check (monthly_limit>0),
 month text not null check (month ~ '^\\d{4}-\\d{2}$'),
 created_at timestamptz not null default now(),
 unique(user_id,category,month)
);
create table if not exists public.savings_goals (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(name) between 1 and 100),
 target_amount numeric(14,2) not null check (target_amount>0),
 current_amount numeric(14,2) not null default 0 check (current_amount>=0),
 target_date date,
 created_at timestamptz not null default now()
);
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.savings_goals enable row level security;
drop policy if exists "Users manage own transactions" on public.transactions;
create policy "Users manage own transactions" on public.transactions for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
drop policy if exists "Users manage own budgets" on public.budgets;
create policy "Users manage own budgets" on public.budgets for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
drop policy if exists "Users manage own savings goals" on public.savings_goals;
create policy "Users manage own savings goals" on public.savings_goals for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
grant select,insert,update,delete on public.transactions to authenticated;
grant select,insert,update,delete on public.budgets to authenticated;
grant select,insert,update,delete on public.savings_goals to authenticated;