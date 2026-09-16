import { Link, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { RANKS } from "@/lib/thv-data";
import { CheckCircle2, ArrowRight, Wallet, TrendingUp } from "lucide-react";

const MIGRATION_FEE = 5000;
const WA_LINK = "https://wa.link/0ek13k";

export default function Upgrade() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const currentRank = RANKS.find((r) => r.id === user.planId);
  const hasPlan = Boolean(user.planName);
  const hasBalance = user.balanceActive && user.walletBalance > 0;
  const higher = currentRank ? RANKS.filter((r) => r.price > currentRank.price) : RANKS;

  const proceed = (name: string, cost: number) => {
    const message = `Upgrade request\nAccount ID: ${user.accountId}\nCurrent: ${user.planName ?? "None"}\nUpgrade to: ${name}\nUpgrade cost: ₦${cost.toLocaleString()}\nMy wallet funding has reflected.`;
    window.location.href = `${WA_LINK}?text=${encodeURIComponent(message)}`;
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="font-display text-3xl sm:text-5xl">Upgrade Your <span className="text-gradient-gold">Rank</span></h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Move to a higher food-reward rank by paying the difference plus a ₦{MIGRATION_FEE.toLocaleString()} migration fee.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><TrendingUp className="h-4 w-4 text-gold" /> Current plan</div>
            <div className="mt-1 text-sm">{user.planName ?? "No plan yet"}</div>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Wallet className="h-4 w-4 text-gold" /> Wallet balance</div>
            <div className="mt-1 text-sm">₦{user.walletBalance.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Balance status</div>
            <div className="mt-1 text-sm">{hasBalance ? "Active" : "Awaiting reflection"}</div>
          </div>
        </div>

        {!hasPlan || !hasBalance ? (
          <div className="mt-10 rounded-3xl border border-gold/20 bg-gold/5 p-8">
            <h2 className="font-display text-2xl">Upgrades unlock once your plan and balance are active</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {!hasPlan
                ? "Pick a plan first, then fund your account. Your wallet balance must reflect before an upgrade can be shown."
                : "Your plan is set. As soon as your funding reflects and your balance goes active, your upgrade options will appear here."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/plans" className="rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">{hasPlan ? "View Plans" : "Pick a Plan"}</Link>
              <a href={WA_LINK} className="rounded-full border border-gold/40 px-6 py-2.5 text-sm text-gold">Message us on WhatsApp</a>
            </div>
          </div>
        ) : higher.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-gold/20 bg-gold/5 p-8">
            <h2 className="font-display text-2xl">You're on the highest rank</h2>
            <p className="mt-3 text-sm text-muted-foreground">There is no rank above {user.planName}. Talk to us about additional accounts.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {higher.map((r) => {
              const cost = r.price - (currentRank?.price ?? 0) + MIGRATION_FEE;
              return (
                <div key={r.id} className="rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur transition-all hover:border-gold/40 hover:shadow-gold">
                  <h3 className="font-display text-xl">{r.name}</h3>
                  <div className="mt-2 font-display text-3xl text-gradient-gold">{"₦" + r.price.toLocaleString()}</div>
                  <div className="mt-4 rounded-xl border border-gold/20 bg-gold/5 p-3">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Your upgrade cost</div>
                    <div className="mt-1 font-display text-2xl text-gradient-gold">₦{cost.toLocaleString()}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">Difference ₦{(r.price - (currentRank?.price ?? 0)).toLocaleString()} + ₦{MIGRATION_FEE.toLocaleString()} migration fee</div>
                  </div>
                  <div className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-gold">With Referral</div>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {r.with.map((b) => <li key={b} className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />{b}</li>)}
                  </ul>
                  <div className="my-4 gold-divider" />
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Without Referral</div>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {r.without.map((b) => <li key={b} className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/60" />{b}</li>)}
                  </ul>
                  <Button onClick={() => proceed(r.name, cost)} className="mt-6 w-full rounded-full bg-gradient-gold text-navy-deep">
                    Upgrade to {r.name.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-[11px] text-muted-foreground">You'll be sent to WhatsApp to confirm once your wallet funding reflects.</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
