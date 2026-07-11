import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "./supabaseAdmin";

const ADMIN_EMAIL = "temitopeeniola295@gmail.com";

export async function verifyAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: "Authentication token is missing." },
        { status: 401 }
      ),
    };
  }

  const accessToken = authorization.slice(7).trim();

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !user) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: "Your session is invalid or expired." },
        { status: 401 }
      ),
    };
  }

  if (user.email?.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: "You do not have admin permission." },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    errorResponse: null,
  };
}