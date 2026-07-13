import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";

type Section = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: Section[];
};

export default function LegalPageLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

        <div className="relative mx-auto max-w-[1100px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to homepage
          </Link>

          <div className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
              <ShieldCheck size={27} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              {eyebrow}
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
              {description}
            </p>

            <p className="mt-6 text-sm text-white/35">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-9"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-black text-cyan-300">
                    {index + 1}
                  </span>

                  <h2 className="pt-1 text-2xl font-black">
                    {section.title}
                  </h2>
                </div>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 leading-8 text-white/55"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.items && (
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 leading-7 text-white/55"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}