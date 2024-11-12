import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true, //Enabled `v7_relativeSplatPath` to prepare for updated splat route matching in v7
          v7_startTransition: true, // Enabled `v7_startTransition` to improve route transition performance
        }}
      >
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
