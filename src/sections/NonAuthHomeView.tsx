// src/sections/NonAuthHomeView.tsx

// import { Container, Typography } from "@mui/material";

// export default function NonAuthHomeView() {
//   return (
//     <Container>
//       <Typography variant="body1" sx={{ mt: 2 }}>
//         Domovská stránka - NEprihlásený user
//       </Typography>
//       <Typography>
//         Registrujte sa, aby ste mohli pridať príspevky a zobraziť profil.
//       </Typography>
//     </Container>
//   );
// }






// src/sections/NonAuthHomeView.tsx

import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

// Import Google Fonts for better typography
import { CssBaseline } from '@mui/material';

export default function NonAuthHomeView() {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="lg"  // Increase the container size
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: 'Roboto, sans-serif',
          width: '100%',  // Full width of the viewport
        }}
      >
        {/* Title styled to be very large and centered */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: "center",
            fontFamily: 'Poppins, sans-serif',
            fontSize: "4rem", // Much larger font size
            width: 'auto', // Let the title extend beyond the container width if necessary
            maxWidth: '100%', // No limit on width to allow overflowing text
          }}
        >
          Vitajte na ZoškaSnap!
        </Typography>
        
        {/* Description text container with increased width, keeping it centered */}
        <Typography
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.2rem",
            lineHeight: "1.6",
            fontWeight: "300",
            maxWidth: '80%', // Making this container wider, but keeping it centered
            width: '100%',
            wordWrap: 'break-word', // Allow words to break
          }}
        >
          Pripojte sa k našej komunite a začnite zdieľať svoje momenty. Stačí sa zaregistrovať, aby ste mohli vytvárať príspevky, komentovať a získať prístup k exkluzívnym funkciám.
        </Typography>
        
        {/* Register button remains unchanged */}
        <Link href="/auth/registracia" passHref>
          <Button
            variant="contained"
            sx={{
              fontSize: "1rem", 
              padding: "12px 24px",
            }}
          >
            Registrovať sa
          </Button>
        </Link>
      </Container>
    </>
  );
}
