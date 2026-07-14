"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = "temitopeeniola295@gmail.com";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid =
    email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      toast.error("Complete all fields", {
        description: "Enter your email address and password.",
      });

      return;
    }

    const toastId = toast.loading("Signing you in...", {
      description: "Verifying your PhoneStock account.",
    });

    try {
      setLoading(true);

      const result = await login(cleanEmail, password);

      if (result.error) {
        toast.error("Login failed", {
          id: toastId,
          description: result.error,
        });

        return;
      }

      if (!result.user) {
        toast.error("Login failed", {
          id: toastId,
          description:
            "Your account was authenticated, but the user information could not be loaded.",
        });

        return;
      }

      const loggedInEmail =
        result.user.email?.trim().toLowerCase() || "";

      const isAdmin =
        loggedInEmail === ADMIN_EMAIL.toLowerCase();

      toast.success("Login successful", {
        id: toastId,
        description: isAdmin
          ? "Opening the administrator dashboard..."
          : "Opening your vendor dashboard...",
      });

      await new Promise((resolve) => setTimeout(resolve, 700));

      router.replace(isAdmin ? "/admin" : "/dashboard");
      router.refresh();
    } catch (loginError) {
      toast.error("Unable to sign in", {
        id: toastId,
        description:
          loginError instanceof Error
            ? loginError.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-5 py-10 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1150px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_35px_140px_rgba(34,211,238,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-300 via-cyan-500 to-blue-700 p-10 text-[#050816] lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#050816]/10" />

            <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#050816]/10 blur-2xl" />

            <div className="relative">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050816] text-cyan-300">
                  <Smartphone size={28} />
                </div>

                <div>
                  <h1 className="text-2xl font-black">PhoneStock</h1>

                  <p className="text-xs uppercase tracking-[0.3em] text-[#050816]/60">
                    Vendor Management
                  </p>
                </div>
              </Link>

              <h2 className="mt-14 max-w-md text-5xl font-black leading-tight">
                Welcome back to your business workspace.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-[#050816]/70">
                Manage products, record sales, track customers, monitor stock,
                and understand business performance from one dashboard.
              </p>
            </div>

            <div className="relative mt-14 space-y-4">
              {[
                "Secure vendor accounts",
                "Real inventory and sales records",
                "Dedicated platform administration",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[#050816]/10 bg-white/20 px-4 py-3 backdrop-blur"
                >
                  <ShieldCheck size={20} />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="p-7 sm:p-10 md:p-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-cyan-300"
            >
              <ArrowLeft size={17} />
              Back to homepage
            </Link>

            <div className="mt-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Account access
              </p>

              <h2 className="mt-4 text-4xl font-black">Sign in</h2>

              <p className="mt-3 text-white/50">
                Enter your credentials to continue to your workspace.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              noValidate
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-white/65"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  disabled={loading}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-white/65"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-cyan-300 transition hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    disabled={loading}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 pr-14 outline-none transition placeholder:text-white/30 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-xl py-4 font-black transition ${
                  isValid && !loading
                    ? "bg-cyan-400 text-[#050816] hover:bg-white"
                    : "cursor-not-allowed bg-white/10 text-white/35"
                }`}
              >
                {loading && (
                  <Loader2 size={20} className="animate-spin" />
                )}

                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/50">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-cyan-300 transition hover:text-white"
              >
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}