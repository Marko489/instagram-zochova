// import { createTheme } from "@mui/material/styles";

// export const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     background: {
//       default: "#ffffff",
//       paper: "#f5f5f5",
//     },
//     text: {
//       primary: "#000000",
//     },
//   },
// });

// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: {
//       default: "#121212",
//       paper: "#1d1d1d",
//     },
//     text: {
//       primary: "#ffffff",
//     },
//   },
// });



import { createTheme } from "@mui/material/styles";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#ff1744", // Blue color for primary
    },
    secondary: {
      main: "#ff1744", // Dark red for light mode (active icon color)
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#ff8a80", // Blue color for primary
    },
    secondary: {
      main: "#ff8a80", // Light red for dark mode (active icon color)
    },
  },
});