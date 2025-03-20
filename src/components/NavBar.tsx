// "use client";






// "use client";

// import * as React from "react";
// import {
//   BottomNavigation,
//   BottomNavigationAction,
//   Box,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import LoginIcon from "@mui/icons-material/Login";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import LogoutIcon from "@mui/icons-material/Logout";
// import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
// import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
// import { useRouter, usePathname } from "next/navigation"; // usePathname to detect the current route
// import { useSession } from "next-auth/react";
// import { useThemeToggle } from "../components/ThemeProvider"; // Use the theme toggle hook

// export default function Navbar() {
//   const [isSun, setIsSun] = React.useState(true); // State for sun/moon toggle
//   const toggleTheme = useThemeToggle(); // Theme toggle function
//   const router = useRouter();
//   const pathname = usePathname(); // Get the current route
//   const { data: session, status } = useSession();

//   const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
//     if (
//       !session &&
//       newValue !== "/auth/registracia" &&
//       newValue !== "/auth/prihlasenie" &&
//       newValue !== "/" &&
//       newValue !== "/o-mne"
//     ) {
//       router.push("/auth/registracia");
//     } else {
//       router.push(newValue);
//     }
//   };

//   // Toggle the sun/moon and theme
//   const handleThemeToggle = () => {
//     setIsSun((prev) => !prev);
//     toggleTheme();
//   };

//   // Non-authenticated navigation paths
//   const nonAuthPaths = [
//     { label: "Domov", value: "/", icon: <HomeIcon /> },
//     { label: "O mne", value: "/o-mne", icon: <AccessibilityIcon /> },
//     { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
//     { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
//   ];

//   // Authenticated navigation paths
//   const authPaths = [
//     { label: "Domov", value: "/prispevok", icon: <HomeIcon /> },
//     { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
//     { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
//     {
//       label: "Profil",
//       value: "/profile",
//       icon: session?.user?.image ? (
//         <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined} />
//       ) : (
//         <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
//       ),
//     },
//     { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
//   ];

//   // Final navigation paths: Either the authenticated or non-authenticated paths
//   const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

//   return (
//     <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
//       <BottomNavigation
//         showLabels // ✅ Fixed from `showLabel`
//         value={pathname} // ✅ Use the current path as the selected value
//         onChange={handleNavigation}
//       >
//         {navigationPaths.map((path) => (
//           <BottomNavigationAction
//             key={path.value}
//             label={path.label}
//             value={path.value}
//             icon={path.icon}
//             sx={{
//               color: pathname === path.value ? "blue" : "inherit", // ✅ Highlight the active icon
//             }}
//           />
//         ))}
//       </BottomNavigation>

//       {/* Sun/Moon Theme Toggle */}
//       <IconButton
//         onClick={handleThemeToggle}
//         sx={{
//           position: "absolute",
//           bottom: "6px",
//           right: "10px",
//         }}
//         color="inherit"
//       >
//         {isSun ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
//       </IconButton>
//     </Box>
//   );
// }


"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useThemeToggle } from "../components/ThemeProvider";

export default function Navbar() {
  const [isSun, setIsSun] = React.useState(true);
  const toggleTheme = useThemeToggle();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    if (
      !session &&
      newValue !== "/auth/registracia" &&
      newValue !== "/auth/prihlasenie" &&
      newValue !== "/" &&
      newValue !== "/o-mne"
    ) {
      router.push("/auth/registracia");
    } else {
      router.push(newValue);
    }
  };

  const handleThemeToggle = () => {
    setIsSun((prev) => !prev);
    toggleTheme();
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // ✅ Prevents navigation
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O mne", value: "/o-mne", icon: <AccessibilityIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  const authPaths = [
    { label: "Domov", value: "/prispevok", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
  ];

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation value={pathname} onChange={handleNavigation}>
        {(status === "authenticated" ? authPaths : nonAuthPaths).map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
            sx={{ color: pathname === path.value ? "blue" : "inherit" }}
          />
        ))}

        {/* ✅ Profile Button (Now it ONLY opens popup, doesn't navigate) */}
        {status === "authenticated" && (
          <BottomNavigationAction
            label="Profil"
            icon={
              <Avatar
                alt={session?.user?.name || "User"}
                src={session?.user?.image || undefined}
                sx={{ cursor: "pointer" }}
                onClick={handleProfileClick} // ✅ Opens menu, doesn't navigate
              />
            }
          />
        )}
      </BottomNavigation>

      {/* ✅ Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ transform: "translateY(-10px)" }} // Moves it higher
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/profile"); // ✅ Navigates to profile page when clicked
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            signOut();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Odhlásiť sa" />
        </MenuItem>
      </Menu>

      <IconButton
        onClick={handleThemeToggle}
        sx={{ position: "absolute", bottom: "6px", right: "10px" }}
        color="inherit"
      >
        {isSun ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
      </IconButton>
    </Box>
  );
}
