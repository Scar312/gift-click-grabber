import { SiteLayout } from "@/components/brand/SiteLayout";

export default function Privacy() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Privacy <span className="text-gradient-gold">Policy</span></h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Treasure Hunt Ventures respects your privacy. All personal and financial data shared with us shall be treated with the highest confidentiality and used only for business purposes. We never share, sell, or expose your data to third parties without explicit consent.
        </p>
        <div className="mt-10 space-y-6">
          {[
            { t: "Information We Collect", b: "Name, contact details, payment information, and investment activity necessary to administer your account." },
            { t: "How We Use It", b: "To process your registration, manage your investment cycle, communicate updates, and disburse rewards." },
            { t: "Data Security", b: "We employ industry-standard security measures, including encryption in transit and access controls, to protect your information." },
            { t: "Your Rights", b: "You may request access, correction, or deletion of your personal data at any time by contacting support." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-gold/15 bg-card/60 p-6 backdrop-blur">
              <h2 className="font-display text-xl text-gold">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}