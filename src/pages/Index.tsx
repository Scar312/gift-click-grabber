import { Gift, Tag, Percent, ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AFFILIATE_URL =
  "https://giftclick.org/aff_c?offer_id=3329&aff_id=16139";

const offers = [
  {
    title: "Gift Card Deals",
    description: "Browse exclusive gift card offers from top brands.",
    icon: Gift,
    highlight: "Popular",
  },
  {
    title: "Limited-Time Promos",
    description: "Seasonal promotions and time-sensitive deals.",
    icon: Tag,
    highlight: "Hot",
  },
  {
    title: "Cashback Rewards",
    description: "Earn cashback on qualifying purchases.",
    icon: Percent,
    highlight: "New",
  },
  {
    title: "Premium Offers",
    description: "Curated premium offers with verified savings.",
    icon: Star,
    highlight: "Exclusive",
  },
];

const Index = () => {
  const handleClick = () => {
    window.location.href = AFFILIATE_URL;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">DealFinder</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Verified Offers
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Discover Today's Best Deals
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Hand-picked offers updated daily. Click any deal below to learn more.
        </p>
      </section>

      {/* Offer Cards */}
      <section className="container mx-auto grid gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer) => (
          <button
            key={offer.title}
            onClick={handleClick}
            className="group flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <offer.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                {offer.highlight}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">{offer.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              View Offer <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-primary py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary-foreground">Ready to Save?</h2>
        <Button
          size="lg"
          onClick={handleClick}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Browse All Offers <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </section>

      {/* Footer / Disclosure */}
      <footer className="container mx-auto px-4 py-8 text-center text-xs text-muted-foreground">
        <p>
          <strong>Affiliate Disclosure:</strong> This page contains affiliate links.
          We may earn a commission at no extra cost to you when you click through and
          make a qualifying action. All offers are subject to the merchant's terms.
        </p>
      </footer>
    </div>
  );
};

export default Index;
