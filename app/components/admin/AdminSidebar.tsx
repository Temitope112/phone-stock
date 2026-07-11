"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Boxes,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  ShoppingCart,
  Smartphone,
  Store,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Vendors",
    href: "/admin/vendors",
    icon: Store,
  },
  {
    name: "Phones",
    href: "/admin/phones",
    icon: Boxes,
  },
  {
    name: "Sales",
    href: "/admin/sales",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquareText,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      router.replace("/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin navigation"
        className="fixed left-5 top-5 z-50 rounded-xl border border-white/10 bg-[#071020]/90 p-3 text-white shadow-xl backdrop-blur lg:hidden"
      >
        <Menu size={22} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#071020] p-5 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-[#050816]">
              <Smartphone size={24} />
            </div>

            <div>
              <h1 className="text-xl font-black text-white">
                PhoneStock
              </h1>

              <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/60">
                Platform Admin
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close admin navigation"
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
            Admin workspace
          </p>

          <p className="mt-2 text-sm font-semibold text-white/70">
            Manage vendors, marketplace activity, sales, and platform settings.
          </p>
        </div>

        <nav className="mt-8 flex-1 space-y-2 overflow-y-auto pr-1">
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-cyan-400 text-[#050816]"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={20} />
          {loggingOut ? "Signing out..." : "Logout"}
        </button>
      </aside>
    </>
  );
}