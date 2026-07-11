"use client";
import { AdminProvider } from "../context/AdminContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const ADMIN_EMAIL = "temitopeeniola295@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const isAdmin =
    user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAdmin, loading, router, user]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="flex items-center gap-3 text-white/55">
          <Loader2 className="animate-spin text-cyan-300" size={22} />
          Verifying admin access...
        </div>
      </main>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
  <AdminProvider>
    <main className="min-h-screen bg-[#050816] text-white">
      <AdminSidebar />

      <section className="min-h-screen lg:pl-72">
        <AdminTopbar />

        <div className="px-5 py-6 md:px-8 lg:px-10">
          {children}
        </div>
      </section>
    </main>
  </AdminProvider>
);
}