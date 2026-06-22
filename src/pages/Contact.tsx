import { SiteLayout } from "@/components/brand/SiteLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

function Inp({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input required type={type} className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30" />
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="font-display text-3xl sm:text-5xl">Get in <span className="text-gradient-gold">touch</span></h1>
        <p className="mt-4 text-muted-foreground">Our team is here to help. Reach out and we&apos;ll respond within 24 hours.</p>
        <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 sm:space-y-5">
            {[
              { i: Mail, t: "Email", v: "tochiumezinwa@gmail.com" },
              { i: Phone, t: "Phone", v: "+2348038385255" },
              { i: MapPin, t: "Office", v: "Lagos, Nigeria" },
            ].map(({ i: Icon, t, v }) => (
              <div key={t} className="flex items-start gap-4 rounded-2xl border border-gold/15 bg-card/60 p-4 sm:p-5 backdrop-blur">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
                  <div className="mt-0.5 break-words text-foreground">{v}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass rounded-3xl p-5 sm:p-8 space-y-4">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-gradient-gold font-display text-3xl">Thank you!</div>
                <p className="mt-2 text-muted-foreground">We&apos;ve received your message.</p>
              </div>
            ) : (
              <>
                <Inp label="Name" />
                <Inp label="Email" type="email" />
                <Inp label="Subject" />
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea required rows={5} className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30" />
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}