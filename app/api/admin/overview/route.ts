import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { verifyAdmin } from "../../../lib/verifyAdmin";

type SaleRow = {
  id: string;
  phone_name: string;
  total_amount: number | string | null;
  sale_date: string;
  user_id: string;
};

export async function GET(request: NextRequest) {
  try {
    const { errorResponse } = await verifyAdmin(request);

    if (errorResponse) {
      return errorResponse;
    }

    const [
      vendorsResult,
      phonesResult,
      customersResult,
      salesResult,
      reviewsResult,
      recentVendorsResult,
    ] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("phones")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("customers")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("sales")
        .select("id, phone_name, total_amount, sale_date, user_id")
        .order("sale_date", { ascending: false }),

      supabaseAdmin
        .from("reviews")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("profiles")
        .select("id, full_name, business_name, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const errors = [
      vendorsResult.error,
      phonesResult.error,
      customersResult.error,
      salesResult.error,
      reviewsResult.error,
      recentVendorsResult.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      console.error("Admin overview errors:", errors);

      return NextResponse.json(
        { error: "Some admin information could not be loaded." },
        { status: 500 }
      );
    }

    const sales = (salesResult.data ?? []) as SaleRow[];

    const totalRevenue = sales.reduce(
      (total, sale) => total + Number(sale.total_amount || 0),
      0
    );

    const currentYear = new Date().getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = monthNames.map((month) => ({
      month,
      revenue: 0,
    }));

    sales.forEach((sale) => {
      const date = new Date(sale.sale_date);

      if (date.getFullYear() === currentYear) {
        monthlyRevenue[date.getMonth()].revenue += Number(
          sale.total_amount || 0
        );
      }
    });

    const recentVendorIds = Array.from(
      new Set(sales.slice(0, 5).map((sale) => sale.user_id))
    );

    const { data: saleVendors, error: saleVendorsError } =
      recentVendorIds.length > 0
        ? await supabaseAdmin
            .from("profiles")
            .select("id, business_name")
            .in("id", recentVendorIds)
        : { data: [], error: null };

    if (saleVendorsError) {
      console.error("Recent sale vendor error:", saleVendorsError);
    }

    const vendorMap = new Map(
      (saleVendors ?? []).map((vendor) => [
        vendor.id,
        vendor.business_name || "Phone vendor",
      ])
    );

    const recentVendors = (recentVendorsResult.data ?? []).map(
      (vendor) => ({
        id: vendor.id,
        businessName: vendor.business_name || "Unnamed business",
        ownerName: vendor.full_name || "Unknown owner",
        joinedAt: vendor.created_at
          ? new Date(vendor.created_at).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Unknown date",
      })
    );

    const recentSales = sales.slice(0, 5).map((sale) => ({
      id: sale.id,
      phoneName: sale.phone_name || "Unknown phone",
      vendorName: vendorMap.get(sale.user_id) || "Phone vendor",
      amount: Number(sale.total_amount || 0),
      date: sale.sale_date
        ? new Date(sale.sale_date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Unknown date",
    }));

    const notifications = [
      {
        id: "vendors",
        title: "Registered vendors",
        message: `${vendorsResult.count ?? 0} vendors are registered.`,
        type: "info",
      },
      {
        id: "phones",
        title: "Marketplace listings",
        message: `${phonesResult.count ?? 0} phones are currently listed.`,
        type: "info",
      },
      {
        id: "sales",
        title: "Platform sales",
        message: `${sales.length} sales have been recorded.`,
        type: sales.length > 0 ? "success" : "info",
      },
    ];

    return NextResponse.json({
      stats: {
        revenue: totalRevenue,
        vendors: vendorsResult.count ?? 0,
        phones: phonesResult.count ?? 0,
        sales: sales.length,
        customers: customersResult.count ?? 0,
        reviews: reviewsResult.count ?? 0,
      },
      monthlyRevenue,
      recentVendors,
      recentSales,
      notifications,
    });
  } catch (error) {
    console.error("Admin overview route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load admin overview.",
      },
      { status: 500 }
    );
  }
}