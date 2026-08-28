import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Udyog Setu | Industrial Guidance Platform",
  description:
    "Intelligent guidance for industrial approvals, compliance, and government support services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}