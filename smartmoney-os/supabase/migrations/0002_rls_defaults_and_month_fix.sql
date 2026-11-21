-- SmartMoney OS hardening migration: automatically bind inserts to the authenticated user.
alter table public.transactions alter column user_id set default auth.uid();
alter table public.budgets alter column user_id set default auth.uid();
alter table public.savings_goals alter column user_id set default auth.uid();

-- Replace the initial month-format check with an explicit numeric format.
alter table public.budgets drop constraint if exists budgets_month_check;
alter table public.budgets drop constraint if exists budgets_month_format_check;
alter table public.budgets add constraint budgets_month_format_check check (month ~ '^[0-9]{4}-[0-9]{2}$');