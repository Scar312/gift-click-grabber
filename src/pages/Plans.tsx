import { SiteLayout } from "@/components/brand/SiteLayout";
import { RANKS, SAVINGS_PLANS } from "@/lib/thv-data";
import { CheckCircle2, ArrowRight, Award, PiggyBank, Gift } from "lucide-react";

const PROTEIN = [
  { id: "protein-goat", name: "Big Goat", price: 100000 },
  { id: "protein-broilers", name: "3 Big Broilers", price: 50000 },
  { id: "protein-layers", name: "7 Big Layers", price: 50000 },
];
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentDialog, type PaymentChoice } from "@/components/brand/PaymentDialog";

export default function Plans() {
  const [choice, setChoice] = useState<PaymentChoice | null>(null);

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
              <div className="mt-2 font-display text-3xl text-gradient-gold">{"₦" + r.price.toLocaleString()}</div>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-gold">With Referral</div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {r.with.map((b) => <li key={b} className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />{b}</li>)}
              </ul>
              <div className="my-4 gold-divider" />
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Without Referral</div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {r.without.map((b) => <li key={b} className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/60" />{b}</li>)}
              </ul>
              <p className="mt-4 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-[11px] text-gold">New: 10% cashback at settlement on Outright payment</p>
              <div className="mt-6 grid gap-2">
                <Button onClick={() => setChoice({ id: r.id, name: r.name, price: r.price, type: "installment" })} variant="outline" className="w-full rounded-full border-gold/40 text-gold">Installment · ₦{(r.price / 5).toLocaleString()}/mo</Button>
                <Button onClick={() => setChoice({ id: r.id, name: r.name, price: r.price, type: "outright" })} className="w-full rounded-full bg-gradient-gold text-navy-deep">Outright Payment <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-20 flex items-center gap-2 font-display text-2xl"><PiggyBank className="h-6 w-6 text-gold" /> Cash Savings Plans</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SAVINGS_PLANS.map((p) => (
            <div key={p.id} className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl">{p.name}</h3>
              <div className="mt-3 font-display text-5xl text-gradient-gold">{p.rate}</div>
              {p.id === "plan-b" && <p className="mt-3 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-xs text-gold">New: 10% cashback at settlement</p>}
              <dl className="mt-5 space-y-2 text-sm">
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Duration</dt><dd>{p.duration}</dd></div>
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Method</dt><dd>{p.method}</dd></div>
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Payout</dt><dd>{p.payout}</dd></div>
                <div><dt className="text-muted-foreground text-xs uppercase tracking-widest">Example</dt><dd className="text-gold">{p.example}</dd></div>
              </dl>
              <div className="mt-6 grid gap-2">
                <Button
                  onClick={() => setChoice({ id: `${p.id}-installment`, name: p.name, price: 0, type: "installment", kind: "savings", amountEditable: true, note: `${p.duration} · ${p.rate} interest · ${p.payout}` })}
                  variant="outline"
                  className="w-full rounded-full border-gold/40 text-gold"
                >
                  Installment Savings · 5 months
                </Button>
                <Button
                  onClick={() => setChoice({ id: `${p.id}-outright`, name: p.name, price: 0, type: "outright", kind: "savings", amountEditable: true, note: `${p.duration} · ${p.rate} interest · ${p.payout}` })}
                  className="w-full rounded-full bg-gradient-gold text-navy-deep"
                >
                  Start Saving — Outright <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

            </div>
          ))}
        </div>

        <h2 id="december-protein" className="mt-20 scroll-mt-24 flex items-center gap-2 font-display text-2xl"><Gift className="h-6 w-6 text-gold" /> December Protein</h2>
        <p className="mt-2 text-sm text-muted-foreground">Payable in 2 installments or in full.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {PROTEIN.map((x) => (
            <div key={x.id} className="rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur transition-all hover:border-gold/40 hover:shadow-gold">
              <h3 className="font-display text-xl">{x.name}</h3>
              <div className="mt-2 font-display text-3xl text-gradient-gold">₦{x.price.toLocaleString()}</div>
              <div className="mt-6 grid gap-2">
                <Button onClick={() => setChoice({ id: x.id, name: `December Protein — ${x.name}`, price: x.price, type: "installment", installments: 2 })} variant="outline" className="w-full rounded-full border-gold/40 text-gold">2 Installments · ₦{(x.price / 2).toLocaleString()}</Button>
                <Button onClick={() => setChoice({ id: x.id, name: `December Protein — ${x.name}`, price: x.price, type: "outright" })} className="w-full rounded-full bg-gradient-gold text-navy-deep">Outright Payment <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <PaymentDialog choice={choice} onClose={() => setChoice(null)} />
    </SiteLayout>
  );
}
