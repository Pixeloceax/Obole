import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import Page404 from "./pages/Page404";
import Cartes from "./pages/Cartes";
import Epargne from "./pages/Epargne";
import Statistic from "./pages/Statistic";
import Message from "./pages/Message";

/*
  for comment use this syntax
  ! or //! for problem
  ? or //? for question
  TODO or //TODO for to do
  * or //* for explanation

  Also add list top of the file of number of comment like this:
  TODO: 1
*/


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboardAdmin" element={<Dashboard isLoggedIn />} />{/*//* dasboard view easy to delete after */}
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
