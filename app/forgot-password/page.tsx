"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "../lib/supabase";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      toast.error("Email address is required", {
        description:
          "Enter the email connected to your PhoneStock account.",
      });

      return;
    }

    const toastId = toast.loading("Sending reset link...", {
      description: "Preparing your secure password recovery email.",
    });

    try {
      setLoading(true);

      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error } =
        await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: redirectUrl,
        });

      if (error) {
        throw new Error(error.message);
      }

      setSent(true);

      toast.success("Reset link sent", {
        id: toastId,
        description:
          "Check your email and open the latest password-reset link.",
      });
    } catch (requestError) {
      toast.error("Unable to send reset link", {
        id: toastId,
        description:
          requestError instanceof Error
            ? requestError.message
            : "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-5 py-10 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1100px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_35px_140px_rgba(34,211,238,0.12)] lg:grid-cols-2">
          <section className="hidden bg-gradient-to-br from-cyan-300 via-cyan-500 to-blue-700 p-10 text-[#050816] lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050816] text-cyan-300">
                  <Smartphone size={28} />
                </div>

                <div>
                  <h1 className="text-2xl font-black">PhoneStock</h1>

                  <p className="text-xs uppercase tracking-[0.3em] text-[#050816]/55">
                    Account Recovery
                  </p>
                </div>
              </Link>

              <h2 className="mt-14 max-w-md text-5xl font-black leading-tight">
                Recover access to your business workspace.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-[#050816]/70">
                Enter your registered email and we’ll send you a secure link
                to choose a new password.
              </p>
            </div>

            <div className="rounded-2xl border border-[#050816]/10 bg-white/20 p-5 backdrop-blur">
              <LockKeyhole size={24} />

              <p className="mt-4 font-black">
                Secure password recovery
              </p>

              <p className="mt-2 text-sm leading-6 text-[#050816]/65">
                The reset link is sent only to the email connected to your
                PhoneStock account.
              </p>
            </div>
          </section>

          <section className="p-7 sm:p-10 md:p-12">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-cyan-300"
            >
              <ArrowLeft size={17} />
              Go back
            </button>

            {sent ? (
              <div className="mt-14">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={31} />
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Check your email
                </p>

                <h1 className="mt-4 text-4xl font-black">
                  Reset link sent
                </h1>

                <p className="mt-5 leading-8 text-white/50">
                  We sent password-reset instructions to{" "}
                  <span className="font-bold text-white">
                    {email.trim().toLowerCase()}
                  </span>
                  . Open the latest link in that email to create a new
                  password.
                </p>

                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 w-full rounded-xl border border-white/10 px-6 py-4 font-black text-white/70 transition hover:border-cyan-400/30 hover:text-cyan-300"
                >
                  Send another link
                </button>

                <Link
                  href="/login"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#050816] transition hover:bg-white"
                >
                  Return to login
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-10">
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                    Forgot password
                  </p>

                  <h1 className="mt-4 text-4xl font-black">
                    Reset your password
                  </h1>

                  <p className="mt-3 leading-7 text-white/50">
                    Enter the email address you used when creating your
                    account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-8">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-white/65"
                  >
                    Email address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-4 transition focus-within:border-cyan-400">
                    <Mail
                      size={19}
                      className="shrink-0 text-white/35"
                    />

                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      disabled={loading}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      className="w-full bg-transparent py-4 outline-none placeholder:text-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!email.trim() || loading}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-black transition ${
                      email.trim() && !loading
                        ? "bg-cyan-400 text-[#050816] hover:bg-white"
                        : "cursor-not-allowed bg-white/10 text-white/35"
                    }`}
                  >
                    {loading && (
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />
                    )}

                    {loading
                      ? "Sending reset link..."
                      : "Send reset link"}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-white/50">
                  Remembered your password?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-cyan-300 hover:text-white"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}