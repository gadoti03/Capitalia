import React from 'react';
import './Login.css';

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">


        <h2 className="login-title">LOGIN</h2>

        <form className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" />
          </div>

          <button type="submit" className="login-button">Accedi</button>
        </form>
      </div>
    </div>
  );
}

