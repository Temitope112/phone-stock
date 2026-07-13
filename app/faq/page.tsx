"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Search,
} from "lucide-react";

import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";

const categories = [
  "All",
  "Account",
  "Inventory",
  "Sales",
  "Marketplace",
  "Security",
];

const faqs = [
  {
    category: "Account",
    question: "Is PhoneStock free to use?",
    answer:
      "PhoneStock is currently available during early access. Vendors can create an account and use the core inventory, sales, customer, and reporting tools.",
  },
  {
    category: "Account",
    question: "How do I create a vendor account?",
    answer:
      "Open the registration page, enter your name, business name, phone number, email address, and password, then submit the form. After registration, you can access your vendor dashboard.",
  },
  {
    category: "Account",
    question: "Can I update my business details later?",
    answer:
      "Yes. Open the Settings page inside your vendor dashboard to update your name, business name, and phone number.",
  },
  {
    category: "Account",
    question: "What should I do if I forget my password?",
    answer:
      "Use the forgot-password option on the login page when password recovery is enabled. Until then, contact PhoneStock support for assistance.",
  },
  {
    category: "Inventory",
    question: "How do I add a phone to my inventory?",
    answer:
      "Open Products in your dashboard, upload a phone image, enter the phone details, selling price, cost price, condition, and quantity, then click Add Phone.",
  },
  {
    category: "Inventory",
    question: "Can I upload phone images?",
    answer:
      "Yes. Phone images are uploaded to secure storage and saved with the product listing so they can appear inside your dashboard and on the public marketplace.",
  },
  {
    category: "Inventory",
    question: "What happens when a phone sells out?",
    answer:
      "When the quantity reaches zero, the phone status changes to Sold Out and it is no longer shown as available on the public marketplace.",
  },
  {
    category: "Inventory",
    question: "Can I search and filter my products?",
    answer:
      "Yes. The Products page lets you search by phone name, brand, or condition and filter listings by brand.",
  },
  {
    category: "Sales",
    question: "How do I record a sale?",
    answer:
      "Open Products and click Sell beside the correct phone. Complete the sale details in the sales modal. The sale is recorded and the available quantity reduces automatically.",
  },
  {
    category: "Sales",
    question: "Does PhoneStock calculate revenue?",
    answer:
      "Yes. Recorded sales are used to calculate total revenue, items sold, recent transactions, and monthly reporting.",
  },
  {
    category: "Sales",
    question: "Can I see business reports?",
    answer:
      "Yes. The Reports page shows revenue, stock value, sold items, and low-stock information based on your real database records.",
  },
  {
    category: "Marketplace",
    question: "Can customers view phones without logging in?",
    answer:
      "Yes. Customers can browse available phones through the public marketplace without creating an account.",
  },
  {
    category: "Marketplace",
    question: "How does a customer contact the correct vendor?",
    answer:
      "Each marketplace listing stores the vendor business name and phone number. The Contact Vendor button opens WhatsApp using the phone number attached to that exact listing.",
  },
  {
    category: "Marketplace",
    question: "Does PhoneStock sell the phones directly?",
    answer:
      "No. Independent vendors post their own listings. Customers contact the vendor responsible for the selected phone and complete the transaction directly with that vendor.",
  },
  {
    category: "Marketplace",
    question: "Why is my phone not visible on the marketplace?",
    answer:
      "Check that the phone status is Available, the quantity is greater than zero, and the listing was saved successfully. Sold-out products are hidden from the public marketplace.",
  },
  {
    category: "Security",
    question: "Can another vendor see my records?",
    answer:
      "No. Vendor records are protected so each authenticated vendor can only access their own products, customers, sales, and profile information.",
  },
  {
    category: "Security",
    question: "Who can access the admin dashboard?",
    answer:
      "Only the approved PhoneStock administrator account can access the separate admin area and platform-wide information.",
  },
  {
    category: "Security",
    question: "How is my data stored?",
    answer:
      "PhoneStock uses Supabase for authentication, database storage, and phone image storage. Administrative access is handled through protected server-side routes.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        category === "All" || faq.category === category;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

        <div className="relative mx-auto max-w-[1100px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to homepage
          </Link>

          <div className="mt-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
              <HelpCircle size={30} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Help Centre
            </p>

            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Frequently Asked Questions
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/55">
              Find answers about vendor accounts, inventory, sales, the public
              marketplace, security, and other PhoneStock features.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[850px] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-4">
              <Search size={18} className="shrink-0 text-white/35" />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setActiveIndex(null);
                }}
                placeholder="Search for an answer..."
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setActiveIndex(null);
                }}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                  category === item
                    ? "border-cyan-400 bg-cyan-400 text-[#050816]"
                    : "border-white/10 bg-white/[0.04] text-white/55 hover:border-cyan-400/30 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[900px] space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">
                <HelpCircle className="mx-auto text-white/20" size={38} />

                <h2 className="mt-5 text-2xl font-black">
                  No matching answer found
                </h2>

                <p className="mt-3 leading-7 text-white/40">
                  Try another search term or contact PhoneStock support.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = activeIndex === index;

                return (
                  <article
                    key={`${faq.category}-${faq.question}`}
                    className={`overflow-hidden rounded-2xl border transition ${
                      isOpen
                        ? "border-cyan-400/30 bg-cyan-400/[0.06]"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex(isOpen ? null : index)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 p-6 text-left md:p-7"
                    >
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                          {faq.category}
                        </span>

                        <h2 className="mt-3 text-lg font-black md:text-xl">
                          {faq.question}
                        </h2>
                      </div>

                      <ChevronDown
                        size={22}
                        className={`shrink-0 text-white/40 transition duration-300 ${
                          isOpen ? "rotate-180 text-cyan-300" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-white/10 px-6 pb-7 pt-5 leading-8 text-white/55 md:px-7">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="mx-auto mt-14 flex max-w-[900px] flex-col items-center justify-between gap-6 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-white/[0.06] to-cyan-400/10 p-8 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Still need help?
              </p>

              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                Contact the PhoneStock support team.
              </h2>

              <p className="mt-3 text-white/45">
                Send details about your account, listing, or dashboard issue.
              </p>
            </div>

            <Link
              href="/support"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-cyan-400 px-7 py-4 font-black text-[#050816] transition hover:bg-white"
            >
              <MessageCircle size={19} />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}