ALTER TABLE public.profiles ADD COLUMN balance_activated_at timestamptz;
ALTER TABLE public.profiles ADD COLUMN settlement_month date;

-- Backfill members whose balance is already active: activation time falls back to their last profile update.
UPDATE public.profiles
SET balance_activated_at = COALESCE(updated_at, created_at),
    settlement_month = (COALESCE(updated_at, created_at) + interval '11 months')::date
WHERE balance_active = true AND balance_activated_at IS NULL;

COMMENT ON COLUMN public.profiles.balance_activated_at IS 'Timestamp when balance_active first became true; settlement month is 11 months after this';
COMMENT ON COLUMN public.profiles.settlement_month IS 'Member-editable settlement month (date), automatically initialized to balance_activated_at + 11 months';

-- When a balance first becomes active, stamp the activation time and settlement month (activation + 11 months).
CREATE OR REPLACE FUNCTION public.set_balance_activation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.balance_active AND NOT COALESCE(OLD.balance_active, false) THEN
    NEW.balance_activated_at := now();
    NEW.settlement_month := (now() + interval '11 months')::date;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_balance_activation
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_balance_activation();

-- Members may only change their own settlement month once the 11-month period has elapsed;
-- service_role / backend administration (auth.uid() is null) is not restricted.
CREATE OR REPLACE FUNCTION public.guard_settlement_month()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.settlement_month IS DISTINCT FROM OLD.settlement_month
     AND auth.uid() = OLD.id
  THEN
    IF NOT COALESCE(OLD.balance_active, false) OR OLD.balance_activated_at IS NULL THEN
      RAISE EXCEPTION 'Your balance must be active before the settlement month can be changed.';
    END IF;
    IF now() < OLD.balance_activated_at + interval '11 months' THEN
      RAISE EXCEPTION 'You can change your settlement month only after the 11-month period has elapsed.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_guard_settlement_month
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.guard_settlement_month();