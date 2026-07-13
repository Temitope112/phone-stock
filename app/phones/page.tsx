"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  MessageCircle,
  Search,
  Smartphone,
} from "lucide-react";
import MarketplaceDisclaimer from "../components/marketing/MarketplaceDisclaimer";
import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";
import { supabase } from "../lib/supabase";

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
  quantity: number;
  image_url: string | null;
  seller_name: string | null;
  seller_phone: string | null;
};

const formatWhatsAppNumber = (phone: string | null) => {
  if (!phone) return "";

  let number = phone.replace(/\D/g, "");

  // Convert 09037060290 to 2349037060290
  if (number.startsWith("0")) {
    number = `234${number.slice(1)}`;
  }

  // Convert 002349037060290 to 2349037060290
  if (number.startsWith("00234")) {
    number = number.slice(2);
  }

  // Convert 9037060290 to 2349037060290
  if (number.length === 10 && !number.startsWith("234")) {
    number = `234${number}`;
  }

  return number;
};

export default function PhonesPage() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        setError("");

        const { data, error: fetchError } = await supabase
          .from("phones")
          .select(
            `
              id,
              name,
              brand,
              model,
              storage,
              ram,
              color,
              condition,
              price,
              quantity,
              image_url,
              seller_name,
              seller_phone
            `
          )
          .eq("status", "Available")
          .gt("quantity", 0)
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setPhones(data ?? []);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load marketplace phones."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  const brands = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          phones
            .map((phone) => phone.brand)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))
        )
      ),
    ],
    [phones]
  );

  const filteredPhones = useMemo(() => {
    const query = search.trim().toLowerCase();

    return phones.filter((phone) => {
      const matchesSearch =
        !query ||
        phone.name.toLowerCase().includes(query) ||
        phone.brand.toLowerCase().includes(query) ||
        phone.model?.toLowerCase().includes(query) ||
        phone.condition.toLowerCase().includes(query) ||
        phone.seller_name?.toLowerCase().includes(query);

      const matchesBrand =
        brandFilter === "All" || phone.brand === brandFilter;

      return matchesSearch && matchesBrand;
    });
  }, [brandFilter, phones, search]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="absolute left-1/2 top-16 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />

        <div className="relative mx-auto max-w-[1450px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Marketplace
            </p>

            <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">
              Available Phones
            </h1>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
              Browse phones listed by vendors and contact the correct seller
              directly through WhatsApp.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-[1000px]">
  <MarketplaceDisclaimer />
</div>

          <div className="mx-auto mt-12 flex max-w-[1000px] flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-4">
              <Search size={18} className="shrink-0 text-white/35" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search phone, brand, model or vendor..."
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-white/30"
              />
            </div>

            <select
              value={brandFilter}
              onChange={(event) => setBrandFilter(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#071020] px-5 py-4 text-sm outline-none focus:border-cyan-400"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mx-auto mt-8 max-w-[1000px] rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="flex items-center gap-3 text-white/50">
                <Loader2 className="animate-spin text-cyan-300" size={22} />
                Loading marketplace phones...
              </div>
            </div>
          ) : filteredPhones.length === 0 ? (
            <div className="mt-16 flex min-h-[350px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] text-center">
              <Smartphone size={40} className="text-white/20" />

              <h2 className="mt-5 text-2xl font-black">
                No phones found
              </h2>

              <p className="mt-3 max-w-md leading-7 text-white/40">
                No available phone matches your current search or filter.
              </p>
            </div>
          ) : (
            <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredPhones.map((phone) => {
                const whatsappNumber = formatWhatsAppNumber(
                  phone.seller_phone
                );

                const whatsappMessage = encodeURIComponent(
                  `Hello ${
                    phone.seller_name || "Vendor"
                  }, I am interested in the ${
                    phone.name
                  } listed on PhoneStock for ₦${Number(
                    phone.price
                  ).toLocaleString("en-NG")}. Is it still available?`
                );

                const whatsappUrl = whatsappNumber
                  ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
                  : "";

                return (
                  <article
                    key={phone.id}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                  >
                    <div className="relative h-72 overflow-hidden bg-white/5">
                      {phone.image_url ? (
                        <Image
                          src={phone.image_url}
                          alt={phone.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Smartphone
                            size={50}
                            className="text-white/20"
                          />
                        </div>
                      )}

                      <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-[#050816]/80 px-4 py-2 text-xs font-bold text-cyan-300 backdrop-blur">
                        {phone.condition}
                      </span>
                    </div>

                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                            {phone.brand}
                          </p>

                          <h2 className="mt-2 text-2xl font-black">
                            {phone.name}
                          </h2>
                        </div>

                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                          {phone.quantity} available
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {phone.model && (
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                            {phone.model}
                          </span>
                        )}

                        {phone.storage && (
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                            {phone.storage}
                          </span>
                        )}

                        {phone.ram && (
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                            {phone.ram} RAM
                          </span>
                        )}

                        {phone.color && (
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                            {phone.color}
                          </span>
                        )}
                      </div>

                      <p className="mt-6 text-3xl font-black text-cyan-300">
                        ₦
                        {Number(phone.price).toLocaleString("en-NG")}
                      </p>

                      <div className="mt-5 rounded-xl border border-white/10 bg-[#071020] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                          Vendor
                        </p>

                        <p className="mt-2 font-bold text-white/75">
                          {phone.seller_name || "Phone Vendor"}
                        </p>
                      </div>

                      {whatsappNumber ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan-400 px-6 py-4 font-black text-[#050816] transition hover:bg-white"
                        >
                          <MessageCircle size={18} />
                          Contact Vendor
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-white/10 px-6 py-4 font-black text-white/35"
                        >
                          <MessageCircle size={18} />
                          Vendor phone unavailable
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}