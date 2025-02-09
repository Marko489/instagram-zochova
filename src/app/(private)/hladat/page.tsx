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



import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchComponent from "@/components/SearchComponent"; // Import search bar

export const metadata = { title: "Hľadanie | ZoškaSnap" };

export default function Find() {
  return (
    <Container>
      <Typography variant="h4">Hľadanie</Typography>
      <SearchComponent /> {/* Render search bar */}
    </Container>
  );
}
