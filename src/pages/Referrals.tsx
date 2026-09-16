import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { Button } from "@/components/ui/button";
import { auth, useAuth, type Referral } from "@/lib/auth";
import { Copy, Check, Users, Gift } from "lucide-react";

export default function Referrals() {
  const { user, loading } = useAuth();
  const [rows, setRows] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) void auth.referrals().then(setRows);
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const activated = rows.filter((r) => r.balanceActive && r.walletBalance > 0);
  const copy = async () => {
    await navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stage = (r: Referral) =>
    r.balanceActive && r.walletBalance > 0
      ? "Balance active"
      : r.planName
        ? "Funding pending"
        : "Registered";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-display text-3xl sm:text-5xl">Referral <span className="text-gradient-gold">Program</span></h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Share your code. A referral counts once your invitee signs up, funds their account and their balance is active.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-gold/15 bg-card/60 p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Gift className="h-4 w-4 text-gold" /> Your referral code</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 font-mono text-lg text-gold">{user.referralCode}</span>
              <Button type="button" variant="outline" onClick={() => void copy()} className="rounded-full border-gold/40 text-gold">
                {copied ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-gold/15 bg-card/60 p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Users className="h-4 w-4 text-gold" /> Qualified referrals</div>
            <div className="mt-3 font-display text-4xl text-gradient-gold">{activated.length}</div>
            <div className="mt-1 text-xs text-muted-foreground">{rows.length} total sign-ups with your code</div>
          </div>
        </div>

        <h2 className="mt-12 font-display text-2xl">Referral log</h2>
        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No one has used your code yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gold/15 bg-card/60">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-widest text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">THV ID</th>
                  <th className="px-4 py-3">Signed up</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Stage</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">{r.fullName || "Member"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gold">{r.accountId}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(r.joinedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.planName ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-3 py-1 text-[11px] ${stage(r) === "Balance active" ? "border-gold/40 bg-gold/10 text-gold" : "border-border text-muted-foreground"}`}>{stage(r)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
