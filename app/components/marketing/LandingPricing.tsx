import Link from "next/link";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    text: "For testing PhoneStock with your phone inventory.",
    features: ["Inventory management", "Sales tracking", "Customer records"],
  },
  {
    name: "Pro",
    price: "Coming Soon",
    text: "For active vendors who need deeper business insights.",
    features: ["Advanced reports", "Profit tracking", "Export data"],
  },
  {
    name: "Business",
    price: "Contact Us",
    text: "For larger shops that need custom support.",
    features: ["Multiple users", "Custom setup", "Priority support"],
  },
];

export default function LandingPricing() {
  return (
    <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Pricing
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Start Free While We Build
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
            >
              <h3 className="text-2xl font-black">{plan.name}</h3>
              <p className="mt-5 text-4xl font-black text-cyan-300">
                {plan.price}
              </p>
              <p className="mt-4 leading-7 text-white/55">{plan.text}</p>

              <div className="mt-7 space-y-4">
                {plan.features.map((feature) => (
                  <p key={feature} className="flex items-center gap-3 text-white/65">
                    <CheckCircle size={18} className="text-cyan-300" />
                    {feature}
                  </p>
                ))}
              </div>

              <Link
                href="/register"
                className="mt-8 inline-flex w-full justify-center rounded-full bg-cyan-400 px-6 py-4 font-black text-[#050816]"
              >
                Get Started
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}