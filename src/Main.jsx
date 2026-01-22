import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Index.css";
import App from "./App.jsx";
// font awesome
import "@fortawesome/fontawesome-free/css/all.min.css";
// google
import { GoogleOAuthProvider } from "@react-oauth/google";
// context
import { AuthContextProvider } from "./Context/AuthContext";
import { ThemeContextProvider } from "./Context/ThemeContext";
// query client
import { queryClient } from "./Lib/QueryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Query Client  */}
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        {/* Context */}
        <AuthContextProvider>
          {/* Google Auth */}
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            {/* App */}
            <App />
          </GoogleOAuthProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
