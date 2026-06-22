import { SiteLayout } from "@/components/brand/SiteLayout";

const steps = [
  { n: "01", t: "Register with \u20a62,500", d: "Pay the one-time registration fee to become an official Treasure Hunter and unlock access to all plans." },
  { n: "02", t: "Choose Your Plan", d: "Pick a rank (Master, Chief, Odogwu, Ijele) or a cash savings plan (Plan A or B) that matches your goals." },
  { n: "03", t: "Pay Outright or Installmentally", d: "Pay your full investment up front, or spread payments across monthly installments. Late payments before the 25th of each month avoid the 40% penalty fee." },
  { n: "04", t: "Refer & Unlock Full Package", d: "Refer at least one Hunter in your rank or above to unlock the full premium reward package for your tier." },
  { n: "05", t: "Receive Your Reward", d: "After the 11-month cycle (or your savings maturity), receive your food package or cash interest at the official distribution event." },
];

export default function HowItWorks() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">How It <span className="text-gradient-gold">Works</span></h1>
        <p className="mt-4 text-muted-foreground">A simple, transparent path from registration to reward.</p>
        <div className="mt-12 space-y-4">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5 rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur">
              <div className="font-display text-4xl text-gradient-gold">{s.n}</div>
              <div>
                <h3 className="font-display text-lg">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}