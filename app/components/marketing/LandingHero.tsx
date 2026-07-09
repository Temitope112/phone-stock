import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Package,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

export default function LandingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] px-5 pt-32 text-white md:px-10 lg:px-16">
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />
      <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-cyan-300/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-128px)] max-w-[1500px] items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Built for phone vendors and small retailers
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-[84px]">
            Run Your Phone Business With{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Confidence.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            PhoneStock helps phone vendors manage inventory, record sales,
            track customers, monitor low stock, and understand business
            performance from one simple dashboard.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-[#050816] transition hover:-translate-y-1 hover:bg-white"
            >
              Start Managing Stock
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 px-8 py-4 font-bold text-white transition hover:border-cyan-300/40 hover:bg-white/5"
            >
              Login to Dashboard
            </Link>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              "Track phone stock",
              "Record daily sales",
              "Monitor low inventory",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-cyan-300" />
                <span className="text-sm font-semibold text-white/65">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[120px]" />

          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_40px_140px_rgba(34,211,238,0.15)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#071020] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">Dashboard Overview</p>
                  <h3 className="mt-1 text-2xl font-black">Today’s Summary</h3>
                </div>

                <div className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-black text-[#050816]">
                  Live
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Package,
                    label: "Products",
                    value: "128",
                  },
                  {
                    icon: ShoppingCart,
                    label: "Sales",
                    value: "₦840k",
                  },
                  {
                    icon: Users,
                    label: "Customers",
                    value: "64",
                  },
                  {
                    icon: TrendingUp,
                    label: "Profit",
                    value: "₦210k",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="text-cyan-300" size={22} />
                        <span className="text-xs text-white/35">+12%</span>
                      </div>

                      <h4 className="mt-5 text-3xl font-black">
                        {item.value}
                      </h4>
                      <p className="mt-1 text-sm text-white/45">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#050816] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Inventory Performance</p>
                  <BarChart3 className="text-cyan-300" />
                </div>

                <div className="mt-6 flex h-36 items-end gap-3">
                  {[45, 70, 50, 90, 65, 100, 75, 85].map((height, index) => (
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

          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-[#071020]/90 p-5 shadow-2xl backdrop-blur-xl md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-[#050816]">
                <Smartphone size={22} />
              </div>
              <div>
                <p className="text-sm text-white/45">Low Stock Alert</p>
                <p className="font-black">iPhone 13 remaining: 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}