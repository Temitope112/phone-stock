import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingHero from "../components/marketing/LandingHero";

const features = [
  "Product inventory management",
  "Sales recording",
  "Customer tracking",
  "Low stock alerts",
  "Revenue overview",
  "Vendor dashboard",
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="px-5 pb-24 pt-32 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Features
          </p>

          <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">
            Everything Phone Vendors Need.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
            PhoneStock helps vendors manage phones, customers, and sales from
            one simple dashboard.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1200px] gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <h2 className="text-xl font-black text-cyan-300">{feature}</h2>
              <p className="mt-3 leading-7 text-white/55">
                Built to make daily business operations easier, faster, and more
                organized.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}