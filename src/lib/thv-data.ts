export const RANKS = [
  {
    id: "master",
    name: "Master Hunter",
    price: 70000,
    tagline: "Start your treasure journey",
    without: ["1 bag of rice (50kg)", "1 ltr groundnut oil", "1 ctn indomie", "Half ctn small tomato paste"],
    with: ["1 bag of rice (50kg)", "2 ltrs groundnut oil", "2 ctns indomie", "1 ctn small tomato paste"],
  },
  {
    id: "chief",
    name: "Chief Hunter",
    price: 150000,
    tagline: "Step up your reward",
    without: ["2 bags rice (50kg)", "4 tubers yam", "Half paint crayfish", "2 ltrs groundnut oil", "1 ctn indomie", "1 ctn small tomato paste"],
    with: ["2 bags rice", "8 tubers yam", "1 paint crayfish", "3 ltrs groundnut oil", "2 ctns indomie", "1 ctn small tomato paste", "1 ltr red oil"],
  },
  {
    id: "odogwu",
    name: "Odogwu Hunter",
    price: 250000,
    tagline: "For the dedicated investor",
    without: ["3 bags rice (50kg)", "15 tubers yam", "1 bag semo", "1 paint crayfish", "3 ltrs groundnut oil", "1 ctn 210g tomato"],
    with: ["3 bags rice", "25 tubers yam", "2 bags semo", "1 paint crayfish", "5 ltrs groundnut oil", "2 ctns 210g tomato", "2 ltrs red oil"],
  },
  {
    id: "ijele",
    name: "Ijele Hunter",
    price: 350000,
    tagline: "The ultimate treasure tier",
    without: ["4 bags rice (50kg)", "25 tubers yam", "1 paint crayfish", "2 bags semo", "5 ltrs groundnut oil", "2 ctns mid tomato", "2 ctns indomie", "1 ctn spaghetti"],
    with: ["4 bags rice (50kg)", "30 tubers yam", "1 paint crayfish", "3 bags semo", "5 ltrs groundnut oil", "3 ctns mid tomato", "3 ctns indomie", "1 ctn spaghetti", "3 ltrs red oil"],
  },
];

export const SAVINGS_PLANS = [
  {
    id: "plan-a",
    name: "Plan A — Lump-Sum Savings",
    duration: "6 Months",
    rate: "30%",
    method: "One-time lump-sum payment",
    payout: "Capital + 30% interest at maturity",
    example: "Save ₦100,000 → Receive ₦130,000",
    bestFor: "Short-term savers with capital ready to deploy",
  },
  {
    id: "plan-b",
    name: "Plan B — Installment Savings",
    duration: "12 Months (5 saving + 7 wait)",
    rate: "45%",
    method: "Monthly installments for 5 months",
    payout: "Total contribution + 45% interest",
    example: "Save ₦20,000/mo for 5 months → Receive ₦145,000",
    bestFor: "Flexible savers building wealth gradually",
  },
];

export const FAQS = [
  { q: "What is Treasure Hunt Ventures all about?", a: "A wealth-building and food-reward investment platform helping individuals save smartly and enjoy tangible rewards through food packages at the end of each cycle." },
  { q: "How does the investment work?", a: "Choose a rank (Master, Chief, Odogwu, or Ijele Hunter), make installment payments for five months, and after 11 months receive food items worth more than your total investment." },
  { q: "Who can join?", a: "Anyone above 18 years old who wants to save consistently and enjoy valuable returns can join Treasure Hunt Ventures." },
  { q: "Is registration required?", a: "Yes. A ₦2,500 one-time registration fee qualifies you as an official Treasure Hunter." },
  { q: "What if I cannot refer anyone?", a: "You will receive the WITHOUT REFERRAL PACKAGE, which is slightly less than the full referral package." },
  { q: "Can I upgrade my rank?", a: "Yes — migrate to a higher rank by paying a ₦5,000 migration fee plus the difference in your new investment amount." },
  { q: "How long is each cycle?", a: "Each cycle runs for 11 months, after which participants receive food packages or cash refund (as applicable)." },
  { q: "Do you offer cash savings plans?", a: "Yes — Plan A (6 months, 30%) and Plan B (12 months, 45%) cash savings options are available." },
  { q: "Can I register more than one account?", a: "Yes, you can register multiple accounts using the same or different ranks for greater rewards." },
];
