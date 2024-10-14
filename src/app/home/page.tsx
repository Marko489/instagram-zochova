// // src/app/page.tsx
// import Typography from "@mui/material/Typography";

// export const metadata = { title: "Domov | ZoškaSnap" };

// export default function Home() {
//   return (
//     <>
//       <Typography>Home Page</Typography>

//     </>
//   );
// }

"use client";

import { useSession } from "next-auth/react";
import AuthHomeView from "../sections/AuthHomeView"; // Authenticated user view
import NonAuthHomeView from "../sections/NonAuthHomeView"; // Non-authenticated user view
import Typography from "@mui/material/Typography";

export default function Home() {
  const { data: session, status } = useSession();

  // Loading state
  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  // Show Authenticated View
  if (session) {
    return <AuthHomeView />;
  }

  // Show Non-Authenticated View
  return <NonAuthHomeView />;
}





