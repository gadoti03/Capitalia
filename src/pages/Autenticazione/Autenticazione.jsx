import React, { useState } from "react";
import "./Autenticazione.css"; // Stile comune

import Registrazione from "../../Components/Registrazione/Registrazione";
import Login from "../../Components/Login/Login";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup");

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
        {activeTab === "signup" ? <Registrazione /> : <Login />}
      </div>
    </div>
  );
}
