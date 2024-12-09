// "use client";

// import React, { useContext } from "react";
// import { IconButton, Tooltip } from "@mui/material";
// import LoginIcon from "@mui/icons-material/Login";
// import { ThemeContext } from "../context/ThemeContext";

// const ThemeToggleButton = () => {
//   const themeContext = useContext(ThemeContext);

//   if (!themeContext) {
//     throw new Error("ThemeToggleButton must be used within a ThemeProvider");
//   }

//   const { isDarkMode, toggleTheme } = themeContext;

//   return (
//     <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
//       <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
//         <LoginIcon />
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default ThemeToggleButton;


"use client";

import React, { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode"; // Light mode icon
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Dark mode icon
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggleButton = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeToggleButton must be used within a ThemeProvider");
  }

  const { isDarkMode, toggleTheme } = themeContext;

  return (
    <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />} {/* Toggle between icons */}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;