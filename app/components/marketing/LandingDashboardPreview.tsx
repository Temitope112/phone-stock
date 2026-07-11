import { BarChart3, Boxes, ShoppingCart, Users } from "lucide-react";

export default function LandingDashboardPreview() {
  return (
    <section className="bg-[#050816] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Live Dashboard Preview
          </p>

          <h2 className="mt-5 text-4xl font-black md:text-6xl">
            See Your Business At A Glance
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-[1100px] rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_140px_rgba(34,211,238,0.12)]">
          <div className="rounded-[1.5rem] bg-[#071020] p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { icon: Boxes, label: "Products", value: "128" },
                { icon: ShoppingCart, label: "Sales", value: "42" },
                { icon: Users, label: "Customers", value: "86" },
                { icon: BarChart3, label: "Revenue", value: "₦2.4M" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <Icon className="text-cyan-300" />
                    <h3 className="mt-5 text-3xl font-black">{item.value}</h3>
                    <p className="mt-1 text-sm text-white/45">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#050816] p-6">
              <p className="font-bold">Monthly Stock Movement</p>
              <div className="mt-6 flex h-44 items-end gap-3">
                {[45, 70, 55, 95, 65, 100, 78, 88].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="flex-1 animate-pulse rounded-t-full bg-gradient-to-t from-blue-600 to-cyan-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}