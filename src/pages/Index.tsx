import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { RANKS, SAVINGS_PLANS, FAQS } from "@/lib/thv-data";
import heroImg from "@/assets/hero-treasure.jpg";
import {
  ArrowRight, ShieldCheck, Sparkles, TrendingUp, Users, Wallet,
  CheckCircle2, Star, Award, PiggyBank, Gift, ChevronDown,
} from "lucide-react";
import { useState } from "react";

const fmtN = (n: number) => "\u20a6" + n.toLocaleString();

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
      <span className="h-1 w-1 rounded-full bg-gold" /> {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gold">
              <Sparkles className="h-3.5 w-3.5" /> 1st Anniversary — 30% Christmas Promo Live
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
              Unearth <span className="text-gradient-gold">Treasures</span><br />
              Beyond Imagination.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Treasure Hunt Ventures is a premium savings & food-reward investment community.
              Register from <span className="text-gold font-semibold">\u20a62,500</span>, choose your rank or savings plan, and watch your money work for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.03]">
                Start Investing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/plans" className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur hover:bg-gold/10">
                View Plans
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Safe & Secure</div>
              <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-gold" /> Up to 25% Interest</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> Tangible Rewards</div>
            </div>
          </div>
          <div className="relative">
            <div className="animate-float relative mx-auto max-w-md">
              <div className="absolute -inset-8 -z-10 rounded-full bg-gold/15 blur-3xl" />
              <img src={heroImg} alt="Treasure chest with gold and naira notes" className="rounded-3xl border border-gold/20 shadow-glow" />
              <div className="absolute -bottom-6 -left-4 rounded-2xl border border-gold/30 bg-card/90 px-4 py-3 backdrop-blur-xl shadow-gold">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Payout</div>
                <div className="font-display text-xl text-gradient-gold">\u20a66,500,000</div>
              </div>
              <div className="absolute -top-4 -right-4 rounded-2xl border border-gold/30 bg-card/90 px-4 py-3 backdrop-blur-xl shadow-gold">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Interest</div>
                <div className="font-display text-xl text-gradient-gold">+30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: "\u20a62.4B+", l: "Disbursed in Rewards" },
    { v: "12,000+", l: "Active Treasure Hunters" },
    { v: "25%", l: "Max Interest Rate" },
    { v: "11 mo", l: "Reward Cycle" },
  ];
  return (
    <section className="border-y border-gold/10 bg-card/40 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-3xl text-gradient-gold sm:text-4xl">{s.v}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionEyebrow>About Us</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Wealth-building with <span className="text-gradient-gold">tangible rewards.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Treasure Hunt Ventures combines the best of cooperative savings and investment.
            We believe wealth shouldn&apos;t be a virtual promise — every contribution returns to you as
            either premium food packages or guaranteed cash interest.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Transparent, reward-based system","Zero risk — physical rewards you can see","Encourages consistent saving culture","Growing community of smart investors"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { i: Users, n: "12K+", l: "Members" },
            { i: PiggyBank, n: "20–25%", l: "Interest" },
            { i: Gift, n: "4 Ranks", l: "Food Packages" },
            { i: ShieldCheck, n: "100%", l: "Secured" },
          ].map(({ i: Icon, n, l }) => (
            <div key={l} className="glass rounded-2xl p-6">
              <Icon className="h-7 w-7 text-gold" />
              <div className="mt-4 font-display text-2xl text-gradient-gold">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section id="plans" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Investment Ranks</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Choose Your <span className="text-gradient-gold">Treasure Tier.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Four premium ranks. Save monthly for 5 months, receive your reward package after the 11-month cycle.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {RANKS.map((r, i) => (
          <div key={r.id} className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
            <div className="flex items-center justify-between">
              <Award className="h-7 w-7 text-gold" />
              {i === 3 && <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">Top Tier</span>}
            </div>
            <h3 className="mt-4 font-display text-xl">{r.name}</h3>
            <p className="text-xs text-muted-foreground">{r.tagline}</p>
            <div className="mt-4 font-display text-3xl text-gradient-gold">{fmtN(r.price)}</div>
            <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Total investment / cycle</div>
            <div className="my-5 gold-divider" />
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-gold">With Referral Package</div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {r.with.slice(0, 5).map((b) => (
                  <li key={b} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>{b}</span>
                  </li>
                ))}
                {r.with.length > 5 && (
                  <li className="pl-5 text-[11px] italic text-gold/70">+ {r.with.length - 5} more items</li>
                )}
              </ul>
            </div>
            <Link to="/signup" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-2.5 text-sm font-semibold text-navy-deep transition-transform hover:scale-[1.02]">
              Select Rank <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-border/50 pb-2.5">
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{k}</dt>
      <dd className={highlight ? "text-gold" : "text-foreground/90"}>{v}</dd>
    </div>
  );
}

function SavingsPlansSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Cash Savings Plans</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Save Capital. <span className="text-gradient-gold">Spend Interest.</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SAVINGS_PLANS.map((p) => (
          <div key={p.id} className="glass relative overflow-hidden rounded-3xl p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
            <PiggyBank className="h-9 w-9 text-gold" />
            <h3 className="mt-4 font-display text-2xl">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl text-gradient-gold">{p.rate}</span>
              <span className="text-sm text-muted-foreground">interest at maturity</span>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <Row k="Duration" v={p.duration} />
              <Row k="Method" v={p.method} />
              <Row k="Payout" v={p.payout} />
              <Row k="Example" v={p.example} highlight />
              <Row k="Best for" v={p.bestFor} />
            </dl>
            <Link to="/signup" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">
              Start Saving <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Register", d: "Sign up and pay the one-time \u20a62,500 registration fee to become an official Treasure Hunter." },
    { n: "02", t: "Choose Your Plan", d: "Pick a rank (Master, Chief, Odogwu, Ijele) or a savings plan that fits your goals." },
    { n: "03", t: "Save Monthly", d: "Pay outright or in installments. Late payments before the 25th of each month avoid penalties." },
    { n: "04", t: "Get Rewarded", d: "Receive your food package or interest payout at the end of your cycle. Eat well. Earn big." },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>How It Works</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Four simple steps to <span className="text-gradient-gold">treasure.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative">
            <div className="rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur transition-all hover:border-gold/40 hover:shadow-gold">
              <div className="font-display text-5xl text-gradient-gold opacity-80">{s.n}</div>
              <h3 className="mt-3 font-display text-lg">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
            {i < steps.length - 1 && <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gold/30 lg:block" />}
          </div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { i: ShieldCheck, t: "Transparent System", d: "Clear cycles, defined ranks, predictable rewards. No virtual promises." },
    { i: TrendingUp, t: "Guaranteed Returns", d: "Earn up to 25% interest or food rewards worth more than your contribution." },
    { i: Users, t: "Referral Bonuses", d: "Refer Hunters to unlock the full premium reward package for your rank." },
    { i: Wallet, t: "Flexible Payments", d: "Pay outright or spread payments monthly. You stay in control of your cash flow." },
    { i: Award, t: "Rank Migration", d: "Upgrade to a higher rank anytime with a small \u20a65,000 migration fee." },
    { i: Sparkles, t: "Anniversary Promos", d: "Special 30% interest boost for savings of \u20a6500,000+ during anniversary windows." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Why Choose Us</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Built for <span className="text-gradient-gold">smart savers.</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ i: Icon, t, d }) => (
          <div key={t} className="group rounded-2xl border border-gold/15 bg-card/50 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
            <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30 transition-transform group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { n: "Adaeze O.", r: "Ijele Hunter", q: "I received my full food package on time — 4 bags of rice, yam, semo, everything. Best decision I made this year.", rt: 5 },
    { n: "Tunde A.", r: "Plan B Saver", q: "Earned 25% interest on my \u20a6300,000. The team was transparent throughout the entire cycle.", rt: 5 },
    { n: "Chinaza E.", r: "Chief Hunter", q: "I referred two friends and unlocked the full referral package. Truly rewarding community.", rt: 5 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Stories from our <span className="text-gradient-gold">Hunters.</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.map((x) => (
          <div key={x.n} className="rounded-2xl border border-gold/15 bg-card/60 p-7 backdrop-blur">
            <div className="flex gap-0.5">
              {Array.from({ length: x.rt }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-gold" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">&ldquo;{x.q}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold font-bold text-navy-deep">
                {x.n[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{x.n}</div>
                <div className="text-xs text-gold/80">{x.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <SectionEyebrow>FAQs</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Frequently asked <span className="text-gradient-gold">questions.</span>
        </h2>
      </div>
      <div className="mt-10 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-xl border border-gold/15 bg-card/60 backdrop-blur">
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-medium text-foreground">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="min-h-0">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-navy p-10 text-center shadow-glow sm:p-16">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
        <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Ready to <span className="text-gradient-gold">unearth your treasure?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Join thousands of smart investors. Register today for just \u20a62,500 and start your reward journey.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.03]">
            Create Free Account <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10">
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Stats />
      <About />
      <Plans />
      <SavingsPlansSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTA />
    </SiteLayout>
  );
}