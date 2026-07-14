import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("platform_settings")
      .select(
        `
          platform_name,
          support_email,
          support_phone,
          marketplace_enabled,
          registrations_enabled,
          updated_at
        `
      )
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("Public platform settings query error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data: {
          platform_name: data?.platform_name || "PhoneStock",
          support_email: data?.support_email || "",
          support_phone: data?.support_phone || "",
          marketplace_enabled: data?.marketplace_enabled ?? true,
          registrations_enabled: data?.registrations_enabled ?? true,
          updated_at: data?.updated_at || null,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Public platform settings route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load platform settings.",
      },
      { status: 500 }
    );
  }
}