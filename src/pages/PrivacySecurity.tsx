import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { Button } from "@/components/ui/button";
import { auth, useAuth } from "@/lib/auth";
import { Copy, Check, ShieldCheck, KeyRound } from "lucide-react";

export default function PrivacySecurity() {
  const { user, loading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState("");

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const copy = async () => {
    await navigator.clipboard.writeText(user.accountId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.next.length < 6) return setStatus("New password must be at least 6 characters.");
    if (pwd.next !== pwd.confirm) return setStatus("New passwords do not match.");
    setStatus("Updating...");
    try {
      await auth.changePassword(pwd.current, pwd.next);
      setPwd({ current: "", next: "", confirm: "" });
      setStatus("Password updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not update password.");
    }
  };

  const field = "mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/60";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-display text-3xl sm:text-5xl">Privacy & <span className="text-gradient-gold">Security</span></h1>

        <div className="mt-10 rounded-2xl border border-gold/15 bg-card/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><ShieldCheck className="h-4 w-4 text-gold" /> Your THV ID</div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 font-mono text-lg text-gold">{user.accountId}</span>
            <Button type="button" variant="outline" onClick={() => void copy()} className="rounded-full border-gold/40 text-gold">
              {copied ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy ID</>}
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Share this ID with our team when confirming payments. Never share your password with anyone.</p>
        </div>

        <form onSubmit={savePassword} className="mt-6 space-y-5 rounded-2xl border border-gold/15 bg-card/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><KeyRound className="h-4 w-4 text-gold" /> Change password</div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Current Password<input type="password" required value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">New Password<input type="password" required minLength={6} value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Confirm New Password<input type="password" required minLength={6} value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} className={field} /></label>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
          <Button className="w-full rounded-full bg-gradient-gold text-navy-deep">Update Password</Button>
        </form>
      </section>
    </SiteLayout>
  );
}
