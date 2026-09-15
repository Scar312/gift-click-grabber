ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS current_plan_id text,
  ADD COLUMN IF NOT EXISTS current_plan_name text,
  ADD COLUMN IF NOT EXISTS current_plan_type text,
  ADD COLUMN IF NOT EXISTS plan_status text,
  ADD COLUMN IF NOT EXISTS plan_updated_at timestamptz;