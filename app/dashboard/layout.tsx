"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <p className="text-white/60">Loading dashboard...</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <DashboardSidebar />

      <section className="min-h-screen lg:pl-72">
        <DashboardTopbar />
        <div className="px-5 py-6 md:px-8">{children}</div>
      </section>
    </main>
  );
}