import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { AuthShell, Field } from "./Signup";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await auth.login(email, password);
      if (error) throw error;
      navigate("/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed.");
      setLoading(false);
    }
  }

  async function googleLogin() {
    setErr(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/verify", // no /~oauth/initiate — direct Cloud Google auth
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
    <AuthShell title="Welcome back" subtitle="Sign in to continue your treasure hunt.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email Address" type="email" value={email} onChange={setEmail} required />
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
          <div className="mt-1.5 relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {err && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">{err}</div>}
        <Button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-50">
          {loading ? "Signing in..." : <>Sign In <ArrowRight className="h-4 w-4" /></>}
        </Button>
        <Button type="button" variant="outline" onClick={() => void googleLogin()} className="w-full rounded-full border-gold/40">Continue with Google</Button>
        <p className="text-center text-xs text-muted-foreground">
          New here? <Link to="/signup" className="text-gold hover:underline">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}