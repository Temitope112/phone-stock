import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { verifyAdmin } from "../../../lib/verifyAdmin";

const allowedResources = [
  "vendors",
  "phones",
  "sales",
  "customers",
  "reviews",
] as const;

type Resource = (typeof allowedResources)[number];

const parsePage = (value: string | null) => {
  const parsed = Number(value || 1);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

export async function GET(request: NextRequest) {
  try {
    const { errorResponse } = await verifyAdmin(request);

    if (errorResponse) {
      return errorResponse;
    }

    const { searchParams } = new URL(request.url);

    const resource = searchParams.get("resource") as Resource | null;
    const search = searchParams.get("q")?.trim() || "";
    const page = parsePage(searchParams.get("page"));
    const limit = 20;

    if (!resource || !allowedResources.includes(resource)) {
      return NextResponse.json(
        { error: "Invalid admin resource." },
        { status: 400 }
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    if (resource === "vendors") {
      let query = supabaseAdmin
        .from("profiles")
        .select(
          "id, full_name, business_name, phone_number, role, created_at",
          { count: "exact" }
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      if (search) {
        query = query.or(
          `full_name.ilike.%${search}%,business_name.ilike.%${search}%,phone_number.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return NextResponse.json({
        data: data ?? [],
        count: count ?? 0,
        page,
        limit,
      });
    }

    if (resource === "phones") {
      let query = supabaseAdmin
        .from("phones")
        .select(
          `
            id,
            name,
            brand,
            model,
            condition,
            storage,
            color,
            price,
            quantity,
            status,
            image_url,
            seller_name,
            seller_phone,
            user_id,
            created_at
          `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%,seller_name.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return NextResponse.json({
        data: data ?? [],
        count: count ?? 0,
        page,
        limit,
      });
    }

    if (resource === "sales") {
      let query = supabaseAdmin
        .from("sales")
        .select(
          `
            id,
            phone_name,
            quantity,
            selling_price,
            total_amount,
            payment_method,
            user_id,
            customer_id,
            sale_date
          `,
          { count: "exact" }
        )
        .order("sale_date", { ascending: false })
        .range(from, to);

      if (search) {
        query = query.or(
          `phone_name.ilike.%${search}%,payment_method.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw error;

      const vendorIds = Array.from(
        new Set((data ?? []).map((sale) => sale.user_id).filter(Boolean))
      );

      const { data: vendors } =
        vendorIds.length > 0
          ? await supabaseAdmin
              .from("profiles")
              .select("id, business_name")
              .in("id", vendorIds)
          : { data: [] };

      const vendorMap = new Map(
        (vendors ?? []).map((vendor) => [
          vendor.id,
          vendor.business_name || "Unnamed vendor",
        ])
      );

      return NextResponse.json({
        data: (data ?? []).map((sale) => ({
          ...sale,
          vendor_name:
            vendorMap.get(sale.user_id) || "Unknown vendor",
        })),
        count: count ?? 0,
        page,
        limit,
      });
    }

    if (resource === "customers") {
      let query = supabaseAdmin
        .from("customers")
        .select(
          `
            id,
            name,
            phone_number,
            email,
            address,
            user_id,
            created_at
          `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,phone_number.ilike.%${search}%,email.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw error;

      const vendorIds = Array.from(
        new Set((data ?? []).map((customer) => customer.user_id).filter(Boolean))
      );

      const { data: vendors } =
        vendorIds.length > 0
          ? await supabaseAdmin
              .from("profiles")
              .select("id, business_name")
              .in("id", vendorIds)
          : { data: [] };

      const vendorMap = new Map(
        (vendors ?? []).map((vendor) => [
          vendor.id,
          vendor.business_name || "Unnamed vendor",
        ])
      );

      return NextResponse.json({
        data: (data ?? []).map((customer) => ({
          ...customer,
          vendor_name:
            vendorMap.get(customer.user_id) || "Unknown vendor",
        })),
        count: count ?? 0,
        page,
        limit,
      });
    }

    let query = supabaseAdmin
      .from("reviews")
      .select(
        `
          id,
          vendor_id,
          phone_id,
          customer_name,
          rating,
          comment,
          status,
          created_at
        `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.or(
        `customer_name.ilike.%${search}%,comment.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      data: data ?? [],
      count: count ?? 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Admin data API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load admin data.",
      },
      { status: 500 }
    );
  }
}