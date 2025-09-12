// filepath: c:\Projekter\Maskinen\src\main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Root from "./Root.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Root />
    </HelmetProvider>
  </React.StrictMode>
);
