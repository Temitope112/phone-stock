"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Boxes,
  CircleDollarSign,
  Loader2,
  MessageSquareText,
  RefreshCw,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

import { adminFetch } from "../lib/adminFetch";
import { useAdmin } from "../context/AdminContext";
import AdminRevenueChart from "../components/admin/AdminRevenueChart";

type AdminStats = {
  revenue: number;
  vendors: number;
  phones: number;
  sales: number;
  customers: number;
  reviews: number;
};

type MonthlyRevenue = {
  month: string;
  revenue: number;
};

type RecentVendor = {
  id: string;
  businessName: string;
  ownerName: string;
  joinedAt: string;
};

type RecentSale = {
  id: string;
  phoneName: string;
  vendorName: string;
  amount: number;
  date: string;
};

type AdminNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
};

type AdminOverviewResponse = {
  stats: AdminStats;
  monthlyRevenue: MonthlyRevenue[];
  recentVendors: RecentVendor[];
  recentSales: RecentSale[];
  notifications: AdminNotification[];
};

const initialStats: AdminStats = {
  revenue: 0,
  vendors: 0,
  phones: 0,
  sales: 0,
  customers: 0,
  reviews: 0,
};

const formatCurrency = (value: number) => {
  return `₦${Number(value || 0).toLocaleString("en-NG")}`;
};

export default function AdminPage() {
  const { setNotifications } = useAdmin();

  const [stats, setStats] = useState<AdminStats>(initialStats);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [recentVendors, setRecentVendors] = useState<RecentVendor[]>([]);
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchAdminOverview = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const result = await adminFetch<AdminOverviewResponse>(
          "/api/admin/overview"
        );

        setStats(result.stats ?? initialStats);
        setMonthlyRevenue(result.monthlyRevenue ?? []);
        setRecentVendors(result.recentVendors ?? []);
        setRecentSales(result.recentSales ?? []);
        setNotifications(result.notifications ?? []);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load the platform overview."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [setNotifications]
  );

  useEffect(() => {
    fetchAdminOverview();
  }, [fetchAdminOverview]);

  const cards = useMemo(
    () => [
      {
        title: "Overall Revenue",
        value: formatCurrency(stats.revenue),
        description: "Combined sales value across the platform",
        icon: CircleDollarSign,
      },
      {
        title: "Total Vendors",
        value: stats.vendors.toLocaleString(),
        description: "Registered phone businesses",
        icon: Store,
      },
      {
        title: "Total Phones",
        value: stats.phones.toLocaleString(),
        description: "Products currently listed",
        icon: Boxes,
      },
      {
        title: "Total Sales",
        value: stats.sales.toLocaleString(),
        description: "Transactions recorded by vendors",
        icon: ShoppingCart,
      },
      {
        title: "Total Customers",
        value: stats.customers.toLocaleString(),
        description: "Buyer records across the platform",
        icon: Users,
      },
      {
        title: "Reviews",
        value: stats.reviews.toLocaleString(),
        description: "Customer feedback submitted",
        icon: MessageSquareText,
      },
    ],
    [stats]
  );

  const hasRevenueData = monthlyRevenue.some(
    (item) => Number(item.revenue) > 0
  );

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="flex items-center gap-3 text-white/55">
          <Loader2 className="animate-spin text-cyan-300" size={22} />
          Loading platform overview...
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-cyan-400/[0.08] p-7 md:p-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Platform administration
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
              PhoneStock Overview
            </h1>

            <p className="mt-4 max-w-2xl leading-8 text-white/55">
              Monitor vendors, listed phones, sales activity, customer growth,
              reviews, and platform performance from one central workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchAdminOverview(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-[#071020]/80 px-5 py-3 text-sm font-bold text-white/65 transition hover:border-cyan-400/30 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 lg:self-auto"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh data"}
          </button>
        </div>
      </section>

      {error && (
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300 sm:flex-row sm:items-center sm:justify-between">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => fetchAdminOverview(true)}
            className="shrink-0 rounded-lg border border-red-300/20 px-4 py-2 text-sm font-bold transition hover:bg-red-500/10"
          >
            Try again
          </button>
        </div>
      )}

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/45">
                    {card.title}
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                    {card.value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816] transition group-hover:scale-105">
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/40">
                {card.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Platform performance
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Revenue Trend
              </h2>

              <p className="mt-2 text-sm text-white/40">
                Monthly platform revenue for {new Date().getFullYear()}.
              </p>
            </div>

            <TrendingUp className="text-cyan-300" size={24} />
          </div>

          <div className="mt-8">
            {monthlyRevenue.length > 0 && hasRevenueData ? (
              <AdminRevenueChart data={monthlyRevenue} />
            ) : (
              <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">
                <TrendingUp size={34} className="text-white/20" />

                <p className="mt-4 font-semibold text-white/45">
                  No revenue data yet
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-white/30">
                  The chart will update automatically when vendors begin
                  recording sales.
                </p>
              </div>
            )}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm font-semibold text-cyan-300">
            System health
          </p>

          <h2 className="mt-2 text-2xl font-black">Platform Status</h2>

          <p className="mt-2 text-sm text-white/40">
            Current status of important PhoneStock services.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ["Authentication", "Operational"],
              ["Database", "Operational"],
              ["Marketplace", "Operational"],
              ["Image Storage", "Operational"],
            ].map(([service, status]) => (
              <div
                key={service}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#071020] p-4"
              >
                <span className="font-semibold text-white/65">{service}</span>

                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                New businesses
              </p>

              <h2 className="mt-2 text-2xl font-black">Recent Vendors</h2>
            </div>

            <Store className="text-white/30" />
          </div>

          {recentVendors.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/40">
              Recent vendor activity will appear here.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {recentVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#071020] p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-bold">
                      {vendor.businessName}
                    </p>

                    <p className="mt-1 truncate text-sm text-white/40">
                      {vendor.ownerName}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-white/40">
                    {vendor.joinedAt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Latest transactions
              </p>

              <h2 className="mt-2 text-2xl font-black">Recent Sales</h2>
            </div>

            <ShoppingCart className="text-white/30" />
          </div>

          {recentSales.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/40">
              Recent sales will appear here.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#071020] p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-bold">{sale.phoneName}</p>

                    <p className="mt-1 truncate text-sm text-white/40">
                      {sale.vendorName} · {sale.date}
                    </p>
                  </div>

                  <p className="shrink-0 font-black text-cyan-300">
                    {formatCurrency(sale.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}