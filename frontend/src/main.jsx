import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Disable React Developer Tools in production mode
/**if(process.env.NODE_ENV === 'production')*/
if (import.meta.env.PROD) {
  disableReactDevTools();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="*" element={<App />} /> {/* parent route */}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
