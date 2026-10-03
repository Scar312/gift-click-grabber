DROP FUNCTION IF EXISTS public.login_email_for_phone(text);
REVOKE EXECUTE ON FUNCTION public.sync_profile_email() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.protect_account_activated() FROM PUBLIC, anon, authenticated;