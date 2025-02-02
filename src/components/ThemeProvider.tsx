"use client";


import React, { useState, createContext, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../configs/theme"; // Import themes from config

const ThemeToggleContext = createContext<() => void>(() => {});
export const useThemeToggle = () => useContext(ThemeToggleContext);

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline /> {/* Ensures the global styles respect the theme */}
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProviderWrapper;
