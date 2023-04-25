import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// testing pages
import Clients from "./tests/Clients";
import RetrieveAllDataFromOneID from "./tests/RetrieveAllDataFromOneID";
import LoginTest from "./tests/LoginTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/retrieve" element={<RetrieveAllDataFromOneID />} />
        <Route path="/loginTest" element={<LoginTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
