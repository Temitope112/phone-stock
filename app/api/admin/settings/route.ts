import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { verifyAdmin } from "../../../lib/verifyAdmin";

export async function GET(request: NextRequest) {
  const { errorResponse } = await verifyAdmin(request);

  if (errorResponse) return errorResponse;

  const { data, error } = await supabaseAdmin
    .from("platform_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: NextRequest) {
  const { errorResponse } = await verifyAdmin(request);

  if (errorResponse) return errorResponse;

  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("platform_settings")
    .update({
      platform_name: body.platform_name,
      support_email: body.support_email,
      support_phone: body.support_phone,
      marketplace_enabled: Boolean(body.marketplace_enabled),
      registrations_enabled: Boolean(body.registrations_enabled),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}