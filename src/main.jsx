import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuizProvider } from "./contexts/QuizContext";
import AdminProvider from "./contexts/AuthContext";
import { CookiesProvider } from "react-cookie";
import { CivicAuthProvider } from "@civic/auth/react";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CivicAuthProvider clientId="fdb26ff7-d890-4fa2-bedb-773607398045">
    <CookiesProvider>
      <AdminProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </AdminProvider>
    </CookiesProvider>
    </CivicAuthProvider>
  </React.StrictMode>
);
