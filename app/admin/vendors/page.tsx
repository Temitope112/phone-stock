
"use client";

import AdminResourcePage from "../../components/admin/AdminResourcePage";

export default function AdminVendorsPage() {
  return (
    <AdminResourcePage
      resource="vendors"
      eyebrow="Vendors"
      title="Vendor Management"
      description="View registered businesses and vendor account information."
      columns={[
        { key: "business_name", label: "Business" },
        { key: "full_name", label: "Owner" },
        { key: "phone_number", label: "Phone" },
        { key: "role", label: "Role" },
        {
          key: "created_at",
          label: "Joined",
          render: (row) =>
            new Date(row.created_at).toLocaleDateString("en-NG"),
        },
      ]}
    />
  );
}