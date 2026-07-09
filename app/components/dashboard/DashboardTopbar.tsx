"use client";

import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardTopbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/90 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex items-center justify-between gap-5">
        <div className="hidden max-w-md flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 md:flex">
          <Search size={18} className="text-white/40" />
          <input
            placeholder="Search products, sales..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
          />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <Bell size={19} />
          </button>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-sm font-bold">{user?.email}</p>
            <p className="text-xs text-white/40">Vendor</p>
          </div>
        </div>
      </div>
    </header>
  );
}