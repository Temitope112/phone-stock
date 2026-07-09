import Link from "next/link";
import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const plans = [
  {
    title: "Early Access",
    badge: "Available Now",
    price: "Free",
    description:
      "Perfect for vendors who want to start managing inventory before our public launch.",
    featured: false,
    features: [
      "Unlimited phone inventory",
      "Sales management",
      "Customer management",
      "Dashboard overview",
      "Inventory tracking",
      "Free updates",
    ],
  },

  {
    title: "Professional",
    badge: "Coming Soon",
    price: "Coming Soon",
    description:
      "Designed for growing phone businesses that need deeper reporting and analytics.",
    featured: true,
    features: [
      "Everything in Early Access",
      "Revenue analytics",
      "Profit reports",
      "Export reports",
      "Advanced dashboard",
      "Priority support",
    ],
  },

  {
    title: "Enterprise",
    badge: "Custom",
    price: "Let's Talk",
    description:
      "Tailored solutions for large retailers and multi-store businesses.",
    featured: false,
    features: [
      "Multiple branches",
      "Staff management",
      "Dedicated onboarding",
      "Priority support",
      "Custom integrations",
      "Enterprise security",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      {/* Hero */}

      <section className="relative overflow-hidden px-5 pt-36 pb-20 md:px-10 lg:px-16">

        <div className="absolute left-1/2 top-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
            <Sparkles size={16} />
            Simple & Transparent
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
            Pricing That Grows
            <br />
            With Your Business
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/60">
            Start using PhoneStock today for free.
            As we continue building new features,
            more powerful plans will become available.
          </p>
        </div>
      </section>

      {/* Cards */}

      <section className="px-5 pb-24 md:px-10 lg:px-16">

        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-3">

          {plans.map((plan) => (

            <article
              key={plan.title}
              className={`relative overflow-hidden rounded-[2rem] border p-10 transition duration-300 hover:-translate-y-2 ${
                plan.featured
                  ? "border-cyan-400 bg-gradient-to-b from-cyan-400/15 to-white/[0.04]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >

              {plan.featured && (
                <div className="absolute right-6 top-6 rounded-full bg-cyan-400 px-4 py-2 text-xs font-black text-[#050816]">
                  MOST POPULAR
                </div>
              )}

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                {plan.badge}
              </span>

              <h2 className="mt-8 text-3xl font-black">
                {plan.title}
              </h2>

              <h3 className="mt-5 text-5xl font-black text-cyan-300">
                {plan.price}
              </h3>

              <p className="mt-6 leading-8 text-white/55">
                {plan.description}
              </p>

              <div className="mt-10 space-y-5">

                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      size={20}
                      className="text-cyan-300"
                    />

                    <span className="text-white/70">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              <Link
                href="/register"
                className={`mt-12 inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-black transition ${
                  plan.featured
                    ? "bg-cyan-400 text-[#050816] hover:bg-white"
                    : "border border-white/10 hover:border-cyan-400 hover:bg-white/5"
                }`}
              >
                Get Started

                <ArrowRight size={18} />
              </Link>

            </article>

          ))}

        </div>

      </section>

      {/* FAQ */}

      <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-black md:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-14 space-y-6 text-left">

            {[
              {
                q: "Is PhoneStock free?",
                a: "Yes. During Early Access, you can use PhoneStock completely free.",
              },
              {
                q: "When will paid plans be available?",
                a: "Professional and Enterprise plans will launch after new reporting and analytics features are completed.",
              },
              {
                q: "Can I upgrade later?",
                a: "Absolutely. Your data will remain safe and you'll be able to upgrade anytime.",
              },
            ].map((faq) => (

              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
              >
                <h3 className="text-xl font-black">
                  {faq.q}
                </h3>

                <p className="mt-4 leading-8 text-white/55">
                  {faq.a}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      <LandingFooter />

    </main>
  );
}