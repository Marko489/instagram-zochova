import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/NavBar";
import AuthProvider from "../components/AuthProvider";
import ThemeProviderWrapper from "../components/ThemeProvider";

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
        <ThemeProviderWrapper> {/* Wrap everything in the theme provider */}
          <AuthProvider>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <main style={{ flexGrow: 1 }}>{children}</main>
            </div>
            <Navbar />
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
