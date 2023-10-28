import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthRoute } from "./components/AuthRoute";
import Layout from "./components/Layout";
import "./i18n/config";
import "./index.css";
import AccountView from "./components/AccountView";
import HomeView from "./components/HomeView";
import { AdminPanel } from "./components/AdminPanel";
import App from "./App";

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
            path="/adminPanel"
            element={
              <AuthRoute allowedRoles={["ADMIN"]}>
                <AdminPanel />
              </AuthRoute>
            }
          />
          {/* Define a route for the 404 page */}
          <Route path="*" element={<App />} />

          {/* Use Redirect to send users to the 404 page for unmatched routes */}
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
