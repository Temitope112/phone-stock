"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is PhoneStock free?",
    a: "Yes. PhoneStock is currently free during early access.",
  },
  {
    q: "Can I add real phone stock?",
    a: "Yes. You can add phones, prices, quantities, condition, storage, RAM, and more.",
  },
  {
    q: "Does stock reduce after a sale?",
    a: "Yes. Once you record a sale, the phone quantity reduces automatically.",
  },
  {
    q: "Can another vendor see my data?",
    a: "No. Each vendor only sees their own phones, customers, and sales.",
  },
];

export default function LandingFAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[900px]">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            FAQ
          </p>
          <h2 className="mt-5 text-4xl font-black md:text-6xl">
            Questions Vendors Ask
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.04]">
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="flex w-full items-center justify-between gap-5 p-6 text-left font-black"
              >
                {faq.q}
                <ChevronDown
                  className={`shrink-0 transition ${active === index ? "rotate-180 text-cyan-300" : ""}`}
                />
              </button>

              {active === index && (
                <p className="border-t border-white/10 px-6 pb-6 pt-4 leading-8 text-white/55">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}