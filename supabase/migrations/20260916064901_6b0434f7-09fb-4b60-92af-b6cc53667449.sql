ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS home_address text,
  ADD COLUMN IF NOT EXISTS referral_code text,
  ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS wallet_balance numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS balance_active boolean NOT NULL DEFAULT false;

UPDATE public.profiles SET referral_code = replace(account_id, '-', '') WHERE referral_code IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_referral_code_key ON public.profiles (referral_code);
CREATE INDEX IF NOT EXISTS profiles_referred_by_idx ON public.profiles (referred_by);

CREATE POLICY "Users can view profiles they referred"
ON public.profiles FOR SELECT TO authenticated
USING (referred_by = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  new_account_id text;
  ref_code text;
  referrer uuid;
BEGIN
  new_account_id := 'THV-' || lpad(nextval('public.account_id_seq')::text, 6, '0');
  ref_code := upper(regexp_replace(COALESCE(NEW.raw_user_meta_data ->> 'referral_code', ''), '[^A-Za-z0-9]', '', 'g'));
  IF ref_code <> '' THEN
    SELECT id INTO referrer FROM public.profiles WHERE upper(referral_code) = ref_code LIMIT 1;
  END IF;

  INSERT INTO public.profiles (id, account_id, full_name, phone, referral_code, referred_by)
  VALUES (
    NEW.id,
    new_account_id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'phone', ''),
    replace(new_account_id, '-', ''),
    referrer
  );
  RETURN NEW;
END;
$function$;