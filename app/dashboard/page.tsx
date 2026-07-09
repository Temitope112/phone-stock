"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Boxes, Loader2, ShoppingCart, Users } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

type DashboardStats = {
  totalProducts: number;
  totalSales: number;
  totalCustomers: number;
  lowStock: number;
};

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalSales: 0,
    totalCustomers: 0,
    lowStock: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardStats = async () => {
      setLoading(true);

      const [
        productsResult,
        salesResult,
        customersResult,
        lowStockResult,
      ] = await Promise.all([
        supabase
          .from("phones")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),

        supabase
          .from("sales")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),

        supabase
          .from("customers")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),

        supabase
          .from("phones")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .lte("quantity", 2),
      ]);

      setStats({
        totalProducts: productsResult.count || 0,
        totalSales: salesResult.count || 0,
        totalCustomers: customersResult.count || 0,
        lowStock: lowStockResult.count || 0,
      });

      setLoading(false);
    };

    fetchDashboardStats();
  }, [user]);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Boxes,
    },
    {
      title: "Total Sales",
      value: stats.totalSales,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: AlertTriangle,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-cyan-300">
          Welcome to PhoneStock
        </p>

        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          Dashboard Overview
        </h1>

        <p className="mt-3 max-w-2xl text-white/50">
          Track your phones, sales, customers, and stock performance from one
          place.
        </p>
      </div>

      {loading ? (
        <div className="mt-10 flex items-center gap-3 text-white/50">
          <Loader2 className="animate-spin" size={20} />
          Loading dashboard data...
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/45">{stat.title}</p>
                    <h2 className="mt-3 text-3xl font-black">{stat.value}</h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-[#050816]">
                    <Icon size={22} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}