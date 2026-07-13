"use client";

import Link from "next/link";
import { Menu, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import VersionBadge from "./VersionBadge";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Phones", href: "/phones" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function LandingNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/85 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10 lg:px-16">
        <Link
          href="/"
          aria-label="PhoneStock homepage"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-[#050816] shadow-[0_0_35px_rgba(34,211,238,0.35)]">
            <Smartphone size={24} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">
                PhoneStock
              </h1>

              <VersionBadge compact />
            </div>

            <p className="mt-0.5 text-[10px] uppercase tracking-[0.35em] text-cyan-200/50">
              Vendor OS
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.title}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition ${
                  active
                    ? "text-cyan-300"
                    : "text-white/60 hover:text-cyan-300"
                }`}
              >
                {link.title}

                {active && (
                  <span className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-5 rounded-full bg-cyan-300" />
                )}
              </Link>
            );
          })}
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
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="rounded-xl border border-white/10 p-2.5 text-white transition hover:border-cyan-400/30 hover:text-cyan-300 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-20 z-[-1] h-[calc(100vh-5rem)] w-full bg-black/60 backdrop-blur-sm lg:hidden"
          />

          <div
            id="mobile-navigation"
            className="border-t border-white/10 bg-[#050816] shadow-2xl lg:hidden"
          >
            <div className="mx-auto flex max-w-[1500px] flex-col px-5 py-6 md:px-10">
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-semibold transition ${
                        active
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {link.title}

                      {active && (
                        <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/login"
                  className="rounded-full border border-white/10 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/30"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-cyan-400 py-3.5 text-center font-black text-[#050816] transition hover:bg-white"
                >
                  Get Started
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <VersionBadge />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}