"use client";

import { useEffect, useState } from "react";
import { BarChart3, Boxes, Loader2, TrendingUp } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

type Sale = {
  id: string;
  quantity: number;
  total_amount: number;
  selling_price: number;
};

type Phone = {
  id: string;
  quantity: number;
  cost_price: number | null;
  price: number;
};

export default function ReportsPage() {
  const { user } = useAuth();

  const [sales, setSales] = useState<Sale[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      setLoading(true);

      const [salesResult, phonesResult] = await Promise.all([
        supabase.from("sales").select("*").eq("user_id", user.id),
        supabase.from("phones").select("*").eq("user_id", user.id),
      ]);

      if (salesResult.data) setSales(salesResult.data);
      if (phonesResult.data) setPhones(phonesResult.data);

      setLoading(false);
    };

    fetchReports();
  }, [user]);

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.total_amount),
    0
  );

  const totalItemsSold = sales.reduce(
    (sum, sale) => sum + Number(sale.quantity),
    0
  );

  const totalStockValue = phones.reduce(
    (sum, phone) => sum + Number(phone.price) * Number(phone.quantity),
    0
  );

  const lowStockCount = phones.filter((phone) => phone.quantity <= 2).length;

  const cards = [
    {
      title: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
    },
    {
      title: "Items Sold",
      value: totalItemsSold,
      icon: BarChart3,
    },
    {
      title: "Stock Value",
      value: `₦${totalStockValue.toLocaleString()}`,
      icon: Boxes,
    },
    {
      title: "Low Stock Items",
      value: lowStockCount,
      icon: Boxes,
    },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-cyan-300">Reports</p>

      <h1 className="mt-2 text-3xl font-black md:text-4xl">
        Business Reports
      </h1>

      <p className="mt-3 text-white/50">
        Track revenue, stock value, sold items, and low-stock products.
      </p>

      {loading ? (
        <div className="mt-8 flex items-center gap-3 text-white/50">
          <Loader2 className="animate-spin" size={20} />
          Loading reports...
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/45">{card.title}</p>
                    <h2 className="mt-3 text-2xl font-black text-cyan-300">
                      {card.value}
                    </h2>
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