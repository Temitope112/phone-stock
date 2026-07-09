"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../context/AuthContext";

type Phone = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type SellPhoneModalProps = {
  phone: Phone;
  onClose: () => void;
  onSaleComplete: () => void;
};

export default function SellPhoneModal({
  phone,
  onClose,
  onSaleComplete,
}: SellPhoneModalProps) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    quantity: "1",
    sellingPrice: String(phone.price),
    paymentMethod: "Transfer",
  });

  const [loading, setLoading] = useState(false);

  const completeSale = async () => {
    if (!user) return;

    const quantitySold = Number(form.quantity);
    const sellingPrice = Number(form.sellingPrice);

    if (!form.customerName || !form.customerPhone) {
      alert("Please enter customer name and phone number.");
      return;
    }

    if (quantitySold <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    if (quantitySold > phone.quantity) {
      alert("You cannot sell more than available stock.");
      return;
    }

    setLoading(true);

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        user_id: user.id,
        name: form.customerName,
        phone_number: form.customerPhone,
      })
      .select()
      .single();

    if (customerError) {
      setLoading(false);
      alert(customerError.message);
      return;
    }

    const totalAmount = quantitySold * sellingPrice;

    const { error: saleError } = await supabase.from("sales").insert({
      user_id: user.id,
      phone_id: phone.id,
      customer_id: customer.id,
      phone_name: phone.name,
      quantity: quantitySold,
      selling_price: sellingPrice,
      total_amount: totalAmount,
      payment_method: form.paymentMethod,
    });

    if (saleError) {
      setLoading(false);
      alert(saleError.message);
      return;
    }

    const newQuantity = phone.quantity - quantitySold;

    const { error: updateError } = await supabase
      .from("phones")
      .update({
        quantity: newQuantity,
        status: newQuantity > 0 ? "Available" : "Sold Out",
      })
      .eq("id", phone.id);

    setLoading(false);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    onSaleComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#071020] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-cyan-300">Record Sale</p>
            <h2 className="text-2xl font-black">{phone.name}</h2>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Customer Phone"
            value={form.customerPhone}
            onChange={(e) =>
              setForm({ ...form, customerPhone: e.target.value })
            }
          />

          <input
            className="input"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Selling Price"
            value={form.sellingPrice}
            onChange={(e) =>
              setForm({ ...form, sellingPrice: e.target.value })
            }
          />

          <select
            className="input"
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
          >
            <option>Cash</option>
            <option>Transfer</option>
            <option>POS</option>
            <option>Other</option>
          </select>
        </div>

        <button
          onClick={completeSale}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#050816]"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Completing Sale..." : "Complete Sale"}
        </button>
      </div>
    </div>
  );
}