


import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Snap Zoska",
  description: "Generatated by students in SPSE Zochova 9, Bratislava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        {children}
      </body>
    </html>
  );
}
