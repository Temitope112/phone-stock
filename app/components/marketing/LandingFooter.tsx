import Link from "next/link";
import { Smartphone, ExternalLink } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-[1450px] px-5 py-20 md:px-10 lg:px-16">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}

          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-[#050816] shadow-lg">
                <Smartphone size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">
                  PhoneStock
                </h2>

                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/60">
                  Vendor Management
                </p>
              </div>
            </Link>

            <p className="mt-8 max-w-md leading-8 text-white/55">
              PhoneStock helps phone vendors manage inventory, record
              sales, track customers, and grow their businesses from one
              modern dashboard.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="https://github.com/yourusername"
                target="_blank"
                className="rounded-xl border border-white/10 p-3 text-white/60 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300"
              >
                <FaGithub size={20} />
              </Link>

              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                className="rounded-xl border border-white/10 p-3 text-white/60 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300"
              >
                <FaLinkedin size={20} />
              </Link>

              <Link
                href="https://x.com/yourusername"
                target="_blank"
                className="rounded-xl border border-white/10 p-3 text-white/60 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300"
              >
                <FaXTwitter size={20} />
              </Link>
            </div>
          </div>

          {/* Product */}

          <div>
            <h3 className="text-lg font-bold text-white">
              Product
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/features"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Features
              </Link>

              <Link
                href="/pricing"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Pricing
              </Link>

              <Link
                href="/login"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-lg font-bold text-white">
              Company
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/about"
                className="text-white/55 transition hover:text-cyan-300"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Contact
              </Link>

              <Link
                href="/faq"
                className="text-white/55 transition hover:text-cyan-300"
              >
                FAQ
              </Link>

              <Link
                href="/register"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Legal */}

          <div>
            <h3 className="text-lg font-bold text-white">
              Legal
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/privacy-policy"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/cookies"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Cookie Policy
              </Link>

              <Link
                href="/contact"
                className="text-white/55 transition hover:text-cyan-300"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-center text-sm text-white/40">
            © {new Date().getFullYear()} PhoneStock. All rights reserved.
          </p>

          <Link
            href="https://temitope112.vercel.app/"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-cyan-300"
          >
            Crafted by Temitope Eniola
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}