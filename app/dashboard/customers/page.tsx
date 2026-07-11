"use client";

import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

type Customer = {
  id: string;
  name: string;
  phone_number: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
};

export default function CustomersPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!user) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
      }

      if (data) {
        setCustomers(data);
      }

      setLoading(false);
    };

    fetchCustomers();
  }, [user]);

  return (
    <div>
      <p className="text-sm font-semibold text-cyan-300">Customers</p>

      <h1 className="mt-2 text-3xl font-black md:text-4xl">
        Customer Records
      </h1>

      <p className="mt-3 text-white/50">
        View customers automatically saved when you record sales.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="flex items-center gap-2 text-xl font-black">
          <Users size={20} />
          All Customers
        </h2>

        {loading ? (
          <div className="mt-6 flex items-center gap-3 text-white/50">
            <Loader2 className="animate-spin" size={20} />
            Loading customers...
          </div>
        ) : customers.length === 0 ? (
          <p className="mt-6 text-white/50">No customers yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="text-white/40">
                <tr>
                  <th className="py-3">Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Date Added</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-white/10">
                    <td className="py-4 font-bold">{customer.name}</td>
                    <td>{customer.phone_number || "—"}</td>
                    <td>{customer.email || "—"}</td>
                    <td>{customer.address || "—"}</td>
                    <td>
                      {new Date(customer.created_at).toLocaleDateString(
                        "en-NG"
                      )}
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