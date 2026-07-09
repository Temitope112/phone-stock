"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  Boxes,
  Home,
  LogOut,
  Menu,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/products", icon: Boxes },
  { name: "Sales", href: "/dashboard/sales", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-5 top-5 z-50 rounded-xl border border-white/10 bg-white/10 p-3 text-white backdrop-blur lg:hidden"
      >
        <Menu />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#071020] p-5 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <h1 className="text-2xl font-black text-cyan-300">PhoneStock</h1>
            <p className="text-xs text-white/40">Vendor Dashboard</p>
          </Link>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/10"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
}