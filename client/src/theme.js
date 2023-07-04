import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      sm_1: 800,
      md: 900,
      md_1: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#EA7C69",
      light: "#e98f7f",
      dark: "#e45941",
    },
    secondary: {
      main: "#9288e0",
    },
    background: {
      default: "#252836",
      paper: "#1F1D2B",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
  },
  typography: {
    fontFamily: "Raleway",
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: " #fff",
        },
      },
    },
  },
});
