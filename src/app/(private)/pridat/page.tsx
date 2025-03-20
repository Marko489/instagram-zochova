// src/app/prispevok/page.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PostForm from '@/components/PostForm'; // ✅ Import the PostForm component

export const metadata = { title: "Pridat | ZoškaSnap" };

export default function Add() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Pridať</Typography>
      <PostForm /> {/* ✅ Display the PostForm component */}
    </Container>
  );
}
