"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  HelpCircle,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  UserRound,
  Users,
} from "lucide-react";

import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";

const categories = [
  {
    title: "Getting Started",
    description:
      "Create your account and understand the PhoneStock dashboard.",
    icon: BookOpen,
    articles: [
      {
        title: "Create a vendor account",
        description:
          "Register your phone business and access your private dashboard.",
        href: "/register",
      },
      {
        title: "Sign in to your account",
        description:
          "Access your existing PhoneStock vendor or administrator account.",
        href: "/login",
      },
      {
        title: "Understand your dashboard",
        description:
          "Learn what the products, customers, reports, and settings areas do.",
        href: "/faq",
      },
    ],
  },
  {
    title: "Inventory",
    description:
      "Add phones, upload images, track quantity, and manage availability.",
    icon: Boxes,
    articles: [
      {
        title: "Add a phone",
        description:
          "Enter phone information, pricing, condition, quantity, and an image.",
        href: "/dashboard/products",
      },
      {
        title: "Manage available stock",
        description:
          "Search products and monitor available and sold-out phones.",
        href: "/dashboard/products",
      },
      {
        title: "Fix marketplace visibility",
        description:
          "Check why a product may not be showing publicly.",
        href: "/faq",
      },
    ],
  },
  {
    title: "Sales",
    description:
      "Record phone sales and keep inventory quantities accurate.",
    icon: ShoppingCart,
    articles: [
      {
        title: "Record a sale",
        description:
          "Sell an available phone and automatically reduce its quantity.",
        href: "/dashboard/products",
      },
      {
        title: "View business reports",
        description:
          "Review your revenue, stock value, and sold-product totals.",
        href: "/dashboard/reports",
      },
      {
        title: "Understand payment records",
        description:
          "Learn how selling price, quantity, and total amount are stored.",
        href: "/faq",
      },
    ],
  },
  {
    title: "Customers",
    description:
      "Manage customer details associated with your business transactions.",
    icon: Users,
    articles: [
      {
        title: "View customer records",
        description:
          "See customers saved through your sales workflow.",
        href: "/dashboard/customers",
      },
      {
        title: "Protect customer information",
        description:
          "Understand how customer data should be handled responsibly.",
        href: "/privacy-policy",
      },
    ],
  },
  {
    title: "Marketplace",
    description:
      "Understand how customers discover phones and contact vendors.",
    icon: Store,
    articles: [
      {
        title: "Browse available phones",
        description:
          "See products currently listed by vendors without logging in.",
        href: "/phones",
      },
      {
        title: "Contact the correct vendor",
        description:
          "Learn how WhatsApp contact information is attached to each listing.",
        href: "/faq",
      },
      {
        title: "Marketplace safety",
        description:
          "Review important responsibilities for vendors and customers.",
        href: "/terms-and-conditions",
      },
    ],
  },
  {
    title: "Account & Settings",
    description:
      "Update your business information and secure your account.",
    icon: Settings,
    articles: [
      {
        title: "Update business details",
        description:
          "Edit your name, business name, and contact phone number.",
        href: "/dashboard/settings",
      },
      {
        title: "Account security",
        description:
          "Learn how vendor records and administrator access are protected.",
        href: "/faq",
      },
      {
        title: "Privacy requests",
        description:
          "Read how personal and business information is processed.",
        href: "/privacy-policy",
      },
    ],
  },
];

const quickLinks = [
  {
    title: "Vendor Dashboard",
    description: "Manage inventory, customers, and sales.",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Public Marketplace",
    description: "Browse phones currently available for sale.",
    href: "/phones",
    icon: Smartphone,
  },
  {
    title: "Frequently Asked Questions",
    description: "Read answers to common questions.",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    title: "Contact Support",
    description: "Get help with an account or platform issue.",
    href: "/support",
    icon: MessageCircle,
  },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories
      .map((category) => {
        const matchingArticles = category.articles.filter((article) => {
          return (
            article.title.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query) ||
            category.title.toLowerCase().includes(query)
          );
        });

        return {
          ...category,
          articles: matchingArticles,
        };
      })
      .filter((category) => category.articles.length > 0);
  }, [search]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

        <div className="relative mx-auto max-w-[1300px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to homepage
          </Link>

          <div className="mt-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
              <BookOpen size={30} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              PhoneStock Help Center
            </p>

            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Find the help you need.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/55">
              Browse guides for setting up your account, managing stock,
              recording sales, using the marketplace, and protecting your
              business information.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[850px] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-5">
              <Search size={20} className="shrink-0 text-white/35" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search guides and help articles..."
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={23} />
                  </div>

                  <h2 className="mt-5 text-lg font-black">{item.title}</h2>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                    Open
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {filteredCategories.length === 0 ? (
            <div className="mt-14 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-12 text-center">
              <HelpCircle className="mx-auto text-white/20" size={42} />

              <h2 className="mt-5 text-2xl font-black">
                No matching guide found
              </h2>

              <p className="mt-3 text-white/40">
                Try another search or send your question to support.
              </p>

              <Link
                href="/support"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-cyan-400 px-7 py-4 font-black text-[#050816]"
              >
                <MessageCircle size={18} />
                Contact Support
              </Link>
            </div>
          ) : (
            <div className="mt-16 grid gap-7 lg:grid-cols-2">
              {filteredCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <article
                    key={category.title}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
                        <Icon size={24} />
                      </div>

                      <div>
                        <h2 className="text-2xl font-black">
                          {category.title}
                        </h2>

                        <p className="mt-2 leading-7 text-white/45">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 space-y-3">
                      {category.articles.map((article) => (
                        <Link
                          key={article.title}
                          href={article.href}
                          className="group flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#071020] p-5 transition hover:border-cyan-400/30"
                        >
                          <div>
                            <h3 className="font-black text-white/80">
                              {article.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-white/40">
                              {article.description}
                            </p>
                          </div>

                          <ArrowRight
                            size={18}
                            className="shrink-0 text-white/25 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                          />
                        </Link>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <section className="mt-16 rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-white/[0.07] to-cyan-400/10 p-8 md:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-center gap-3 text-cyan-300">
                  <ShieldCheck size={24} />
                  <p className="text-sm font-bold uppercase tracking-[0.3em]">
                    Need personal assistance?
                  </p>
                </div>

                <h2 className="mt-5 text-3xl font-black md:text-4xl">
                  Tell us what went wrong.
                </h2>

                <p className="mt-4 max-w-2xl leading-8 text-white/50">
                  Include the affected page, the action you performed, and the
                  exact error message so the support team can assist you
                  properly.
                </p>
              </div>

              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-[#050816] transition hover:bg-white"
              >
                <MessageCircle size={19} />
                Get Support
              </Link>
            </div>
          </section>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}