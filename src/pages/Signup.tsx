import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/brand/Logo";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

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
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    setLoading(true);
    try {
      auth.signup(form);
      navigate("/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Sign up failed.");
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Join the Treasure Hunt community in seconds.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
        <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
        <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+234 ..." />
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
        <button disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-50">
          {loading ? "Creating..." : <>Create Account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Already have an account? <Link to="/login" className="text-gold hover:underline">Log in</Link>
        </p>
      </form>
    </AuthShell>
  );
}