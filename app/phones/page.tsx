"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import LandingNavbar from "../components/marketing/LandingNavbar";
import LandingFooter from "../components/marketing/LandingFooter";
import { supabase } from "../lib/supabase";

type Phone = {
  id: string;
  name: string;
  brand: string;
  condition: string;
  price: number;
  quantity: number;
  image_url: string | null;
  seller_name: string | null;
  seller_phone: string | null;
};

export default function PhonesPage() {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      const { data } = await supabase
        .from("phones")
        .select("*")
        .eq("status", "Available")
        .gt("quantity", 0)
        .order("created_at", { ascending: false });

      if (data) setPhones(data);
    };

    fetchPhones();
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />

      <section className="px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1450px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Marketplace
            </p>

            <h1 className="mt-5 text-5xl font-black md:text-7xl">
              Available Phones
            </h1>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
              Browse phones posted by verified vendors and contact the correct
              seller directly on WhatsApp.
            </p>
          </div>

          <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {phones.map((phone) => (
              <article
                key={phone.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
              >
                <div className="relative h-72 bg-white/5">
                  {phone.image_url ? (
                    <Image
                      src={phone.image_url}
                      alt={phone.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/40">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <p className="text-sm font-bold text-cyan-300">
                    {phone.brand}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">{phone.name}</h2>

                  <p className="mt-3 text-white/50">{phone.condition}</p>

                  <p className="mt-5 text-3xl font-black text-cyan-300">
                    ₦{Number(phone.price).toLocaleString()}
                  </p>

                  <p className="mt-3 text-sm text-white/45">
                    Vendor: {phone.seller_name || "Phone Vendor"}
                  </p>

                  <a
                    href={`https://wa.me/${phone.seller_phone?.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(
                      `Hello, I am interested in ${phone.name} listed for ₦${Number(
                        phone.price
                      ).toLocaleString()} on PhoneStock.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan-400 px-6 py-4 font-black text-[#050816]"
                  >
                    <MessageCircle size={18} />
                    Contact Vendor
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}