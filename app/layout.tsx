import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "PhoneStock",
  description: "Inventory and sales software for phone vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3500}
          toastOptions={{
            style: {
              background: "#071020",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            },
          }}
        />
      </body>
    </html>
  );
}