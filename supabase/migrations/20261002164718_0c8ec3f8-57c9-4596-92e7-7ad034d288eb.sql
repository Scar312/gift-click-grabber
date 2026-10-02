ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS account_activated boolean NOT NULL DEFAULT false;
ALTER TABLE public.payment_submissions ADD COLUMN IF NOT EXISTS account_id text;

CREATE OR REPLACE FUNCTION public.protect_account_activated()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.account_activated IS DISTINCT FROM OLD.account_activated AND current_user IN ('authenticated','anon') THEN
    NEW.account_activated := OLD.account_activated;
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER protect_profiles_account_activated BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_account_activated();