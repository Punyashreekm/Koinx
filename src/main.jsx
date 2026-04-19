import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* AG Grid: Theming API (Quartz + colorSchemeDarkBlue) — do not import legacy ag-grid.css / ag-theme-*.css */
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
