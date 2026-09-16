import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/brand/Logo";
import { Loader2 } from "lucide-react";

export default function Verify() {
  const { user, loading } = useAuth();
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setWaited(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-navy px-6 text-center">
      <div>
        <Link to="/" className="inline-block"><Logo size={52} /></Link>
        {loading || !waited ? (
          <>
            <h1 className="mt-8 font-display text-2xl">Verifying your email…</h1>
            <p className="mt-2 text-sm text-muted-foreground">Signing you in and opening your dashboard.</p>
            <Loader2 className="mx-auto mt-6 h-6 w-6 animate-spin text-gold" />
          </>
        ) : (
          <>
            <h1 className="mt-8 font-display text-2xl">We couldn't confirm this link</h1>
            <p className="mt-2 text-sm text-muted-foreground">The link may have expired. Try signing in, or request a new code.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/login" className="rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">Sign In</Link>
              <Link to="/signup" className="rounded-full border border-gold/40 px-6 py-2.5 text-sm text-gold">Get a new code</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
