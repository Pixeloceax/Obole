import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import Page404 from "./pages/Page404";
import Cartes from "./pages/Cartes";
import Epargne from "./pages/Epargne";
import Statistic from "./pages/Statistic";
import Message from "./pages/Message";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const allPath = [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/dashboardAdmin",
    "/404",
    //TODO add all path here
  ];

  if (!allPath.includes(window.location.pathname)) {
    window.location.pathname = "/404";
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/dashboardAdmin" element={<Dashboard isLoggedIn />} />
        <Route path="/cartes" element={<Cartes />} />
        <Route path="/epargne" element={<Epargne />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/message" element={<Message />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
