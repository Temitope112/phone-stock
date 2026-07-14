"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Mail,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  Store,
  ToggleLeft,
} from "lucide-react";
import { toast } from "sonner";

import { adminFetch } from "../../lib/adminFetch";

type PlatformSettings = {
  id: number;
  platform_name: string;
  support_email: string;
  support_phone: string;
  marketplace_enabled: boolean;
  registrations_enabled: boolean;
  updated_at?: string | null;
};

type SettingsResponse = {
  data: PlatformSettings;
};

const initialSettings: PlatformSettings = {
  id: 1,
  platform_name: "PhoneStock",
  support_email: "",
  support_phone: "",
  marketplace_enabled: true,
  registrations_enabled: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] =
    useState<PlatformSettings>(initialSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const result = await adminFetch<SettingsResponse>(
          "/api/admin/settings"
        );

        setSettings(result.data);
      } catch (error) {
        toast.error("Unable to load settings", {
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateField = <K extends keyof PlatformSettings>(
    field: K,
    value: PlatformSettings[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveSettings = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving) return;

    if (!settings.platform_name.trim()) {
      toast.error("Platform name is required");
      return;
    }

    if (!settings.support_email.trim()) {
      toast.error("Support email is required");
      return;
    }

    if (!settings.support_phone.trim()) {
      toast.error("Support phone is required");
      return;
    }

    const toastId = toast.loading("Saving settings...", {
      description: "Updating the PhoneStock platform configuration.",
    });

    try {
      setSaving(true);

      const result = await adminFetch<SettingsResponse>(
        "/api/admin/settings",
        {
          method: "PATCH",
          body: JSON.stringify({
            platform_name: settings.platform_name.trim(),
            support_email: settings.support_email.trim(),
            support_phone: settings.support_phone.trim(),
            marketplace_enabled: settings.marketplace_enabled,
            registrations_enabled: settings.registrations_enabled,
          }),
        }
      );

      setSettings(result.data);

      toast.success("Settings updated", {
        id: toastId,
        description:
          "Your platform configuration was saved successfully.",
      });
    } catch (error) {
      toast.error("Unable to save settings", {
        id: toastId,
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <Loader2
            size={22}
            className="animate-spin text-cyan-300"
          />
          Loading platform settings...
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-cyan-400/[0.08] p-7 md:p-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <Settings size={17} />
            Platform settings
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Configure PhoneStock
          </h1>

          <p className="mt-4 max-w-2xl leading-8 text-white/55">
            Manage platform identity, support contact information,
            marketplace availability, and vendor registration access.
          </p>
        </div>
      </section>

      <form
        onSubmit={saveSettings}
        className="mt-8 space-y-6"
      >
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
              <Store size={23} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Platform identity
              </h2>

              <p className="mt-2 text-white/45">
                Control the public name displayed across the platform.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <label
              htmlFor="platformName"
              className="mb-2 block text-sm font-semibold text-white/65"
            >
              Platform name
            </label>

            <input
              id="platformName"
              type="text"
              value={settings.platform_name}
              disabled={saving}
              onChange={(event) =>
                updateField(
                  "platform_name",
                  event.target.value
                )
              }
              className="input"
              placeholder="PhoneStock"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Support information
              </h2>

              <p className="mt-2 text-white/45">
                These details can be used across support and legal pages.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="supportEmail"
                className="mb-2 block text-sm font-semibold text-white/65"
              >
                Support email
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-4 focus-within:border-cyan-400">
                <Mail
                  size={18}
                  className="shrink-0 text-white/35"
                />

                <input
                  id="supportEmail"
                  type="email"
                  value={settings.support_email}
                  disabled={saving}
                  onChange={(event) =>
                    updateField(
                      "support_email",
                      event.target.value
                    )
                  }
                  className="w-full bg-transparent py-4 outline-none placeholder:text-white/30"
                  placeholder="support@phonestock.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="supportPhone"
                className="mb-2 block text-sm font-semibold text-white/65"
              >
                Support phone
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-4 focus-within:border-cyan-400">
                <Phone
                  size={18}
                  className="shrink-0 text-white/35"
                />

                <input
                  id="supportPhone"
                  type="tel"
                  value={settings.support_phone}
                  disabled={saving}
                  onChange={(event) =>
                    updateField(
                      "support_phone",
                      event.target.value
                    )
                  }
                  className="w-full bg-transparent py-4 outline-none placeholder:text-white/30"
                  placeholder="0903 706 0290"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <ToggleLeft size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Platform availability
              </h2>

              <p className="mt-2 text-white/45">
                Control whether customers can access the marketplace and
                whether new vendors can register.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#071020] p-5">
              <div>
                <p className="font-black text-white">
                  Marketplace enabled
                </p>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Allow visitors to browse available phones posted by
                  vendors.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.marketplace_enabled}
                disabled={saving}
                onChange={(event) =>
                  updateField(
                    "marketplace_enabled",
                    event.target.checked
                  )
                }
                className="h-5 w-5 shrink-0 accent-cyan-400"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#071020] p-5">
              <div>
                <p className="font-black text-white">
                  Vendor registrations enabled
                </p>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Allow new vendors to create PhoneStock accounts.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.registrations_enabled}
                disabled={saving}
                onChange={(event) =>
                  updateField(
                    "registrations_enabled",
                    event.target.checked
                  )
                }
                className="h-5 w-5 shrink-0 accent-cyan-400"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-col gap-4 rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.06] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black text-cyan-300">
              Ready to save your changes?
            </p>

            <p className="mt-2 text-sm text-white/45">
              Changes will take effect as soon as the platform reads the
              updated settings.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-400 px-7 py-4 font-black text-[#050816] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2
                size={19}
                className="animate-spin"
              />
            ) : (
              <Save size={19} />
            )}

            {saving ? "Saving Settings..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}