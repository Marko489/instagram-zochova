
import Container from "@mui/material/Container";
import ProfileLookup from "@/components/ProfileLookup"; // ✅ Import the ProfileLookup component

export const metadata = { title: "Profil | ZoškaSnap" };

export default function ProfilePage() {
  return (
    <Container>
      
      <ProfileLookup /> {/* ✅ Display the ProfileLookup component */}
    </Container>
  );
}
