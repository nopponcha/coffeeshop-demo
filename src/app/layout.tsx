import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bean & Brew",
  description: "Welcome to Bean & Brew — specialty coffee and fresh bites in Bangkok.",
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
