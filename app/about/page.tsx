import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Package,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
} from "lucide-react";
import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";

const values = [
  {
    icon: Package,
    title: "Organized Inventory",
    text: "Keep every phone record clear, searchable, and easy to manage.",
  },
  {
    icon: ShoppingCart,
    title: "Smarter Sales",
    text: "Record sales, reduce stock automatically, and track revenue easily.",
  },
  {
    icon: Users,
    title: "Customer Records",
    text: "Save buyer details so vendors can build better customer relationships.",
  },
  {
    icon: BarChart3,
    title: "Business Insights",
    text: "Understand stock movement, sales history, and business performance.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="absolute left-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            About PhoneStock
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Helping Phone Vendors Run Their Business With Confidence.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/60">
            PhoneStock is a modern inventory and sales management platform built
            for phone vendors who want to replace manual records with a clean,
            reliable, and easy-to-use dashboard.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-[#050816] transition hover:bg-white"
            >
              Start Free
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 font-bold text-white/70 transition hover:border-cyan-300 hover:text-cyan-300"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              The Problem
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Many vendors still manage sales with notebooks and memory.
            </h2>

            <p className="mt-6 leading-8 text-white/60">
              For phone vendors, stock changes quickly. A phone can be added in
              the morning and sold before evening. Without a clear system, it is
              easy to lose track of available phones, customer records, profit,
              and daily sales.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            {[
              "Manual stock records are easy to lose",
              "Sales can be forgotten or miscalculated",
              "Low-stock items are hard to monitor",
              "Customer details are scattered across chats",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-4 border-b border-white/10 py-5 last:border-b-0"
              >
                <CheckCircle className="shrink-0 text-cyan-300" />
                <p className="font-semibold text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1450px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Our Solution
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              A simple dashboard built around the way vendors actually sell.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-2 hover:border-cyan-400/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-7 text-2xl font-black">{item.title}</h3>
                  <p className="mt-4 leading-7 text-white/55">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px] rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-white/[0.08] to-cyan-400/10 p-10 text-center md:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
            <Smartphone size={30} />
          </div>

          <h2 className="mt-8 text-4xl font-black leading-tight md:text-6xl">
            Built for small businesses, starting with phone vendors.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
            PhoneStock starts with phone sellers, but the bigger vision is to
            help small retailers manage inventory, customers, and sales without
            complicated software.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["Phone Shops", "Accessories Vendors", "Small Retailers"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1450px] gap-6 md:grid-cols-3">
          {[
            { value: "Real-time", label: "Inventory visibility" },
            { value: "Secure", label: "Vendor-only data access" },
            { value: "Simple", label: "Dashboard for daily use" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center"
            >
              <h3 className="text-4xl font-black text-cyan-300">
                {stat.value}
              </h3>
              <p className="mt-3 text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#071020] px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Get Started
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Ready to organize your phone business?
            </h2>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-[#050816] transition hover:bg-white"
          >
            Create Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}