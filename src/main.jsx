import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuizProvider } from "./contexts/QuizContext";
import AdminProvider from "./contexts/AuthContext";
import { CookiesProvider } from "react-cookie";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AdminProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </AdminProvider>
    </CookiesProvider>
  </React.StrictMode>
);
