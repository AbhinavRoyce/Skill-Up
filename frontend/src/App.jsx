import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import { setAuthToken } from "./api.js";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("skillup_token");
    const userStr = localStorage.getItem("skillup_user");

    if (token && userStr) {
      setAuthToken(token);
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("skillup_user", JSON.stringify(userData));
    setAuthToken(token);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("skillup_user");
    localStorage.removeItem("skillup_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home user={user} />} />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Register />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}
