"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Boxes,
  Check,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";

type RegisterForm = {
  fullName: string;
  businessName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const initialForm: RegisterForm = {
  fullName: "",
  businessName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 6,
      letter: /[A-Za-z]/.test(form.password),
      number: /\d/.test(form.password),
    }),
    [form.password]
  );

  const isValid = Boolean(
    form.fullName.trim() &&
      form.businessName.trim() &&
      form.phoneNumber.trim() &&
      form.email.trim() &&
      passwordChecks.length &&
      passwordChecks.letter &&
      passwordChecks.number &&
      acceptedTerms
  );

  const updateField = (
    field: keyof RegisterForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    if (!form.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!form.businessName.trim()) {
      toast.error("Business name is required");
      return;
    }

    if (!form.phoneNumber.trim()) {
      toast.error("Phone number is required", {
        description:
          "Customers will use this number to contact you.",
      });
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email address is required");
      return;
    }

    if (!passwordChecks.length) {
      toast.error("Password is too short", {
        description: "Your password must contain at least 6 characters.",
      });
      return;
    }

    if (!passwordChecks.letter || !passwordChecks.number) {
      toast.error("Password is not strong enough", {
        description:
          "Include at least one letter and one number.",
      });
      return;
    }

    if (!acceptedTerms) {
      toast.error("Accept the legal terms", {
        description:
          "You must accept the Terms and Privacy Policy to continue.",
      });
      return;
    }

    const toastId = toast.loading("Creating your account...", {
      description: "Setting up your PhoneStock vendor workspace.",
    });

    try {
      setLoading(true);

      const result = await register(
        form.email.trim().toLowerCase(),
        form.password,
        form.fullName.trim(),
        form.businessName.trim(),
        form.phoneNumber.trim()
      );

      if (result.error) {
        toast.error("Registration failed", {
          id: toastId,
          description: result.error,
        });

        return;
      }

      if (!result.user) {
        toast.error("Account could not be created", {
          id: toastId,
          description:
            "Supabase did not return the new account information.",
        });

        return;
      }

      setForm(initialForm);
      setAcceptedTerms(false);

      if (result.session) {
        toast.success("Registration successful", {
          id: toastId,
          description:
            "Your PhoneStock workspace is ready. Opening your dashboard...",
        });

        await new Promise((resolve) =>
          window.setTimeout(resolve, 800)
        );

        router.replace("/dashboard");
        router.refresh();

        return;
      }

      toast.success("Account created successfully", {
        id: toastId,
        description:
          "Check your email and confirm your account before signing in.",
        duration: 6000,
      });

      await new Promise((resolve) =>
        window.setTimeout(resolve, 1200)
      );

      router.replace("/login");
      router.refresh();
    } catch (registerError) {
      toast.error("Unable to create account", {
        id: toastId,
        description:
          registerError instanceof Error
            ? registerError.message
            : "An unexpected registration error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-5 py-8 text-white md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1250px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] shadow-[0_35px_140px_rgba(34,211,238,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-300 via-cyan-500 to-blue-700 p-10 text-[#050816] lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-[#050816]/10" />

            <div className="absolute -bottom-36 -left-28 h-96 w-96 rounded-full bg-[#050816]/10 blur-3xl" />

            <div className="relative">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050816] text-cyan-300 shadow-xl">
                  <Smartphone size={28} />
                </div>

                <div>
                  <h1 className="text-2xl font-black">PhoneStock</h1>

                  <p className="text-xs uppercase tracking-[0.3em] text-[#050816]/55">
                    Vendor Management
                  </p>
                </div>
              </Link>

              <h2 className="mt-14 max-w-lg text-5xl font-black leading-[1.08] xl:text-6xl">
                Run your phone business with better records.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-[#050816]/70">
                Create your vendor workspace and manage inventory, sales,
                customers, and business performance from one secure dashboard.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Boxes,
                    title: "Stock control",
                    text: "Know what is available.",
                  },
                  {
                    icon: ShoppingCart,
                    title: "Sales records",
                    text: "Track every transaction.",
                  },
                  {
                    icon: Users,
                    title: "Customer details",
                    text: "Keep buyer information.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Private workspace",
                    text: "Your records stay separate.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#050816]/10 bg-white/20 p-4 backdrop-blur"
                    >
                      <Icon size={21} />

                      <h3 className="mt-4 font-black">{item.title}</h3>

                      <p className="mt-1 text-sm text-[#050816]/65">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-12 rounded-2xl border border-[#050816]/10 bg-[#050816]/10 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} />

                <p className="font-black">
                  Built for independent vendors
                </p>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#050816]/65">
                Start with the essentials today and manage your business from
                any device.
              </p>
            </div>
          </section>

          <section className="p-7 sm:p-10 md:p-12 xl:p-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-cyan-300"
            >
              <ArrowLeft size={17} />
              Back to homepage
            </Link>

            <div className="mt-9">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Vendor registration
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Create your account
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-white/50">
                Enter your personal and business details to create your
                PhoneStock workspace.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-white/65"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Temitope Eniola"
                    value={form.fullName}
                    disabled={loading}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none transition placeholder:text-white/25 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessName"
                    className="mb-2 block text-sm font-semibold text-white/65"
                  >
                    Business name
                  </label>

                  <input
                    id="businessName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Apex Mobile Store"
                    value={form.businessName}
                    disabled={loading}
                    onChange={(event) =>
                      updateField("businessName", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none transition placeholder:text-white/25 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-semibold text-white/65"
                  >
                    Business phone number
                  </label>

                  <input
                    id="phoneNumber"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0801 234 5678"
                    value={form.phoneNumber}
                    disabled={loading}
                    onChange={(event) =>
                      updateField("phoneNumber", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none transition placeholder:text-white/25 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <p className="mt-2 text-xs leading-5 text-white/30">
                    Customers will use this number to contact you about your
                    listed phones.
                  </p>
                </div>

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
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    disabled={loading}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 outline-none transition placeholder:text-white/25 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-white/65"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    value={form.password}
                    disabled={loading}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#071020] px-5 py-4 pr-14 outline-none transition placeholder:text-white/25 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
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

                <div className="mt-3 flex flex-wrap gap-3">
                  {[
                    {
                      passed: passwordChecks.length,
                      label: "6+ characters",
                    },
                    {
                      passed: passwordChecks.letter,
                      label: "One letter",
                    },
                    {
                      passed: passwordChecks.number,
                      label: "One number",
                    },
                  ].map((check) => (
                    <span
                      key={check.label}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        check.passed
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border-white/10 bg-white/[0.03] text-white/30"
                      }`}
                    >
                      <Check size={13} />
                      {check.label}
                    </span>
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  disabled={loading}
                  onChange={(event) =>
                    setAcceptedTerms(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-cyan-400 disabled:cursor-not-allowed"
                />

                <span className="text-sm leading-6 text-white/50">
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="font-semibold text-cyan-300 hover:text-white"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-cyan-300 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-black transition ${
                  isValid && !loading
                    ? "bg-cyan-400 text-[#050816] hover:bg-white"
                    : "cursor-not-allowed bg-white/10 text-white/35"
                }`}
              >
                {loading && (
                  <Loader2 className="animate-spin" size={20} />
                )}

                {loading
                  ? "Creating your account..."
                  : "Create Vendor Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-cyan-300 transition hover:text-white"
              >
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}