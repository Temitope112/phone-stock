"use client";

import Link from "next/link";
import { Menu, Smartphone, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
   { title: "Phones", href: "/phones" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-[#050816] shadow-[0_0_35px_rgba(34,211,238,0.35)]">
            <Smartphone size={24} />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-white">
              PhoneStock
            </h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/50">
              Vendor OS
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-semibold text-white/60 transition hover:text-cyan-300"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-white/75 transition hover:border-cyan-300/40 hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-[#050816] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 p-2 text-white lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#050816] lg:hidden">
          <div className="flex flex-col gap-5 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-white/70"
              >
                {link.title}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 py-3 text-center font-bold text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-full bg-cyan-400 py-3 text-center font-black text-[#050816]"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}