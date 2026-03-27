import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import { ThemeProviderCustom, ThemeContext } from "./ThemeContext";
import { useContext } from "react";

function ThemedApp() {
  const { mode } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

function Root() {
  return (
    <ThemeProviderCustom>
      <ThemedApp />
    </ThemeProviderCustom>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Root />
);