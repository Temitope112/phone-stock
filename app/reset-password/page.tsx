"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
} from "lucide-react";

import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSessionReady(Boolean(session));
    };

    checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" || session) {
        setSessionReady(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checks = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
    match: Boolean(password) && password === confirmPassword,
  };

  const isValid =
    checks.length && checks.letter && checks.number && checks.match;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!sessionReady) {
      setError(
        "Your recovery link is invalid or has expired. Request another link."
      );
      return;
    }

    if (!isValid || loading) return;

    try {
      setLoading(true);
      setError("");

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);

      window.setTimeout(() => {
        router.replace("/login");
        router.refresh();
      }, 1800);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update your password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-5 py-10 text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_120px_rgba(34,211,238,0.1)] sm:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
          <LockKeyhole size={27} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
          Account recovery
        </p>

        <h1 className="mt-4 text-4xl font-black">Choose a new password</h1>

        <p className="mt-4 leading-7 text-white/50">
          Create a secure password you have not used for this account before.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {success ? (
          <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-emerald-300">
            Password updated successfully. Redirecting you to login…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-white/65"
              >
                New password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your new password"
                  className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 pr-14 outline-none focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-cyan-300"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-white/65"
              >
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Repeat your new password"
                className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { passed: checks.length, label: "8+ characters" },
                { passed: checks.letter, label: "Contains a letter" },
                { passed: checks.number, label: "Contains a number" },
                { passed: checks.match, label: "Passwords match" },
              ].map((item) => (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    item.passed
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                      : "border-white/10 text-white/30"
                  }`}
                >
                  <Check size={13} />
                  {item.label}
                </span>
              ))}
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className={`inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-black transition ${
                isValid && !loading
                  ? "bg-cyan-400 text-[#050816] hover:bg-white"
                  : "cursor-not-allowed bg-white/10 text-white/35"
              }`}
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        )}

        <Link
          href="/forgot-password"
          className="mt-6 block text-center text-sm font-bold text-cyan-300 hover:text-white"
        >
          Request a new recovery link
        </Link>
      </div>
    </main>
  );
}