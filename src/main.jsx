import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { getCssVariableMap } from "./config/theme";

// Push src/config/theme.js values onto :root as CSS custom properties.
// This is what makes theme.js the single source of truth for color —
// change a value there and it's reflected everywhere on next load.
function applyTheme() {
  const vars = getCssVariableMap();
  const root = document.documentElement;
  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}
applyTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
