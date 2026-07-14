"use client";

import { useCallback, useEffect, useState } from "react";

export type PlatformSettings = {
  platform_name: string;
  support_email: string;
  support_phone: string;
  marketplace_enabled: boolean;
  registrations_enabled: boolean;
  updated_at: string | null;
};

type SettingsResponse = {
  data?: PlatformSettings;
  error?: string;
};

const defaultSettings: PlatformSettings = {
  platform_name: "PhoneStock",
  support_email: "",
  support_phone: "",
  marketplace_enabled: true,
  registrations_enabled: true,
  updated_at: null,
};

export function usePlatformSettings() {
  const [settings, setSettings] =
    useState<PlatformSettings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/platform/settings", {
        method: "GET",
        cache: "no-store",
      });

      const result =
        (await response.json()) as SettingsResponse;

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to load platform settings."
        );
      }

      setSettings(result.data ?? defaultSettings);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load platform settings."
      );

      /*
        Keep the platform usable if the settings request fails.
        The defaults leave marketplace and registration enabled.
      */
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
  };
}