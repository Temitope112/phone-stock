const steps = [
  {
    step: "01",
    title: "Create Your Account",
    text: "Register your phone business and access your private dashboard.",
  },
  {
    step: "02",
    title: "Add Your Phones",
    text: "Enter phone name, brand, price, quantity, condition, storage, and other details.",
  },
  {
    step: "03",
    title: "Record Sales",
    text: "When a customer buys, record the sale and stock reduces automatically.",
  },
  {
    step: "04",
    title: "Track Performance",
    text: "View sales history, revenue, customers, and low stock from your dashboard.",
  },
];

export default function LandingHowItWorks() {
  return (
    <section className="bg-[#050816] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            How It Works
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Simple Enough For Daily Use
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((item) => (
            <article
              key={item.step}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
            >
              <p className="text-4xl font-black text-cyan-300">{item.step}</p>
              <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/55">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}