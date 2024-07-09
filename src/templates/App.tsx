import { Outlet } from "react-router-dom";
import "./App.css";

import {
  Box,
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
  ThemeOptions,
} from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ConfigurationContext from "../context/ConfigContext";
import { Config, ConfigContext, defaultConfig } from "../model/config";
import { useState } from "react";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#37474f",
    },
    error: {
      main: "#b71c1c",
    },
    warning: {
      main: "#f4511e",
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const value = { config, setConfig } as ConfigContext;

  return (
    <ThemeProvider theme={theme}>
      <ConfigurationContext.Provider value={value}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CssBaseline />
          <Header />
          <Container
            component="main"
            sx={{ mt: 3, pb: "3.5em", mb: 2, overflow: "auto" }}
            maxWidth="xl"
          >
            <Outlet />
          </Container>
          <Footer />
        </Box>
      </ConfigurationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
