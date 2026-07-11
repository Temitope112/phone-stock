"use client";

import AdminResourcePage from "../../components/admin/AdminResourcePage";

export default function AdminPhonesPage() {
  return (
    <AdminResourcePage
      resource="phones"
      eyebrow="Phones"
      title="Marketplace Listings"
      description="View every phone currently posted by vendors."
      columns={[
        { key: "name", label: "Phone" },
        { key: "brand", label: "Brand" },
        { key: "seller_name", label: "Vendor" },
        {
          key: "price",
          label: "Price",
          render: (row) => `₦${Number(row.price).toLocaleString()}`,
        },
        { key: "quantity", label: "Quantity" },
        { key: "status", label: "Status" },
        {
          key: "created_at",
          label: "Listed",
          render: (row) =>
            new Date(row.created_at).toLocaleDateString("en-NG"),
        },
      ]}
    />
  );
}