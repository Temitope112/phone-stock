
"use client";

import AdminResourcePage from "../../components/admin/AdminResourcePage";

export default function AdminReviewsPage() {
  return (
    <AdminResourcePage
      resource="reviews"
      eyebrow="Reviews"
      title="Marketplace Reviews"
      description="View and moderate feedback submitted by customers."
      columns={[
        { key: "customer_name", label: "Customer" },
        {
          key: "rating",
          label: "Rating",
          render: (row) => `${row.rating}/5`,
        },
        { key: "comment", label: "Comment" },
        { key: "status", label: "Status" },
        {
          key: "created_at",
          label: "Submitted",
          render: (row) =>
            new Date(row.created_at).toLocaleDateString("en-NG"),
        },
      ]}
    />
  );
}