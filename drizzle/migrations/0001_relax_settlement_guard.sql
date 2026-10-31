CREATE OR REPLACE FUNCTION public.guard_settlement_month()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.settlement_month IS DISTINCT FROM OLD.settlement_month
     AND auth.uid() = OLD.id
  THEN
    IF NOT COALESCE(OLD.balance_active, false) OR OLD.balance_activated_at IS NULL THEN
      RAISE EXCEPTION 'Your balance must be active before the settlement month can be changed.';
    END IF;
    IF NEW.settlement_month IS NULL
       OR NEW.settlement_month < (OLD.balance_activated_at + interval '11 months')::date THEN
      RAISE EXCEPTION 'The settlement date must be on or after your 11-month eligibility date.';
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;