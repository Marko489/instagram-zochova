"use client"; // Add this line

import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox'; // Post icon
import LoginIcon from '@mui/icons-material/Login'; // Login icon
import HowToRegIcon from '@mui/icons-material/HowToReg'; // Registration icon
import { useRouter } from 'next/navigation';

export default function BottomNavBar() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/home');
        break;
      case 1:
        router.push('/profile');
        break;
      case 2:
        router.push('/post'); // Update this path to your post creation page
        break;
      case 3:
        router.push('/login'); // Update this path to your login page
        break;
      case 4:
        router.push('/registration'); // Update this path to your registration page
        break;
      default:
        break;
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Post" icon={<AddBoxIcon />} />
        <BottomNavigationAction label="Login" icon={<LoginIcon />} />
        <BottomNavigationAction label="Registration" icon={<HowToRegIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
