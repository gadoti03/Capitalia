import React, { useState, useEffect } from "react";
import "./Autenticazione.css";

import Registrazione from "../../Components/Registrazione/Registrazione";
import Login from "../../Components/Login/Login";

import { useLocation } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  
  // Inizializza activeTab in base allo state ricevuto
  const [activeTab, setActiveTab] = useState("signup");

  useEffect(() => {
    if (location.state?.activeTab === "login" || location.state?.activeTab === "signup") {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="signup-container">
      <div className="signup-box">

        <div className="signup-tabs">
          <button
            className={`signup-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign up
          </button>
          <button
            className={`signup-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Log in
          </button>
        </div>

        <div className="signup-logo">
          <img src="/src/assets/logo_no_sfondo.png" alt="Logo Capitalia" />
        </div>

        {/* Render dinamico del contenuto */}
        {activeTab === "signup" ? (
          <Registrazione setActiveTab={setActiveTab} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
