import Link from "next/link";
import {
  ArrowLeft,
  Home,
  SearchX,
  Smartphone,
} from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-5 py-10 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="relative w-full max-w-3xl text-center">
        <Link
          href="/"
          className="mx-auto inline-flex items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
            <Smartphone size={27} />
          </div>

          <div className="text-left">
            <p className="text-xl font-black">PhoneStock</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Vendor Management
            </p>
          </div>
        </Link>

        <div className="mx-auto mt-12 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.05] text-cyan-300">
          <SearchX size={38} />
        </div>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.4em] text-cyan-300">
          Error 404
        </p>

        <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">
          This page could not be found.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">
          The page may have been moved, removed, or the address may be
          incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-7 py-4 font-black text-[#050816] transition hover:bg-white"
          >
            <Home size={19} />
            Return home
          </Link>

          <Link
            href="/phones"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 px-7 py-4 font-black text-white/65 transition hover:border-cyan-400/30 hover:text-cyan-300"
          >
            <ArrowLeft size={19} />
            Browse phones
          </Link>
        </div>
      </div>
    </main>
  );
}