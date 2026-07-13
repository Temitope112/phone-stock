"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";

import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";

const SUPPORT_PHONE = "2349037060290";
const SUPPORT_EMAIL = "temitopeeniola295@gmail.com";

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.subject.trim() &&
    form.message.trim();

  const sendWhatsApp = () => {
    if (!isValid || sending) return;

    setSending(true);

    const message = encodeURIComponent(
      `Hello PhoneStock Support,

Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}

Message:
${form.message}`
    );

    window.open(
      `https://wa.me/${SUPPORT_PHONE}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSending(false);
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

        <div className="relative mx-auto max-w-[1250px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to homepage
          </Link>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Support
            </p>

            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              How can we help?
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/55">
              Get help with your account, marketplace listings, inventory,
              sales records or vendor dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <Mail className="text-cyan-300" size={27} />
              <h2 className="mt-6 text-xl font-black">Email support</h2>
              <p className="mt-3 break-all text-white/45">
                {SUPPORT_EMAIL}
              </p>
            </a>

            <a
              href={`https://wa.me/${SUPPORT_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2rem] border border-cyan-400/30 bg-cyan-400 p-7 text-[#050816] transition hover:-translate-y-1 hover:bg-white"
            >
              <MessageCircle size={27} />
              <h2 className="mt-6 text-xl font-black">WhatsApp support</h2>
              <p className="mt-3 text-[#050816]/65">
                Chat directly with the support team.
              </p>
            </a>

            <Link
              href="/help-center"
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <BookOpen className="text-cyan-300" size={27} />
              <h2 className="mt-6 text-xl font-black">Help centre</h2>
              <p className="mt-3 text-white/45">
                Read answers to frequently asked questions.
              </p>
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="space-y-5">
              {[
                {
                  icon: HelpCircle,
                  title: "Account assistance",
                  text: "Login, registration and profile support.",
                },
                {
                  icon: ShieldCheck,
                  title: "Privacy requests",
                  text: "Ask about your data or request account assistance.",
                },
                {
                  icon: MessageCircle,
                  title: "Marketplace help",
                  text: "Report an incorrect listing or vendor issue.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Icon size={23} />
                    </div>

                    <h2 className="mt-5 text-xl font-black">{item.title}</h2>
                    <p className="mt-3 leading-7 text-white/45">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-10"
            >
              <h2 className="text-3xl font-black">Send a support request</h2>

              <p className="mt-3 leading-7 text-white/45">
                Provide enough detail for the support team to understand the
                issue.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="input"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  className="input"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(event) =>
                  setForm({ ...form, subject: event.target.value })
                }
                className="input mt-5"
              />

              <textarea
                rows={7}
                placeholder="Describe the issue..."
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                className="input mt-5 resize-none"
              />

              <button
                type="button"
                onClick={sendWhatsApp}
                disabled={!isValid || sending}
                className={`mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-black transition ${
                  isValid && !sending
                    ? "bg-cyan-400 text-[#050816] hover:bg-white"
                    : "cursor-not-allowed bg-white/10 text-white/35"
                }`}
              >
                {sending ? (
                  <Loader2 className="animate-spin" size={19} />
                ) : (
                  <Send size={19} />
                )}

                {sending ? "Opening WhatsApp..." : "Send Support Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}