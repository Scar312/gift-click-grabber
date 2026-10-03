ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS bank_name text,
  ADD COLUMN IF NOT EXISTS bank_account_number text,
  ADD COLUMN IF NOT EXISTS bank_account_name text;

UPDATE public.profiles p SET email = u.email FROM auth.users u WHERE u.id = p.id AND p.email IS NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
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
  INSERT INTO public.profiles (id, account_id, full_name, phone, referral_code, referred_by, email)
  VALUES (NEW.id, new_account_id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'phone', ''), replace(new_account_id, '-', ''), referrer,
    NULLIF(COALESCE(NEW.raw_user_meta_data ->> 'contact_email', NEW.email), ''));
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.sync_profile_email()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.email IS DISTINCT FROM OLD.email AND NEW.email NOT LIKE '%@phone.thv.local' THEN
    UPDATE public.profiles SET email = NEW.email WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;
CREATE TRIGGER on_auth_user_email_updated AFTER UPDATE OF email ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.sync_profile_email();

-- lets phone-number login resolve to the account's sign-in address without exposing profiles
CREATE OR REPLACE FUNCTION public.login_email_for_phone(_phone text)
 RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT u.email FROM auth.users u JOIN public.profiles p ON p.id = u.id
  WHERE regexp_replace(p.phone, '\D', '', 'g') = regexp_replace(_phone, '\D', '', 'g')
    AND length(regexp_replace(_phone, '\D', '', 'g')) >= 7
  ORDER BY p.created_at LIMIT 1
$$;
GRANT EXECUTE ON FUNCTION public.login_email_for_phone(text) TO anon, authenticated;