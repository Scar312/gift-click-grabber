import { SiteLayout } from "@/components/brand/SiteLayout";
import { Target, Eye, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">About <span className="text-gradient-gold">Treasure Hunt Ventures</span></h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Treasure Hunt Ventures is a premium wealth-building and food-reward investment platform designed
          to help individuals save smartly and enjoy tangible rewards. Founded on transparency, structured accountability,
          and community growth, we combine the best of cooperative savings with structured investment returns.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { i: Target, t: "Our Mission", d: "To empower individuals through structured savings, mutual support, and rewarding outcomes that improve food security and financial discipline." },
            { i: Eye, t: "Our Vision", d: "To become Africa's most trusted reward-based investment community, transforming how people save and build wealth." },
            { i: Heart, t: "Our Values", d: "Transparency, integrity, community, and tangible results — no virtual promises, only physical rewards you can hold." },
            { i: Award, t: "Our Promise", d: "We save your capital, you spend the interest. Every cycle ends with a guaranteed reward worth more than your contribution." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="glass rounded-2xl p-7">
              <Icon className="h-7 w-7 text-gold" />
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}