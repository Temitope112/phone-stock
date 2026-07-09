"use client";

import Link from "next/link";
import { useState } from "react";
import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });

  const isValid =
    form.name.trim() &&
    form.businessName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.message.trim();

  const sendWhatsApp = () => {
    if (!isValid) return;

    const text = `Hello PhoneStock,

I would like to make an enquiry.

Name: ${form.name}
Business Name: ${form.businessName}
Email: ${form.email}
Phone: ${form.phone}

Message:
${form.message}`;

    window.open(
      `https://wa.me/2349037060290?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="absolute left-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />

        <div className="relative mx-auto max-w-[1100px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Contact
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Let&apos;s Help You Manage Your Phone Business Better.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-white/60">
            Have questions, feedback, or want to use PhoneStock for your phone
            business? Send a message and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            {[
              {
                icon: Phone,
                title: "Phone",
                text: "+234 903 706 0290",
              },
              {
                icon: Mail,
                title: "Email",
                text: "support@phonestock.com",
              },
              {
                icon: MapPin,
                title: "Location",
                text: "Lagos, Nigeria",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
                    <Icon size={24} />
                  </div>

                  <h2 className="mt-6 text-2xl font-black">{item.title}</h2>
                  <p className="mt-2 text-white/55">{item.text}</p>
                </div>
              );
            })}

            <Link
              href="https://wa.me/2349037060290"
              target="_blank"
              className="flex items-center justify-between rounded-[2rem] border border-cyan-400/30 bg-cyan-400 p-7 text-[#050816] transition hover:bg-white"
            >
              <div>
                <MessageCircle size={28} />
                <h2 className="mt-5 text-2xl font-black">WhatsApp</h2>
                <p className="mt-2 text-[#050816]/70">Chat with us directly</p>
              </div>

              <ArrowRight size={24} />
            </Link>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-10"
          >
            <h2 className="text-3xl font-black">Send an Enquiry</h2>
            <p className="mt-3 leading-7 text-white/55">
              Tell us about your business and how PhoneStock can support your
              daily operations.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <input
                className="input"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="input"
                placeholder="Business Name"
                value={form.businessName}
                onChange={(e) =>
                  setForm({ ...form, businessName: e.target.value })
                }
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <input
                className="input"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="input"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <textarea
              rows={7}
              className="input mt-5 resize-none"
              placeholder="Tell us what you need..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button
              type="button"
              disabled={!isValid}
              onClick={sendWhatsApp}
              className={`mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 font-black transition ${
                isValid
                  ? "bg-cyan-400 text-[#050816] hover:bg-white"
                  : "cursor-not-allowed bg-white/10 text-white/40"
              }`}
            >
              Send via WhatsApp
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}