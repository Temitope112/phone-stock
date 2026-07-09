import { AlertTriangle, Boxes, ShoppingCart, Users } from "lucide-react";

const features = [
  {
    icon: Boxes,
    title: "Inventory Tracking",
    text: "Add phones, manage quantities, and know what is available at all times.",
  },
  {
    icon: ShoppingCart,
    title: "Sales Recording",
    text: "Record every sale and automatically reduce stock after each transaction.",
  },
  {
    icon: Users,
    title: "Customer Management",
    text: "Save customer details and keep track of who bought from your business.",
  },
  {
    icon: AlertTriangle,
    title: "Low Stock Alerts",
    text: "Quickly identify phones that are almost sold out before customers ask.",
  },
];

export default function LandingFeatures() {
  return (
    <section className="bg-[#071020] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Features
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Everything You Need To Manage A Phone Business
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
            PhoneStock helps vendors stay organized, sell faster, and understand
            their business performance without using notebooks or scattered
            records.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-2 hover:border-cyan-400/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
                  <Icon size={25} />
                </div>

                <h3 className="mt-7 text-2xl font-black">{feature.title}</h3>
                <p className="mt-4 leading-7 text-white/55">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}