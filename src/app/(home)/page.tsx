
// src/app/page.tsx



import * as React from 'react';
import { useSession } from 'next-auth/react';
import AuthHomeView from '../../sections/AuthHomeView'; // Adjust the path as necessary
import NonAuthHomeView from '../../sections/NonAuthHomeView'; // Adjust the path as necessary

export const metadata = { title: 'Domov | ZoskaSnap' };

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session ? <AuthHomeView /> : <NonAuthHomeView />}
    </>
  );
}



