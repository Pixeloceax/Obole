import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import Page404 from "./pages/Page404";
import Cartes from "./pages/Cartes";
import Epargne from "./pages/Epargne";
import Statistic from "./pages/Statistic";
import Message from "./pages/Message";
import TransactionForm from "./components/Transactions";
import Payment from "./pages/Payment";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode(token);
        if (!isTokenExpired(token)) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  setTimeout(() => {
    window.location.reload();
  }, 5 * 60 * 1000);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
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

        <Route
          path="/dashboard/transaction"
          element={checkAuth() ? <TransactionForm /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/cartes"
          element={checkAuth() ? <Cartes /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/epargne"
          element={checkAuth() ? <Epargne /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/statistic"
          element={checkAuth() ? <Statistic /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/message"
          element={checkAuth() ? <Message /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/transaction"
          element={checkAuth() ? <TransactionForm /> : <Navigate to="/login" />}
        />

        <Route path="/payment" element={<Payment />} />

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
