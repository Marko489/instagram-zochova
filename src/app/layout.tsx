// import { Metadata } from "next";
// import "./globals.css";
// import Navbar from "../components/NavBar";
// import AuthProvider from "../components/AuthProvider";

// export const metadata: Metadata = {
//   title: "SnapZoška",
//   description: "Created by students of SPŠE Zochova 9, Bratislava",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="sk">
//       <body>
//         <AuthProvider>
//           <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//             <main style={{ flexGrow: 1 }}>
//               {children}
//             </main>
//           </div>
//           <Navbar /> 
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider } from "../context/ThemeContext"; // Import ThemeProvider

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
        <AuthProvider>
          <ThemeProvider> {/* Wrap app with ThemeProvider */}
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Navbar /> {/* Navbar will be inside ThemeProvider */}
              <main style={{ flexGrow: 1 }}>{children}</main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}