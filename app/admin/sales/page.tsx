"use client";

import AdminResourcePage from "../../components/admin/AdminResourcePage";

export default function AdminSalesPage() {
  return (
    <AdminResourcePage
      resource="sales"
      eyebrow="Sales"
      title="Platform Sales"
      description="Monitor transactions recorded by every vendor."
      columns={[
        { key: "phone_name", label: "Phone" },
        { key: "vendor_name", label: "Vendor" },
        { key: "quantity", label: "Quantity" },
        {
          key: "total_amount",
          label: "Amount",
          render: (row) =>
            `₦${Number(row.total_amount).toLocaleString()}`,
        },
        { key: "payment_method", label: "Payment" },
        {
          key: "sale_date",
          label: "Date",
          render: (row) =>
            new Date(row.sale_date).toLocaleDateString("en-NG"),
        },
      ]}
    />
  );
}