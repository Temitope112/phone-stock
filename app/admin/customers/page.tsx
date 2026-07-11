
"use client";

import AdminResourcePage from "../../components/admin/AdminResourcePage";

export default function AdminCustomersPage() {
  return (
    <AdminResourcePage
      resource="customers"
      eyebrow="Customers"
      title="Customer Records"
      description="View customers recorded across all vendor businesses."
      columns={[
        { key: "name", label: "Customer" },
        { key: "phone_number", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "vendor_name", label: "Vendor" },
        {
          key: "created_at",
          label: "Added",
          render: (row) =>
            new Date(row.created_at).toLocaleDateString("en-NG"),
        },
      ]}
    />
  );
}