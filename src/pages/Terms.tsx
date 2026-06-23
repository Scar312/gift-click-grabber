import { SiteLayout } from "@/components/brand/SiteLayout";

const sections = [
  { t: "1. Registration", b: "Every participant must complete the official registration process and provide accurate personal information. Registration is non-transferable and valid for ONE individual ONLY on one investment cycle. A ₦2,500 one-time registration fee per cycle is required." },
  { t: "2. Payment Policy", b: "All installment payments must be made on or before the 25th day of each month. Late payment attracts a 40% penalty fee, which must be paid together with the defaulted and current month's installment. Payments must be made only through official Treasure Hunt Ventures payment channels." },
  { t: "3. Ranks and Migration", b: "Investors are categorized under different investment ranks with unique benefits. Downgrading of rank is not permitted. Investors may migrate to a higher rank at any time by paying a ₦5,000 migration fee, in addition to completing full payment for the new rank." },
  { t: "4. Returns and Benefits", b: "Investment benefits (goods, rewards, or interests) are strictly based on the rank and contribution plan. All rewards shall be distributed according to the official schedule. The company reserves the right to adjust benefits in line with prevailing market conditions; official updates will be notified before applying." },
  { t: "5. Interest Rate (Savings Plan)", b: "Savings participants earn 20% – 25% interest over the agreed term, subject to compliance with all payment plan schedules. Early withdrawal before maturity may result in a reduction or forfeiture of accumulated interest." },
  { t: "6. Default and Termination", b: "Repeated payment defaults, false information, or breach of these terms may lead to suspension or termination of membership. Treasure Hunt Ventures reserves the right to take necessary actions to protect platform integrity." },
  { t: "7. Refund Policy", b: "Refunds, where applicable, will be processed only upon management approval and after deducting applicable administrative and penalty charges. No refund shall be issued after benefits have been disbursed." },
  { t: "8. Communication", b: "All official updates, announcements, and notices shall be communicated via the company's verified phone numbers, website, or official social media platforms. Investors are advised to disregard unauthorized communication." },
  { t: "9. Confidentiality", b: "All personal and financial data shared with Treasure Hunt Ventures shall be treated with the highest confidentiality and used only for business purposes." },
  { t: "10. Amendments", b: "Treasure Hunt Ventures reserves the right to review, modify, or update these Terms and Conditions at any time. Updated versions take immediate effect once published." },
  { t: "11. Acceptance", b: "By registering and participating, you acknowledge that you have read, understood, and agreed to these Terms and Conditions." },
];

export default function Terms() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Terms & <span className="text-gradient-gold">Conditions</span></h1>
        <p className="mt-4 italic text-gold/80">&ldquo;Let&apos;s unearth treasures beyond your imagination.&rdquo;</p>
        <div className="mt-10 space-y-6">
          {sections.map((s) => (
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
