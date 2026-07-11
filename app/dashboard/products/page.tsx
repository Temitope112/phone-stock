"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import SellPhoneModal from "./components/SellPhoneModal";

type Phone = {
  id: string;
  name: string;
  brand: string;
  model: string | null;
  storage: string | null;
  ram: string | null;
  color: string | null;
  condition: string;
  price: number;
  cost_price: number | null;
  quantity: number;
  status: string;
  image_url: string | null;
};

export default function ProductsPage() {
  const { user } = useAuth();

  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    storage: "",
    ram: "",
    color: "",
    condition: "Brand New",
    price: "",
    cost_price: "",
    quantity: "",
  });

  const brands = [
    "All",
    ...Array.from(new Set(phones.map((phone) => phone.brand))),
  ];

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch =
      phone.name.toLowerCase().includes(search.toLowerCase()) ||
      phone.brand.toLowerCase().includes(search.toLowerCase()) ||
      phone.condition.toLowerCase().includes(search.toLowerCase());

    const matchesBrand = brandFilter === "All" || phone.brand === brandFilter;

    return matchesSearch && matchesBrand;
  });

  const fetchPhones = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("phones")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    if (data) setPhones(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchPhones();
  }, [user]);

  const uploadPhoneImage = async () => {
    if (!imageFile || !user) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error } = await supabase.storage
      .from("phone-images")
      .upload(filePath, imageFile);

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("phone-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addPhone = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (!form.name || !form.brand || !form.price || !form.quantity) {
      alert("Please fill in phone name, brand, price, and quantity.");
      return;
    }

    try {
      setSaving(true);

      const imageUrl = await uploadPhoneImage();
      const quantity = Number(form.quantity);

      const { error } = await supabase.from("phones").insert({
        user_id: user.id,
        name: form.name,
        brand: form.brand,
        model: form.model,
        storage: form.storage,
        ram: form.ram,
        color: form.color,
        condition: form.condition,
        price: Number(form.price),
        cost_price: form.cost_price ? Number(form.cost_price) : null,
        quantity,
        status: quantity > 0 ? "Available" : "Sold Out",
        image_url: imageUrl,
      });

      if (error) {
        alert(error.message);
        return;
      }

      setForm({
        name: "",
        brand: "",
        model: "",
        storage: "",
        ram: "",
        color: "",
        condition: "Brand New",
        price: "",
        cost_price: "",
        quantity: "",
      });

      setImageFile(null);
      fetchPhones();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setSaving(false);
    }
  };

  const deletePhone = async (id: string) => {
    const confirmDelete = confirm("Delete this phone?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("phones").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchPhones();
  };

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-cyan-300">Inventory</p>

        <h1 className="mt-2 text-3xl font-black md:text-4xl">Products</h1>

        <p className="mt-3 text-white/50">
          Add, search, filter, sell, and manage real phone stock from Supabase.
        </p>
      </div>

      <form
        onSubmit={addPhone}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="mb-6 flex items-center gap-2 text-xl font-black">
          <Plus size={20} />
          Add New Phone
        </h2>

        <div className="mb-6 rounded-2xl border border-dashed border-white/10 bg-[#071020] p-5">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center">
            <Upload className="text-cyan-300" size={28} />

            <span className="font-bold">
              {imageFile ? imageFile.name : "Upload phone image"}
            </span>

            <span className="text-sm text-white/45">
              PNG, JPG, JPEG or WEBP
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="input"
            placeholder="Phone Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="input"
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />

          <input
            className="input"
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />

          <input
            className="input"
            placeholder="Storage e.g 128GB"
            value={form.storage}
            onChange={(e) => setForm({ ...form, storage: e.target.value })}
          />

          <input
            className="input"
            placeholder="RAM e.g 8GB"
            value={form.ram}
            onChange={(e) => setForm({ ...form, ram: e.target.value })}
          />

          <input
            className="input"
            placeholder="Color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />

          <select
            className="input"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
          >
            <option>Brand New</option>
            <option>UK Used</option>
            <option>Nigeria Used</option>
          </select>

          <input
            className="input"
            type="number"
            placeholder="Selling Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Cost Price optional"
            value={form.cost_price}
            onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>

        <button
          disabled={saving}
          className="mt-6 inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#050816] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={18} />}
          {saving ? "Saving..." : "Add Phone"}
        </button>
      </form>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-xl font-black">Phone Inventory</h2>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            placeholder="Search phones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input md:max-w-sm"
          />

          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="input md:max-w-xs"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="mt-6 text-white/50">Loading phones...</p>
        ) : filteredPhones.length === 0 ? (
          <p className="mt-6 text-white/50">No phones found.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="text-white/40">
                <tr>
                  <th className="py-3">Image</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Condition</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPhones.map((phone) => (
                  <tr key={phone.id} className="border-t border-white/10">
                    <td className="py-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/10">
                        {phone.image_url ? (
                          <Image
                            src={phone.image_url}
                            alt={phone.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                            No img
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="font-bold">{phone.name}</td>
                    <td>{phone.brand}</td>
                    <td>{phone.condition}</td>
                    <td>₦{Number(phone.price).toLocaleString()}</td>
                    <td>{phone.quantity}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          phone.status === "Available"
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {phone.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedPhone(phone)}
                          disabled={phone.quantity <= 0}
                          className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-black text-[#050816] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                        >
                          Sell
                        </button>

                        <button
                          onClick={() => deletePhone(phone.id)}
                          className="text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedPhone && (
        <SellPhoneModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
          onSaleComplete={fetchPhones}
        />
      )}
    </div>
  );
}