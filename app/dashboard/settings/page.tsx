"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error.message);
      }

      if (data) {
        setForm({
          fullName: data.full_name || "",
          businessName: data.business_name || "",
          phoneNumber: data.phone_number || "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.fullName,
        business_name: form.businessName,
        phone_number: form.phoneNumber,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Settings updated successfully.");
  };

  return (
    <div>
      <p className="text-sm font-semibold text-cyan-300">Settings</p>

      <h1 className="mt-2 text-3xl font-black md:text-4xl">
        Business Settings
      </h1>

      <p className="mt-3 text-white/50">
        Update your profile and business information.
      </p>

      <form
        onSubmit={updateProfile}
        className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-6"
      >
        {loading ? (
          <div className="flex items-center gap-3 text-white/50">
            <Loader2 className="animate-spin" size={20} />
            Loading settings...
          </div>
        ) : (
          <>
            <div className="space-y-5">
              <input
                className="input"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="Business Name"
                value={form.businessName}
                onChange={(e) =>
                  setForm({ ...form, businessName: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />
            </div>

            <button
              disabled={saving}
              className="mt-6 inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#050816] disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}