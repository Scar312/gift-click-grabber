import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, ShieldCheck, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-gradient-navy">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size={48} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Let&apos;s unearth treasures beyond your imagination. A transparent, reward-based savings and investment community.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 text-xs text-gold">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted & Secure
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link to="/plans" className="hover:text-gold">Investment Plans</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gold">How It Works</Link></li>
              <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-gold">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-gold" />
                <a href="mailto:thetreasurehunt001@outlook.com" className="hover:text-gold hover:underline">
                  thetreasurehunt001@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 text-gold" />
                <a
                  href="https://wa.link/pfmaxr"
                  onClick={(e) => { e.preventDefault(); window.location.href = "https://wa.link/pfmaxr"; }}
                  className="hover:text-gold hover:underline"
                >
                  WhatsApp Line: +44 7796 381745
                </a>
              </li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 gold-divider" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Treasure Hunt Ventures. All rights reserved.</p>
          <p className="italic text-gold/80">&ldquo;Let&apos;s unearth treasures beyond your imagination.&rdquo;</p>
        </div>
      </div>
    </footer>
  );
}
