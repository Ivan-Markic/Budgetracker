import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthRoute } from "./components/AuthRoute";
import Layout from "./components/Layout";
import "./i18n/config";
import "./index.css";
import AccountView from "./components/AccountView";
import HomeView from "./components/HomeView";

const Routing = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <AuthRoute allowedRoles={["USER", "ADMIN"]}>
                <HomeView />
              </AuthRoute>
            }
          />
          <Route
            path="/account/:accoundId"
            element={
              <AuthRoute allowedRoles={["USER", "ADMIN"]}>
                <AccountView />
              </AuthRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRoute allowedRoles={["USER", "ADMIN"]}>
                <App />
              </AuthRoute>
            }
          />
          <Route
            path="/adminPanel"
            element={
              <AuthRoute allowedRoles={["ADMIN"]}>
                <App />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

//Use createRoot

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Routing />
    </React.StrictMode>
  );
}

reportWebVitals(console.log);
