import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./src/pages/MainPages/Home";
import Login from "./src/pages/MainPages/Login";
import NotFound from "./src/pages/MainPages/NotFound";
import Dashboard from "./src/pages/MainPages/Dashboard"; // ← NEW
import PublicGraduatesPerformance from "./src/pages/MainPages/PublicGraduatesPerformance";

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        <main className="min-h-screen font-inter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/public/graduates-performance" element={<PublicGraduatesPerformance />} />

            {/* ONE DASHBOARD FOR ALL ROLES */}
            <Route path="/dashboard/*" element={<Dashboard />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    </Theme>
  );
};

export default App;