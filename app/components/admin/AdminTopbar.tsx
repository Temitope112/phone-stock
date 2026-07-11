"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";

type AdminProfile = {
  full_name: string | null;
  business_name: string | null;
};

export default function AdminTopbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const {
    notifications,
    unreadCount,
    markAllAsRead,
  } = useAdmin();

  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, business_name")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchAdminProfile();
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const displayName =
    profile?.full_name?.trim() ||
    user?.email?.split("@")[0] ||
    "Administrator";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    const normalizedQuery = query.toLowerCase();

    if (
      normalizedQuery.includes("vendor") ||
      normalizedQuery.includes("business")
    ) {
      router.push(`/admin/vendors?q=${encodeURIComponent(query)}`);
      return;
    }

    if (
      normalizedQuery.includes("phone") ||
      normalizedQuery.includes("product") ||
      normalizedQuery.includes("stock")
    ) {
      router.push(`/admin/phones?q=${encodeURIComponent(query)}`);
      return;
    }

    if (
      normalizedQuery.includes("sale") ||
      normalizedQuery.includes("transaction") ||
      normalizedQuery.includes("revenue")
    ) {
      router.push(`/admin/sales?q=${encodeURIComponent(query)}`);
      return;
    }

    if (
      normalizedQuery.includes("customer") ||
      normalizedQuery.includes("buyer")
    ) {
      router.push(`/admin/customers?q=${encodeURIComponent(query)}`);
      return;
    }

    if (
      normalizedQuery.includes("review") ||
      normalizedQuery.includes("rating")
    ) {
      router.push(`/admin/reviews?q=${encodeURIComponent(query)}`);
      return;
    }

    router.push(`/admin/vendors?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
  try {
    setLoggingOut(true);

    await logout();

    router.replace("/login");
    router.refresh();
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Unable to log out. Please try again."
    );
  } finally {
    setLoggingOut(false);
    setProfileMenuOpen(false);
  }
};

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/90 px-5 py-4 backdrop-blur-xl md:px-8 lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <form
          onSubmit={handleSearch}
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition focus-within:border-cyan-400/40 md:flex"
        >
          <Search size={18} className="shrink-0 text-white/35" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search vendors, phones, sales..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </form>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Platform online
          </div>

          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              aria-label="View notifications"
              onClick={() => {
                setNotificationsOpen((current) => !current);
                setProfileMenuOpen(false);
              }}
              className="relative rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white/70 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              <Bell size={19} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-black text-[#050816]">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-14 z-50 w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#071020] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <h3 className="font-black text-white">Notifications</h3>
                    <p className="mt-1 text-xs text-white/40">
                      {unreadCount} unread
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 transition hover:text-white disabled:cursor-not-allowed disabled:text-white/25"
                  >
                    <CheckCheck size={15} />
                    Mark all read
                  </button>
                </div>

                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="mx-auto text-white/20" size={28} />

                      <p className="mt-4 text-sm text-white/40">
                        No notifications yet.
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border-b border-white/10 px-5 py-4 last:border-b-0"
                      >
                        <div className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />

                          <div>
                            <p className="text-sm font-bold text-white">
                              {notification.title}
                            </p>

                            <p className="mt-1 text-sm leading-6 text-white/45">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div ref={profileMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen((current) => !current);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition hover:border-cyan-400/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-[#050816]">
                {initials}
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <p className="max-w-[160px] truncate text-sm font-bold text-white">
                    {displayName}
                  </p>

                  <ShieldCheck size={15} className="text-cyan-300" />
                </div>

                <p className="mt-0.5 text-xs text-white/35">
                  Platform administrator
                </p>
              </div>

              <ChevronDown
                size={17}
                className={`hidden text-white/35 transition sm:block ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#071020] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="font-black text-white">{displayName}</p>

                  <p className="mt-1 truncate text-sm text-white/40">
                    {user?.email}
                  </p>

                  {profile?.business_name && (
                    <p className="mt-2 text-xs font-semibold text-cyan-300">
                      {profile.business_name}
                    </p>
                  )}
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/admin/settings");
                      setProfileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Settings size={18} />
                    Platform settings
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      router.push("/admin/settings");
                      setProfileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <UserRound size={18} />
                    Admin profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {loggingOut ? "Signing out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}