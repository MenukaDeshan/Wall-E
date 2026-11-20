import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WALL-E | 3D Scroll Experience",
  description: "Explore the story of WALL-E through an interactive, scroll-driven 3D animation.",
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
