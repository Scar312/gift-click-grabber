import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { useAuth, auth } from "@/lib/auth";
import { Wallet, TrendingUp, Award, LogOut } from "lucide-react";

export default function Dashboard() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      const t = setTimeout(() => {
        if (!auth.current()) navigate("/login");
      }, 100);
      return () => clearTimeout(t);
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Welcome back</div>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">{user.fullName}</h1>
            <div className="mt-1 font-mono text-xs text-gold/80">Account #{user.accountId}</div>
          </div>
          <button onClick={() => { auth.logout(); navigate("/"); }} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-card">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { i: Wallet, t: "Wallet Balance", v: "₦0" },
            { i: TrendingUp, t: "Active Plan", v: user.rank || "Not selected" },
            { i: Award, t: "Member Since", v: new Date(user.createdAt).toLocaleDateString() },
          ].map(({ i: Icon, t, v }) => (
            <div key={t} className="glass rounded-2xl p-6">
              <Icon className="h-6 w-6 text-gold" />
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
              <div className="mt-1 font-display text-2xl text-gradient-gold">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-3xl p-8">
          <h2 className="font-display text-2xl">Get Started</h2>
          <p className="mt-2 text-sm text-muted-foreground">Choose your rank or savings plan to begin your treasure hunt.</p>
          <Link to="/plans" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">
            Browse Plans
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
