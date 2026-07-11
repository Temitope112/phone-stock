const vendors = ["PhoneHub", "MobileMart", "GadgetPlug", "TechPoint", "iStore NG"];

export default function LandingTrusted() {
  return (
    <section className="border-y border-white/10 bg-[#071020] px-5 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1450px] text-center">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
          Trusted by phone vendors
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 text-xl font-black text-white/35 sm:grid-cols-3 lg:grid-cols-5">
          {vendors.map((vendor) => (
            <div key={vendor}>{vendor}</div>
          ))}
        </div>
      </div>
    </section>
  );
}