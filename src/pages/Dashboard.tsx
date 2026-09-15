import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { useAuth } from "@/lib/auth";
import { Wallet, TrendingUp, Award, Camera, Mail, Phone, Cake, BadgeCheck, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const initials = user.fullName.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "TH";
  const completion = [user.fullName, user.phone, user.dateOfBirth, user.avatarPath].filter(Boolean).length;
  const completionPct = Math.round((completion / 4) * 100);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="h-24 bg-gradient-navy sm:h-28" />
          <div className="px-5 pb-7 sm:px-8">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                <div className="relative">
                  <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full border-4 border-gold/60 bg-card shadow-gold sm:h-32 sm:w-32">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={`${user.fullName} profile picture`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-display text-3xl text-gradient-gold">{initials}</span>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    aria-label="Change profile picture"
                    className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-navy-deep shadow-gold"
                  >
                    <Camera className="h-4 w-4" />
                  </Link>
                </div>
                <div className="text-center sm:pb-2 sm:text-left">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Welcome back</div>
                  <h1 className="mt-1 font-display text-2xl sm:text-4xl">{user.fullName}</h1>
                  <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold">#{user.accountId}</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                      <BadgeCheck className="h-3.5 w-3.5 text-gold" /> {user.planName ? user.planStatus ?? "Active" : "No plan yet"}
                    </span>
                  </div>
                </div>
              </div>
              <Link to="/profile" className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-gold hover:bg-gold/10">
                Edit Profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Mail className="h-4 w-4 text-gold" /> Email</div>
                <div className="mt-1 truncate text-sm">{user.email}</div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Phone className="h-4 w-4 text-gold" /> Phone</div>
                <div className="mt-1 text-sm">{user.phone || "Not added"}</div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Cake className="h-4 w-4 text-gold" /> Date of Birth</div>
                <div className="mt-1 text-sm">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not added"}</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/5 p-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>Profile completion</span><span className="text-gold">{completionPct}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-gradient-gold transition-all" style={{ width: `${completionPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { i: Wallet, t: "Wallet Balance", v: "₦0" },
            { i: TrendingUp, t: "Active Plan", v: user.planName ?? "Not selected" },
            { i: Award, t: "Member Since", v: new Date(user.createdAt).toLocaleDateString() },
          ].map(({ i: Icon, t, v }) => (
            <div key={t} className="glass rounded-2xl p-6">
              <Icon className="h-6 w-6 text-gold" />
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
              <div className="mt-1 font-display text-2xl text-gradient-gold">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-2xl">{user.planName ? "Your Plan" : "Get Started"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {user.planName
              ? `${user.planName} · ${user.planType === "installment" ? "Installment" : "Outright"} · ${user.planStatus ?? "Active"}`
              : "Choose your rank or savings plan to begin your treasure hunt."}
          </p>
          <Link to="/plans" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">
            {user.planName ? "Change or Add Plan" : "Browse Plans"}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
