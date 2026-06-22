import { SiteLayout } from "@/components/brand/SiteLayout";
import { FAQS } from "@/lib/thv-data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Frequently asked <span className="text-gradient-gold">questions</span></h1>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-xl border border-gold/15 bg-card/60 backdrop-blur">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid overflow-hidden transition-all ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0"><p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}