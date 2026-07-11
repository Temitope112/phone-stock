const stats = [
  { value: "100%", label: "Real-time stock tracking" },
  { value: "3x", label: "Faster sales recording" },
  { value: "24/7", label: "Dashboard access" },
];

export default function LandingStats() {
  return (
    <section className="bg-[#071020] px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center"
          >
            <h3 className="text-5xl font-black text-cyan-300">{stat.value}</h3>
            <p className="mt-3 text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}