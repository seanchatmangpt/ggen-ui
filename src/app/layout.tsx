import type { Metadata } from "next";
import "../generated/semantic-tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ggen-ui | Semantic Control Plane",
  description: "Evidence, authority, receipts, and replay projected from the admitted ggen ecosystem graph.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
