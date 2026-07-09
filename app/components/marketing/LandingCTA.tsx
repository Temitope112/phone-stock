import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingCTA() {
  return (
    <section className="bg-[#050816] px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px] rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400 to-blue-600 p-10 text-center text-[#050816] md:p-16">
        <h2 className="text-4xl font-black leading-tight md:text-6xl">
          Ready To Manage Your Phone Business Better?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#050816]/75">
          Start adding your stock, recording sales, and tracking your business
          performance from one dashboard.
        </p>

        <Link
          href="/register"
          className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-[#050816] px-8 py-4 font-black text-white"
        >
          Create Free Account
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}