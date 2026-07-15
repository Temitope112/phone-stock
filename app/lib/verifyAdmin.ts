// import "server-only";

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseAdmin } from "./supabaseAdmin";

// const ADMIN_EMAIL = "temitopeeniola295@gmail.com";

// export async function verifyAdmin(request: NextRequest) {
//   const authorization = request.headers.get("authorization");

//   if (!authorization?.startsWith("Bearer ")) {
//     return {
//       user: null,
//       errorResponse: NextResponse.json(
//         { error: "Authentication token is missing." },
//         { status: 401 }
//       ),
//     };
//   }

//   const accessToken = authorization.slice(7).trim();

//   const {
//     data: { user },
//     error,
//   } = await supabaseAdmin.auth.getUser(accessToken);

//   if (error || !user) {
//     return {
//       user: null,
//       errorResponse: NextResponse.json(
//         { error: "Your session is invalid or expired." },
//         { status: 401 }
//       ),
//     };
//   }

//   if (user.email?.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
//     return {
//       user: null,
//       errorResponse: NextResponse.json(
//         { error: "You do not have admin permission." },
//         { status: 403 }
//       ),
//     };
//   }

//   return {
//     user,
//     errorResponse: null,
//   };
// }


import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "./supabaseAdmin";

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL?.trim().toLowerCase() ||
  "temitopeeniola295@gmail.com";

type VerifyAdminResult = {
  user: {
    id: string;
    email: string;
  } | null;
  errorResponse: NextResponse | null;
};

export async function verifyAdmin(
  request: NextRequest
): Promise<VerifyAdminResult> {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return {
        user: null,
        errorResponse: NextResponse.json(
          {
            error: "Missing admin authorization token.",
          },
          { status: 401 }
        ),
      };
    }

    const accessToken = authorization
      .replace("Bearer ", "")
      .trim();

    if (!accessToken) {
      return {
        user: null,
        errorResponse: NextResponse.json(
          {
            error: "Invalid admin authorization token.",
          },
          { status: 401 }
        ),
      };
    }

    /*
      Validate the supplied access token with Supabase Auth.
      Do not trust an email sent from the browser.
    */
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !user) {
      console.error(
        "Admin token verification failed:",
        error?.message
      );

      return {
        user: null,
        errorResponse: NextResponse.json(
          {
            error:
              "Your admin session is invalid or has expired.",
          },
          { status: 401 }
        ),
      };
    }

    const userEmail = user.email?.trim().toLowerCase();

    if (!userEmail || userEmail !== ADMIN_EMAIL) {
      return {
        user: null,
        errorResponse: NextResponse.json(
          {
            error:
              "You do not have permission to access this resource.",
          },
          { status: 403 }
        ),
      };
    }

    return {
      user: {
        id: user.id,
        email: userEmail,
      },
      errorResponse: null,
    };
  } catch (error) {
    console.error("Admin verification error:", error);

    return {
      user: null,
      errorResponse: NextResponse.json(
        {
          error: "Unable to verify the administrator.",
        },
        { status: 500 }
      ),
    };
  }
}