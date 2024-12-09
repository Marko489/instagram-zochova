



"use client";

import * as React from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation'; // useRouter is for routing, but usePathname is better for path name
import { useSession } from "next-auth/react";
import { useTheme } from '@mui/material/styles'; // To access the theme
import { usePathname } from 'next/navigation'; // Use usePathname instead of asPath

import ThemeToggleButton from './ThemeToggleButton'; // Import the theme toggle button

export default function Navbar() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  const { data: session, status } = useSession();
  const theme = useTheme(); // Get the current theme
  const currentPath = usePathname(); // Get the current page URL using usePathname

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  // Non-authenticated navigation paths
  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Podmienky", value: "/podmienky", icon: <AddCircleIcon /> },
    { label: "GDPR", value: "/gdpr", icon: <HomeIcon /> },
    { label: "O-nas", value: "/o-nas", icon: <HomeIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> }
  ];

  // Authenticated navigation paths
  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <AddCircleIcon /> },
    { label: "Prispevok", value: "/prispevok", icon: <AddCircleIcon /> },
    { label: "Notifikacie", value: "/notifikacie", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "/profile",
      icon: session?.user?.image ? (
        <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined} />
      ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      )
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  // Decide which paths to use based on authentication status
  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        sx={{ flexGrow: 1 }}
      >
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
            sx={{
              color: currentPath === path.value
                ? theme.palette.secondary.main  // Active icon color based on theme
                : 'inherit',  // Default color when not active
              '&.Mui-selected': {
                color: currentPath === path.value
                  ? theme.palette.secondary.main // Active color if the page is active
                  : 'inherit',
              },
            }}
          />
        ))}
      </BottomNavigation>

      {/* Theme Toggle Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
        <ThemeToggleButton /> {/* Place the theme toggle button here */}
      </Box>
    </Box>
  );
}