"use client";

import { useState } from "react";
import { Loader2, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";

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
  onSaleComplete: () => void | Promise<void>;
};

type SaleForm = {
  customerName: string;
  customerPhone: string;
  quantity: string;
  sellingPrice: string;
  paymentMethod: string;
};

export default function SellPhoneModal({
  phone,
  onClose,
  onSaleComplete,
}: SellPhoneModalProps) {
  const { user } = useAuth();

  const [form, setForm] = useState<SaleForm>({
    customerName: "",
    customerPhone: "",
    quantity: "1",
    sellingPrice: String(phone.price),
    paymentMethod: "Transfer",
  });

  const [loading, setLoading] = useState(false);

  const updateForm = (
    field: keyof SaleForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const completeSale = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    if (!user) {
      toast.error("Authentication required", {
        description:
          "Your session could not be verified. Please sign in again.",
      });

      return;
    }

    const customerName = form.customerName.trim();
    const customerPhone = form.customerPhone.trim();
    const quantitySold = Number(form.quantity);
    const sellingPrice = Number(form.sellingPrice);

    if (!customerName) {
      toast.error("Customer name is required");
      return;
    }

    if (!customerPhone) {
      toast.error("Customer phone number is required");
      return;
    }

    if (
      !Number.isInteger(quantitySold) ||
      quantitySold <= 0
    ) {
      toast.error("Enter a valid quantity", {
        description:
          "Quantity must be a whole number greater than zero.",
      });

      return;
    }

    if (quantitySold > phone.quantity) {
      toast.error("Insufficient stock", {
        description: `Only ${phone.quantity} unit${
          phone.quantity === 1 ? "" : "s"
        } of ${phone.name} are available.`,
      });

      return;
    }

    if (
      !Number.isFinite(sellingPrice) ||
      sellingPrice <= 0
    ) {
      toast.error("Enter a valid selling price", {
        description:
          "The selling price must be greater than zero.",
      });

      return;
    }

    const totalAmount = quantitySold * sellingPrice;
    const newQuantity = phone.quantity - quantitySold;

    const toastId = toast.loading("Recording sale...", {
      description: `Processing ${quantitySold} × ${phone.name}.`,
    });

    let createdCustomerId: string | null = null;
    let createdSaleId: string | null = null;

    try {
      setLoading(true);

      const { data: customer, error: customerError } =
        await supabase
          .from("customers")
          .insert({
            user_id: user.id,
            name: customerName,
            phone_number: customerPhone,
          })
          .select("id")
          .single();

      if (customerError) {
        throw new Error(
          `Customer could not be saved: ${customerError.message}`
        );
      }

      createdCustomerId = customer.id;

      toast.loading("Customer saved", {
        id: toastId,
        description: "Recording the transaction...",
      });

      const { data: sale, error: saleError } =
        await supabase
          .from("sales")
          .insert({
            user_id: user.id,
            phone_id: phone.id,
            customer_id: customer.id,
            phone_name: phone.name,
            quantity: quantitySold,
            selling_price: sellingPrice,
            total_amount: totalAmount,
            payment_method: form.paymentMethod,
          })
          .select("id")
          .single();

      if (saleError) {
        throw new Error(
          `Sale could not be recorded: ${saleError.message}`
        );
      }

      createdSaleId = sale.id;

      toast.loading("Sale recorded", {
        id: toastId,
        description: "Updating the available stock...",
      });

      const { error: updateError } = await supabase
        .from("phones")
        .update({
          quantity: newQuantity,
          status:
            newQuantity > 0 ? "Available" : "Sold Out",
        })
        .eq("id", phone.id)
        .eq("user_id", user.id);

      if (updateError) {
        throw new Error(
          `Stock could not be updated: ${updateError.message}`
        );
      }

      toast.success("Sale completed successfully", {
        id: toastId,
        description: `${quantitySold} × ${
          phone.name
        } sold for ₦${totalAmount.toLocaleString("en-NG")}.`,
      });

      await onSaleComplete();
      onClose();
    } catch (saleError) {
      /*
        Best-effort cleanup.

        This prevents an unsuccessful transaction from leaving a
        sale or customer record behind. A database transaction/RPC
        would be even safer for a later production update.
      */
      if (createdSaleId) {
        const { error: saleCleanupError } = await supabase
          .from("sales")
          .delete()
          .eq("id", createdSaleId)
          .eq("user_id", user.id);

        if (saleCleanupError) {
          console.error(
            "Unable to roll back failed sale:",
            saleCleanupError.message
          );
        }
      }

      if (createdCustomerId) {
        const { error: customerCleanupError } =
          await supabase
            .from("customers")
            .delete()
            .eq("id", createdCustomerId)
            .eq("user_id", user.id);

        if (customerCleanupError) {
          console.error(
            "Unable to roll back customer:",
            customerCleanupError.message
          );
        }
      }

      toast.error("Unable to complete sale", {
        id: toastId,
        description:
          saleError instanceof Error
            ? saleError.message
            : "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sell-phone-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 py-8 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#071020] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.5)] md:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
              <ShoppingCart size={17} />
              Record Sale
            </div>

            <h2
              id="sell-phone-title"
              className="mt-2 text-2xl font-black"
            >
              {phone.name}
            </h2>

            <p className="mt-2 text-sm text-white/45">
              {phone.quantity} unit
              {phone.quantity === 1 ? "" : "s"} currently
              available.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close sale modal"
            className="rounded-xl border border-white/10 p-2 text-white/50 transition hover:border-cyan-400/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={completeSale}
          className="mt-7 space-y-4"
        >
          <div>
            <label
              htmlFor="customerName"
              className="mb-2 block text-sm font-semibold text-white/60"
            >
              Customer name
            </label>

            <input
              id="customerName"
              type="text"
              autoComplete="name"
              className="input"
              placeholder="Enter customer name"
              value={form.customerName}
              disabled={loading}
              onChange={(event) =>
                updateForm(
                  "customerName",
                  event.target.value
                )
              }
            />
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="mb-2 block text-sm font-semibold text-white/60"
            >
              Customer phone
            </label>

            <input
              id="customerPhone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="input"
              placeholder="0801 234 5678"
              value={form.customerPhone}
              disabled={loading}
              onChange={(event) =>
                updateForm(
                  "customerPhone",
                  event.target.value
                )
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="saleQuantity"
                className="mb-2 block text-sm font-semibold text-white/60"
              >
                Quantity
              </label>

              <input
                id="saleQuantity"
                className="input"
                type="number"
                min="1"
                max={phone.quantity}
                step="1"
                value={form.quantity}
                disabled={loading}
                onChange={(event) =>
                  updateForm(
                    "quantity",
                    event.target.value
                  )
                }
              />
            </div>

            <div>
              <label
                htmlFor="sellingPrice"
                className="mb-2 block text-sm font-semibold text-white/60"
              >
                Unit selling price
              </label>

              <input
                id="sellingPrice"
                className="input"
                type="number"
                min="1"
                step="0.01"
                value={form.sellingPrice}
                disabled={loading}
                onChange={(event) =>
                  updateForm(
                    "sellingPrice",
                    event.target.value
                  )
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="paymentMethod"
              className="mb-2 block text-sm font-semibold text-white/60"
            >
              Payment method
            </label>

            <select
              id="paymentMethod"
              className="input"
              value={form.paymentMethod}
              disabled={loading}
              onChange={(event) =>
                updateForm(
                  "paymentMethod",
                  event.target.value
                )
              }
            >
              <option>Cash</option>
              <option>Transfer</option>
              <option>POS</option>
              <option>Other</option>
            </select>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/45">
                Estimated total
              </span>

              <span className="text-xl font-black text-cyan-300">
                ₦
                {(
                  Math.max(Number(form.quantity) || 0, 0) *
                  Math.max(
                    Number(form.sellingPrice) || 0,
                    0
                  )
                ).toLocaleString("en-NG")}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#050816] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <Loader2
                className="animate-spin"
                size={18}
              />
            )}

            {loading
              ? "Completing Sale..."
              : "Complete Sale"}
          </button>
        </form>
      </div>
    </div>
  );
}