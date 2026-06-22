import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { RANKS, SAVINGS_PLANS } from "@/lib/thv-data";
import { CheckCircle2, ArrowRight, Award, PiggyBank } from "lucide-react";

export default function Plans() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Investment <span className="text-gradient-gold">Plans</span></h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Four food-reward ranks and two cash savings plans. Pick what fits your goals.</p>

        <h2 className="mt-14 flex items-center gap-2 font-display text-2xl"><Award className="h-6 w-6 text-gold" /> Food Reward Ranks</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {RANKS.map((r) => (
            <div key={r.id} className="rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur transition-all hover:border-gold/40 hover:shadow-gold">
              <h3 className="font-display text-xl">{r.name}</h3>
              <div className="mt-2 font-display text-3xl text-gradient-gold">{"\u20a6" + r.price.toLocaleString()}</div>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-gold">With Referral</div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {r.with.map((b) => <li key={b} className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />{b}</li>)}
              </ul>
              <div className="my-4 gold-divider" />
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Without Referral</div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {r.without.map((b) => <li key={b} className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/60" />{b}</li>)}
              </ul>
              <Link to="/signup" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-2.5 text-sm font-semibold text-navy-deep">
                Select <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <h2 className="mt-20 flex items-center gap-2 font-display text-2xl"><PiggyBank className="h-6 w-6 text-gold" /> Cash Savings Plans</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SAVINGS_PLANS.map((p) => (
            <div key={p.id} className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl">{p.name}</h3>
              <div className="mt-3 font-display text-5xl text-gradient-gold">{p.rate}</div>
              <dl className="mt-5 space-y-2 text-sm">
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Duration</dt><dd>{p.duration}</dd></div>
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Method</dt><dd>{p.method}</dd></div>
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Payout</dt><dd>{p.payout}</dd></div>
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Example</dt><dd className="text-gold">{p.example}</dd></div>
              </dl>
              <Link to="/signup" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">Start Saving <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}