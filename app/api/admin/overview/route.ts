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

type NamedQueryError = {
  query: string;
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
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
      recentVendorsResult,
      reviewsResult,
    ] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true }),

      supabaseAdmin
        .from("phones")
        .select("id", { count: "exact", head: true }),

      supabaseAdmin
        .from("customers")
        .select("id", { count: "exact", head: true }),

      supabaseAdmin
        .from("sales")
        .select("id, phone_name, total_amount, sale_date, user_id")
        .order("sale_date", { ascending: false }),

      supabaseAdmin
        .from("profiles")
        .select("id, full_name, business_name, created_at")
        .order("created_at", { ascending: false })
        .limit(5),

      supabaseAdmin
        .from("reviews")
        .select("id", { count: "exact", head: true }),
    ]);

    const requiredErrors: NamedQueryError[] = [
      {
        query: "vendors",
        message: vendorsResult.error?.message,
        code: vendorsResult.error?.code,
        details: vendorsResult.error?.details,
        hint: vendorsResult.error?.hint,
      },
      {
        query: "phones",
        message: phonesResult.error?.message,
        code: phonesResult.error?.code,
        details: phonesResult.error?.details,
        hint: phonesResult.error?.hint,
      },
      {
        query: "customers",
        message: customersResult.error?.message,
        code: customersResult.error?.code,
        details: customersResult.error?.details,
        hint: customersResult.error?.hint,
      },
      {
        query: "sales",
        message: salesResult.error?.message,
        code: salesResult.error?.code,
        details: salesResult.error?.details,
        hint: salesResult.error?.hint,
      },
      {
        query: "recentVendors",
        message: recentVendorsResult.error?.message,
        code: recentVendorsResult.error?.code,
        details: recentVendorsResult.error?.details,
        hint: recentVendorsResult.error?.hint,
      },
    ].filter((item) => Boolean(item.message));

    if (requiredErrors.length > 0) {
      console.error("Admin overview query errors:", requiredErrors);

      return NextResponse.json(
        {
          error:
            requiredErrors[0]?.message ||
            "Some admin information could not be loaded.",
          details: requiredErrors,
        },
        { status: 500 }
      );
    }

    if (reviewsResult.error) {
      console.warn("Reviews count could not be loaded:", {
        query: "reviews",
        message: reviewsResult.error.message,
        code: reviewsResult.error.code,
        details: reviewsResult.error.details,
        hint: reviewsResult.error.hint,
      });
    }

    const sales = (salesResult.data ?? []) as SaleRow[];

    const totalRevenue = sales.reduce((total, sale) => {
      return total + Number(sale.total_amount || 0);
    }, 0);

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
      if (!sale.sale_date) return;

      const saleDate = new Date(sale.sale_date);

      if (Number.isNaN(saleDate.getTime())) return;

      if (saleDate.getFullYear() === currentYear) {
        monthlyRevenue[saleDate.getMonth()].revenue += Number(
          sale.total_amount || 0
        );
      }
    });

    const recentSales = sales.slice(0, 5);

    const recentVendorIds = Array.from(
      new Set(
        recentSales
          .map((sale) => sale.user_id)
          .filter((id): id is string => Boolean(id))
      )
    );

    let vendorMap = new Map<string, string>();

    if (recentVendorIds.length > 0) {
      const { data: saleVendors, error: saleVendorsError } =
        await supabaseAdmin
          .from("profiles")
          .select("id, business_name")
          .in("id", recentVendorIds);

      if (saleVendorsError) {
        console.error("Recent sale vendor query error:", {
          query: "saleVendors",
          message: saleVendorsError.message,
          code: saleVendorsError.code,
          details: saleVendorsError.details,
          hint: saleVendorsError.hint,
        });
      } else {
        vendorMap = new Map(
          (saleVendors ?? []).map((vendor) => [
            vendor.id,
            vendor.business_name || "Phone vendor",
          ])
        );
      }
    }

    const formattedRecentVendors = (
      recentVendorsResult.data ?? []
    ).map((vendor) => ({
      id: vendor.id,
      businessName: vendor.business_name || "Unnamed business",
      ownerName: vendor.full_name || "Unknown owner",
      joinedAt: formatDate(vendor.created_at),
    }));

    const formattedRecentSales = recentSales.map((sale) => ({
      id: sale.id,
      phoneName: sale.phone_name || "Unknown phone",
      vendorName:
        vendorMap.get(sale.user_id) || "Phone vendor",
      amount: Number(sale.total_amount || 0),
      date: formatDate(sale.sale_date),
    }));

    const reviewsCount = reviewsResult.error
      ? 0
      : reviewsResult.count ?? 0;

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
      {
        id: "customers",
        title: "Customer records",
        message: `${
          customersResult.count ?? 0
        } customer records are available.`,
        type: "info",
      },
    ];

    return NextResponse.json({
      stats: {
        revenue: totalRevenue,
        vendors: vendorsResult.count ?? 0,
        phones: phonesResult.count ?? 0,
        sales: sales.length,
        customers: customersResult.count ?? 0,
        reviews: reviewsCount,
      },
      monthlyRevenue,
      recentVendors: formattedRecentVendors,
      recentSales: formattedRecentSales,
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

function formatDate(dateValue: string | null | undefined) {
  if (!dateValue) {
    return "Unknown date";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}