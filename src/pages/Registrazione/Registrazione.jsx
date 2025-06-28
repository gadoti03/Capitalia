import React, { useEffect, useState } from 'react';

import React from "react";
import './Registrazione.css';

export default function Registrazione() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-tabs">
          <button className="signup-tab active">Sign up</button>
          <button className="signup-tab">Log in</button>
        </div>

        <div className="signup-logo">
          <img src="/logo_capitalia.png" alt="Logo Capitalia" />
        </div>

        <h2 className="signup-title">REGISTRAZIONE</h2>

        <form className="signup-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Cognome</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" />
          </div>

          <button type="submit" className="signup-button">Registrati</button>
        </form>
      </div>
    </div>
  );
}
