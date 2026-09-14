import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus, LayoutDashboard, UserRound } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth, auth } from "@/lib/auth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/plans", label: "Plans" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-gold/15 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo size={42} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-foreground/80"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.03]"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold/10"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-navy-deep shadow-gold transition-transform hover:scale-[1.03]"
              >
                <UserPlus className="h-4 w-4" /> Get Started
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-gold/20 bg-card/95 p-5 backdrop-blur-xl">
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-gold/10 hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="my-3 gold-divider" />
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="px-3 py-1.5 text-xs text-muted-foreground">
                Signed in as <span className="text-gold">{user.fullName}</span>
                <div className="font-mono text-[10px] text-muted-foreground/70">#{user.accountId}</div>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gradient-gold px-4 py-2.5 text-center text-sm font-semibold text-navy-deep"
              >
                Open Dashboard
              </Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-2.5 text-sm text-gold"><UserRound className="h-4 w-4" /> Profile</Link>
              <button
                onClick={() => { void auth.logout(); setOpen(false); }}
                className="rounded-full border border-border px-4 py-2.5 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-full border border-gold/40 px-4 py-2.5 text-center text-sm font-medium text-gold">
                Login
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="rounded-full bg-gradient-gold px-4 py-2.5 text-center text-sm font-semibold text-navy-deep">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}