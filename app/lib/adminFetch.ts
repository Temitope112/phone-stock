import { supabase } from "./supabase";

type ApiErrorResponse = {
  error?: string;
};

export async function adminFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session?.access_token) {
    throw new Error("Your admin session could not be verified.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...options.headers,
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();

    console.error("Admin API returned a non-JSON response:", {
      url,
      status: response.status,
      statusText: response.statusText,
      responsePreview: text.slice(0, 500),
    });

    throw new Error(
      `Admin API error: ${response.status} ${response.statusText} at ${url}`
    );
  }

  const result = (await response.json()) as T & ApiErrorResponse;

  if (!response.ok) {
    throw new Error(
      result.error ||
        `Admin request failed with status ${response.status}.`
    );
  }

  return result;
}