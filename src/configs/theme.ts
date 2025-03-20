import { createTheme } from "@mui/material";


declare module "@mui/material/styles" {
  interface Palette {
    addImage: Palette["primary"];
  }
  interface PaletteOptions {
    addImage?: PaletteOptions["primary"];
  }

  
}
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue for light mode
    },
    secondary: {
      main: "#ff4081",
    },







    addImage: {
      main: "#ff4081", // Pink
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d32f2f", // Red for dark mode
    },
    secondary: {
      main: "#ff4081",
    },
    addImage: {
      main: "#9c27b0", // Purple
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});
