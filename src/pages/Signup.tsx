import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/brand/Logo";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";

export function Field({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-navy p-12">
        <Link to="/"><Logo size={48} /></Link>
        <div>
          <h2 className="font-display text-4xl text-gradient-gold">Unearth treasures<br />beyond imagination.</h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">A premium investment & food-reward community. Transparent, structured, and built on tangible results.</p>
          <div className="mt-8 flex items-center gap-2 text-xs text-gold/80">
            <ShieldCheck className="h-4 w-4" /> Bank-grade encryption & secure transactions
          </div>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Treasure Hunt Ventures</div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center"><Link to="/"><Logo size={48} /></Link></div>
          <h1 className="font-display text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", referralCode: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"form" | "verify">("form");
  const [code, setCode] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    if (!form.fullName.trim()) return setErr("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setErr("Please enter a valid email address.");
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const { data, error } = await auth.signup({ ...form, email: form.email.trim(), fullName: form.fullName.trim() });
      if (error) throw error;
      if (data.session) navigate("/dashboard");
      else {
        setStage("verify");
        setInfo(`We sent a verification code to ${form.email.trim()}.`);
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Sign up failed.");
    } finally {
      setLoading(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    const clean = code.replace(/\D/g, "");
    if (clean.length < 6) return setErr("Enter the 6-digit code from your email.");
    setLoading(true);
    try {
      const { data, error } = await auth.verifyEmailCode(form.email.trim(), clean);
      if (error) throw error;
      if (data.session) navigate("/dashboard");
      else setErr("Code accepted, but no session started. Please log in.");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "That code is invalid or expired.");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setErr(null);
    setInfo(null);
    const { error } = await auth.resendCode(form.email.trim());
    if (error) setErr(error.message);
    else setInfo("A new code is on its way.");
  }

  async function googleSignup() {
    setErr(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/verify",
          queryParams: { prompt: "select_account" },
        },
      });
      if (error) setErr(error.message);
      // On success the browser redirects to Google; no further action here.
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Google sign-in failed. Please try again.");
    }
  }

  return (
    <AuthShell title={stage === "verify" ? "Verify your email" : "Create your account"} subtitle={stage === "verify" ? "Enter the code we emailed you to activate your account." : "Join the Treasure Hunt community in seconds."}>
      {stage === "verify" ? (
        <form onSubmit={verify} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Verification Code</label>
            <input
              value={code}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={8}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-center font-mono text-lg tracking-[0.4em] outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
            />
          </div>
          {info && <div className="rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-xs text-muted-foreground">{info}</div>}
          {err && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">{err}</div>}
          <Button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold disabled:opacity-50">
            {loading ? "Verifying..." : <>Verify & Continue <ArrowRight className="h-4 w-4" /></>}
          </Button>
          <div className="flex items-center justify-between text-xs">
            <button type="button" onClick={() => void resend()} className="text-gold hover:underline">Resend code</button>
            <button type="button" onClick={() => { setStage("form"); setErr(null); setInfo(null); }} className="text-muted-foreground hover:text-gold">Change details</button>
          </div>
          <p className="text-center text-xs text-muted-foreground">You can also confirm by clicking the link in the email.</p>
        </form>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
          <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+234 ..." />
          <Field label="Referral Code (optional)" value={form.referralCode} onChange={(v) => setForm({ ...form, referralCode: v })} placeholder="e.g. THV000123" />
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <div className="mt-1.5 relative">
              <input
                type={show ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required minLength={6}
                className="w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {err && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">{err}</div>}
          <Button disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-50">
            {loading ? "Creating..." : <>Create Account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
          </Button>
          <Button type="button" variant="outline" onClick={() => void googleSignup()} className="w-full rounded-full border-gold/40">Continue with Google</Button>
          <p className="text-center text-xs text-muted-foreground">
            Already have an account? <Link to="/login" className="text-gold hover:underline">Log in</Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
