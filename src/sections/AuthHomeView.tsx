
//src/sections/AuthHomeView.tsx






import * as React from 'react';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

export const metadata = { title: 'Auth Home | ZoskaSnap' };

export default function AuthHomeView() {
  const { data: session } = useSession();

  return (
    <Typography>
      Welcome to the authenticated home page, {session?.user?.name}!
    </Typography>
  );
}