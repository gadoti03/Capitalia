import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">


        <h2 className="login-title">LOGIN</h2>

        <form className="login-form">
          <div className="form-group">
            <label>Username o Email</label>
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

