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

"use client"; // Ensure this is a client-side component

import { useSession } from "next-auth/react";
import AuthHomeView from "../sections/AuthHomeView"; // Correct relative path
import NonAuthHomeView from "../sections/NonAuthHomeView";
import Typography from "@mui/material/Typography";

export default function Home() {
  const { data: session, status } = useSession();

  // Show loading state while session is being fetched
  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  // Show authenticated view if the user is logged in
  if (session) {
    return <AuthHomeView />;
  }

  // Show non-authenticated view otherwise
  return <NonAuthHomeView />;
}
