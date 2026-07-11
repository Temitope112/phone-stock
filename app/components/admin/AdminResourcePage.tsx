"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";

import { adminFetch } from "../../lib/adminFetch";
import AdminPageHeader from "./AdminPageHeader";

type Resource =
  | "vendors"
  | "phones"
  | "sales"
  | "customers"
  | "reviews";

type Column = {
  key: string;
  label: string;
  render?: (row: Record<string, any>) => React.ReactNode;
};

type AdminResourcePageProps = {
  resource: Resource;
  eyebrow: string;
  title: string;
  description: string;
  columns: Column[];
};

type ApiResult = {
  data: Record<string, any>[];
  count: number;
  page: number;
  limit: number;
};

export default function AdminResourcePage({
  resource,
  eyebrow,
  title,
  description,
  columns,
}: AdminResourcePageProps) {
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        resource,
        page: String(page),
      });

      if (appliedSearch) {
        params.set("q", appliedSearch);
      }

      const result = await adminFetch<ApiResult>(
        `/api/admin/data?${params.toString()}`
      );

      setRows(result.data);
      setCount(result.count);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load records."
      );
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, page, resource]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const totalPages = Math.max(1, Math.ceil(count / 20));

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(search.trim());
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-md items-center gap-3 rounded-xl border border-white/10 bg-[#071020] px-4 py-3"
          >
            <Search size={18} className="text-white/35" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${resource}...`}
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
            />
          </form>

          <p className="text-sm text-white/40">
            {count.toLocaleString()} records
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-white/45">
            <Loader2 className="animate-spin text-cyan-300" size={20} />
            Loading {resource}...
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 text-white/40">
            No {resource} found.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="text-white/40">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className="px-4 py-3 font-semibold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-white/10 text-white/70"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-4">
                        {column.render
                          ? column.render(row)
                          : row[column.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <p className="text-sm text-white/40">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1 || loading}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-xl border border-white/10 p-3 text-white/60 transition hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-xl border border-white/10 p-3 text-white/60 transition hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}