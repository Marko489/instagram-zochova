"use client";

import { Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function AuthHomeView() {
  const { data: session } = useSession();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Vitaj späť, {session?.user?.name}!</Typography>
      <Typography variant="body1">Ste prihlásený.</Typography>
      {/* Additional content for authenticated users can go here */}
    </Box>
  );
}
