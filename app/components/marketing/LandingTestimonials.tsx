const testimonials = [
  {
    name: "A phone vendor",
    text: "PhoneStock makes it easier to know what is available, what has been sold, and who bought it.",
  },
  {
    name: "Gadget seller",
    text: "Instead of checking notebooks and chats, everything can be managed from one dashboard.",
  },
  {
    name: "Mobile accessories vendor",
    text: "The sales and customer tracking feature is exactly what small vendors need.",
  },
];

export default function LandingTestimonials() {
  return (
    <section className="bg-[#050816] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1450px] text-center">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
          Testimonials
        </p>

        <h2 className="mt-5 text-4xl font-black md:text-6xl">
          Built For Real Vendor Problems
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-left">
              <p className="leading-8 text-white/60">“{item.text}”</p>
              <h3 className="mt-7 font-black text-cyan-300">{item.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}