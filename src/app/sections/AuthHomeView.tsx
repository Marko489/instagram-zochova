"use client"; // Ensure this is a client-side component

import { Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function AuthView() {
  const { data: session } = useSession();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Vitaj spat!</Typography>
      <Typography variant="body1">
        Prihlasene.
      </Typography>
      {/* Add more content for logged-in users */}
    </Box>
  );
}
