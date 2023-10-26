import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { FC } from "react";
import { Router } from "./Router";

const options: ThemeOptions = {
  typography: {
    fontFamily: "Zen Maru Gothic",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#2d596e",
    },
    secondary: {
      main: "#b76060",
    },
    error: {
      main: "#ff1200",
    },
    background: {
      default: "#24333b",
      paper: "#101b25",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: "textPrimary",
      },
    },
    MuiButton: {
      defaultProps: {
        color: "primary",
        variant: "contained",
      },
    },
    MuiStack: {
      defaultProps: {
        gap: 2,
      },
    },
  },
};

const theme = createTheme(options);

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};
