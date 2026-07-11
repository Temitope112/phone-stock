import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle,
  Package,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";

const mainFeatures = [
  {
    icon: Package,
    title: "Inventory Management",
    text: "Add phones, update quantity, track condition, storage, RAM, color, and selling price.",
  },
  {
    icon: ShoppingCart,
    title: "Sales Recording",
    text: "Record sales properly and automatically reduce stock after every transaction.",
  },
  {
    icon: Users,
    title: "Customer Tracking",
    text: "Save customer name, phone number, and purchase history in one place.",
  },
  {
    icon: BellRing,
    title: "Low Stock Alerts",
    text: "Quickly identify phones that are almost sold out before customers ask.",
  },
  {
    icon: BarChart3,
    title: "Revenue Overview",
    text: "See total sales, revenue, and business activity from your dashboard.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    text: "Find phones faster by name, brand, condition, or availability.",
  },
];

const workflow = [
  "Add phone stock",
  "Record customer sale",
  "Stock reduces automatically",
  "Track sales and revenue",
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="absolute left-1/2 top-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Features
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
              Everything Phone Vendors Need To Stay Organized.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-white/60">
              PhoneStock gives vendors a clean way to manage phones, customers,
              sales, stock levels, and business performance without scattered
              notebooks or manual calculations.
            </p>

            <Link
              href="/register"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-[#050816] transition hover:bg-white"
            >
              Start Free
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_140px_rgba(34,211,238,0.12)]">
            <div className="rounded-[1.5rem] bg-[#071020] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">Live Preview</p>
                  <h2 className="mt-1 text-2xl font-black">
                    Vendor Dashboard
                  </h2>
                </div>

                <span className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-black text-[#050816]">
                  Active
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Smartphone, label: "Phones", value: "124" },
                  { icon: ReceiptText, label: "Sales", value: "38" },
                  { icon: Users, label: "Customers", value: "72" },
                  { icon: TrendingUp, label: "Revenue", value: "₦1.8M" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <Icon className="text-cyan-300" size={22} />
                      <h3 className="mt-5 text-3xl font-black">
                        {item.value}
                      </h3>
                      <p className="mt-1 text-sm text-white/45">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#050816] p-5">
                <p className="font-bold">Stock Movement</p>

                <div className="mt-6 flex h-32 items-end gap-3">
                  {[50, 80, 45, 90, 70, 100, 65].map((height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}%` }}
                      className="flex-1 rounded-t-full bg-gradient-to-t from-blue-600 to-cyan-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1450px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Core Tools
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Built Around Real Daily Vendor Workflows.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mainFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-2 hover:border-cyan-400/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816] transition group-hover:scale-110">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-7 text-2xl font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/55">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Workflow
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              From stock entry to sales tracking in minutes.
            </h2>

            <p className="mt-6 leading-8 text-white/60">
              The app is designed to match how phone vendors actually work:
              add available phones, sell to customers, reduce stock
              automatically, and monitor business performance.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            {workflow.map((item, index) => (
              <div
                key={item}
                className="flex gap-5 border-b border-white/10 py-6 last:border-b-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400 font-black text-[#050816]">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-xl font-black">{item}</h3>
                  <p className="mt-2 leading-7 text-white/55">
                    PhoneStock keeps this step clear, fast, and easy to manage.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px] rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-white/[0.08] to-cyan-400/10 p-10 text-center md:p-16">
          <ShieldCheck className="mx-auto text-cyan-300" size={48} />

          <h2 className="mt-8 text-4xl font-black leading-tight md:text-6xl">
            Secure, simple, and built for growth.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
            Each vendor only sees their own inventory, sales, and customers.
            As your business grows, PhoneStock can grow with you.
          </p>

          <Link
            href="/register"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-[#050816] transition hover:bg-white"
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