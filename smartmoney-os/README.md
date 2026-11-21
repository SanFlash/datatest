# SmartMoney OS

A dark fintech personal finance dashboard for INR manual transaction tracking. Includes authenticated access, expenses, income, investments, savings, platform and purpose capture, monthly budgets, savings goals, cash-flow summaries and CSV export.

## Stack

- Responsive HTML/CSS/JavaScript frontend
- Supabase Auth + PostgreSQL REST API
- PostgreSQL Row Level Security (RLS)
- Vercel deployment

## Setup

1. Create a Supabase project.
2. Run `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL Editor.
3. Run `supabase/migrations/0002_rls_defaults_and_month_fix.sql` after migration 0001.
4. Visit https://smartmoney-os.vercel.app and enter your Supabase Project URL and **publishable/anon key**. These client settings are held only in the current browser session.
5. Create an account and sign in. Configure Supabase Auth Site URL and allowed redirect URLs for `https://smartmoney-os.vercel.app`.

Never enter a Supabase service-role key. Never store bank passwords, UPI PINs, OTPs or card CVVs. All finance tables enforce `auth.uid() = user_id` using RLS, and new records default their owner to the authenticated user.

## Accounting rules

- Expenses are consumption outflows.
- Investments and savings are reported separately from expenses.
- Transfers are excluded from consumption/net-position calculations to avoid double counting.
- Dashboard figures reflect manually recorded transactions, not verified bank balances or market valuations.
- This is a personal tracking tool, not regulated financial advice or a payment initiation service.
