

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";


export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by students of SPŠE Zochova 9, Bratislava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Navbar /> {/* Bottom Navigation */}
        </div>
      </body>
    </html>
  );
}