// src/app/o-mne/page.tsx

// src/app/o-mne/page.tsx

// import { Container, Typography, Button, Box } from '@mui/material';
// import { Instagram, Facebook, Language } from '@mui/icons-material';
// import Link from 'next/link';

// export const metadata = { title: "O mne | ZoškaSnap" };

// export default function About() {
//   return (
//     <Container
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//       }}
//     >
//       {/* Title */}
//       <Typography 
//         variant="h3" 
//         sx={{ 
//           mb: 4, 
//           textAlign: 'center', 
//           width: '100%', 
//           maxWidth: '1200px', 
//           fontWeight: 'bold', 
//           fontSize: '4rem', // Increased size for title
//         }}
//       >
//         O nás
//       </Typography>

//       {/* Description text */}
//       <Typography 
//         variant="body1"
//         sx={{ 
//           mb: 4,
//           textAlign: 'center',
//           maxWidth: '1200px',
//           width: '100%',
//           fontStyle: 'italic',
//           fontSize: '1.5rem', // Increased size for body text
//         }}
//       >
//         Sme popredná marketingová agentúra, ktorá sa špecializuje na vytváranie dynamických digitálnych zážitkov, ktoré pomáhajú značkám rásť, angažovať ich publikum a dosahovať dlhodobý úspech. Náš tím je oddaný poskytovaniu inovatívnych stratégií, ktoré transformujú víziu vašej firmy do reality.
//       </Typography>

//       {/* Row of buttons */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center', // Center the buttons in the row
//           width: '100%',
//         }}
//       >
//         <Link href="https://zochova.sk/" passHref>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#1976D2', // Same blue used for the register button
//               margin: '10px',
//               width: '200px', // Set width to 200px
//               justifyContent: 'flex-start', // Align text and icon to the left
//               alignItems: 'center', // Align icon and text properly
//               display: 'flex', // Flexbox to center content
//               textDecoration: 'none', // Ensure no underline on button
//             }}
//             startIcon={<Language />}
//           >
//             Oficiálna stránka
//           </Button>
//         </Link>

//         <Link href="https://www.instagram.com/spsezochova/" passHref>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#1976D2', // Same blue used for the register button
//               margin: '10px',
//               width: '200px', // Set width to 200px
//               justifyContent: 'flex-start', // Align text and icon to the left
//               alignItems: 'center', // Align icon and text properly
//               display: 'flex', // Flexbox to center content
//               textDecoration: 'none', // Ensure no underline on button
//             }}
//             startIcon={<Instagram />}
//           >
//             Instagram
//           </Button>
//         </Link>

//         <Link href="https://www.facebook.com/spsezochova/?locale=sk_SK" passHref>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#1976D2', // Same blue used for the register button
//               margin: '10px',
//               width: '200px', // Set width to 200px
//               justifyContent: 'flex-start', // Align text and icon to the left
//               alignItems: 'center', // Align icon and text properly
//               display: 'flex', // Flexbox to center content
//               textDecoration: 'none', // Ensure no underline on button
//             }}
//             startIcon={<Facebook />}
//           >
//             Facebook
//           </Button>
//         </Link>
//       </Box>
//     </Container>
//   );
// }




// src/app/o-mne/page.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import { Stack } from '@mui/material';

export const metadata = { title: "O mne | ZoškaSnap" }

export default function About() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography
        sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', fontSize: '4rem' }} 
        variant="h1"
      >
        About me
      </Typography>

      <Typography
        sx={{
          textAlign: 'center', 
          mb: 2, 
          fontFamily: '"Roboto", sans-serif', 
          fontSize: '1.25rem',
        }}
      >
        This is a student web development project where I am learning to create dynamic websites with modern frameworks and technologies. The aim is to showcase my skills and knowledge in building functional, responsive, and interactive web applications.
      </Typography>

      <Typography sx={{ textAlign: 'center', mb: 2 }} variant="h6">
        Links:
      </Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <IconButton 
          component="a" 
          href="https://www.facebook.com/spsezochova/?locale=sk_SK" 
          target="_blank" 
          aria-label="Facebook"
        >
          <FacebookIcon />
        </IconButton>

        <IconButton 
          component="a" 
          href="https://zochova.sk/" 
          target="_blank" 
          aria-label="Website"
        >
          <LinkIcon />
        </IconButton>

        <IconButton 
          component="a" 
          href="https://www.instagram.com/spsezochova/" 
          target="_blank" 
          aria-label="Instagram"
        >
          <InstagramIcon />
        </IconButton>
      </Stack>
    </Container>
  );
}
