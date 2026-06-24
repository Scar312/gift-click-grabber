import { SiteLayout } from "@/components/brand/SiteLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Send, MessageCircle, Users } from "lucide-react";
import { useState } from "react";

function Inp({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field: keyof typeof form, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const sendViaWhatsApp = () => {
    window.location.href = "https://wa.link/pfmaxr";
  };

  const sendViaEmail = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:thetreasurehunt001@outlook.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="font-display text-3xl sm:text-5xl">
          Get in <span className="text-gradient-gold">touch</span>
        </h1>
        <p className="mt-4 text-muted-foreground">Our team is here to help. Reach out and we&apos;ll respond within 24 hours.</p>

        <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 sm:space-y-5">
            {[
              { i: Mail, t: "Email", v: "thetreasurehunt001@outlook.com", link: "mailto:thetreasurehunt001@outlook.com" },
              { i: MessageCircle, t: "WhatsApp Line", v: "+44 7796 381745", link: "https://wa.link/pfmaxr" },
              { i: MapPin, t: "Office", v: "Lagos, Nigeria" },
            ].map(({ i: Icon, t, v, link }) => (
              <div key={v} className="flex items-start gap-4 rounded-2xl border border-gold/15 bg-card/60 p-4 sm:p-5 backdrop-blur">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
                  {link ? (
                    <a
                      href={link}
                      onClick={(e) => { e.preventDefault(); window.location.href = link; }}
                      className="mt-0.5 block break-words text-foreground hover:text-gold hover:underline"
                    >
                      {v}
                    </a>
                  ) : (
                    <div className="mt-0.5 break-words text-foreground">{v}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gold/15 bg-card/60 p-5 sm:p-8 backdrop-blur">
              <h2 className="text-center font-display text-2xl sm:text-3xl text-gradient-gold">JOIN OUR WHATSAPP COMMUNITY</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Connect with other members, get exclusive updates, and access instant support.
              </p>
              <a
                href="https://chat.whatsapp.com/DIpUebTutWICrzyasuyJv3?s=cl&p=a&mlu=4"
                onClick={(e) => { e.preventDefault(); window.location.href = "https://chat.whatsapp.com/DIpUebTutWICrzyasuyJv3?s=cl&p=a&mlu=4"; }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-110"
              >
                <Users className="h-4 w-4" /> Join WhatsApp Community
              </a>
            </div>

            <form onSubmit={submit} className="glass rounded-3xl p-5 sm:p-8 space-y-4">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-gradient-gold font-display text-3xl">Thank you!</div>
                  <p className="mt-2 text-muted-foreground">Choose how you&apos;d like to send your message.</p>
                </div>
              ) : (
                <>
                  <Inp label="Name" value={form.name} onChange={(v) => update("name", v)} />
                  <Inp label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
                  <Inp label="Subject" value={form.subject} onChange={(v) => update("subject", v)} />
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-110"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-gold/15 bg-card text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-gradient-gold">Send your message</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Choose how you would like to send your message to Treasure Hunt Ventures.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 grid gap-3">
            <button
              onClick={() => { setSent(true); sendViaWhatsApp(); }}
              className="flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition hover:bg-gold/20"
            >
              <MessageCircle className="h-4 w-4" /> Send via WhatsApp
            </button>
            <button
              onClick={() => { setSent(true); sendViaEmail(); }}
              className="flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition hover:bg-gold/20"
            >
              <Mail className="h-4 w-4" /> Send via Email
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
