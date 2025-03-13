// src/app/hladanie/page.tsx

// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';

// export const metadata = { title: "Hladanie | ZoškaSnap"}


// export default function Find() {
//   return (

//     <Container>
//         <Typography>Hľadanie</Typography>
//     </Container>

//   );
// }


// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { SearchProvider } from "@/app/context/SearchContext";
import SearchComponent from "@/components/SearchComponent";
import ProfileTeaserList from "@/components/ProfileTeaserList";

export default function SearchPage() {
  return (
    <SearchProvider>
      <Container maxWidth="md">
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", // Centers horizontally only
            textAlign: "center", // Ensures text inside is centered
            width: "100%", 
          }}
        >
          <SearchComponent />
          <Box mt={4}> {/* Adds spacing between search and profile list */}
            <ProfileTeaserList />
          </Box>
        </Box>
      </Container>
    </SearchProvider>
  );
}
