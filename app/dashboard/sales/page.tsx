"use client";

import { useEffect, useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

type Sale = {
  id: string;
  phone_name: string;
  quantity: number;
  selling_price: number;
  total_amount: number;
  payment_method: string;
  sale_date: string;
};

export default function SalesPage() {
  const { user } = useAuth();

  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .eq("user_id", user.id)
      .order("sale_date", { ascending: false });

    if (error) {
      alert(error.message);
    }

    if (data) {
      setSales(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSales();
  }, [user]);

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.total_amount),
    0
  );

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-cyan-300">Sales</p>

        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          Sales History
        </h1>

        <p className="mt-3 text-white/50">
          View all phones sold and track your business revenue.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-white/45">Total Revenue</p>
          <h2 className="mt-3 text-3xl font-black text-cyan-300">
            ₦{totalRevenue.toLocaleString()}
          </h2>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-white/45">Total Sales</p>
          <h2 className="mt-3 text-3xl font-black">{sales.length}</h2>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-white/45">Items Sold</p>
          <h2 className="mt-3 text-3xl font-black">
            {sales.reduce((sum, sale) => sum + sale.quantity, 0)}
          </h2>
        </article>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="flex items-center gap-2 text-xl font-black">
          <ShoppingCart size={20} />
          Recent Sales
        </h2>

        {loading ? (
          <div className="mt-6 flex items-center gap-3 text-white/50">
            <Loader2 className="animate-spin" size={20} />
            Loading sales...
          </div>
        ) : sales.length === 0 ? (
          <p className="mt-6 text-white/50">No sales recorded yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="text-white/40">
                <tr>
                  <th className="py-3">Phone</th>
                  <th>Qty</th>
                  <th>Selling Price</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-t border-white/10">
                    <td className="py-4 font-bold">{sale.phone_name}</td>
                    <td>{sale.quantity}</td>
                    <td>₦{Number(sale.selling_price).toLocaleString()}</td>
                    <td className="font-bold text-cyan-300">
                      ₦{Number(sale.total_amount).toLocaleString()}
                    </td>
                    <td>{sale.payment_method}</td>
                    <td>
                      {new Date(sale.sale_date).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}