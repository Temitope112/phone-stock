"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Smartphone } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    form.fullName.trim() &&
    form.businessName.trim() &&
    form.phoneNumber.trim() &&
    form.email.trim() &&
    form.password.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    const result = await register(
      form.email,
      form.password,
      form.fullName,
      form.businessName,
      form.phoneNumber
    );

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(34,211,238,.08)] lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-cyan-400 to-blue-700 p-10 text-[#050816] lg:block">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050816] text-cyan-300">
              <Smartphone size={28} />
            </div>

            <h1 className="mt-10 text-5xl font-black leading-tight">
              Manage your phone stock smarter.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-[#050816]/75">
              Track phones, sales, customers, and low stock alerts from one
              simple dashboard built for phone vendors.
            </p>
          </div>

          <div className="p-7 sm:p-10">
            <div>
              <h2 className="text-3xl font-black">Create Account</h2>
              <p className="mt-2 text-white/50">
                Start managing your phone business today.
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                placeholder="Business Name"
                value={form.businessName}
                onChange={(e) =>
                  setForm({ ...form, businessName: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none focus:border-cyan-400"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 pr-14 outline-none focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-black transition ${
                  isValid && !loading
                    ? "bg-cyan-400 text-[#050816] hover:bg-cyan-300"
                    : "cursor-not-allowed bg-white/10 text-white/40"
                }`}
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-cyan-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}