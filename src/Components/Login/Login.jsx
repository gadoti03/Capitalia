import React, { useState } from 'react';
import './Login.css';

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrore('');

  try {
    console.log("API URL:", apiDbUrl);
    const response = await fetch(`${apiDbUrl}/profili`);
    const data = await response.json();

    console.log("Response data:", data);

    const profili = Array.isArray(data) ? data : data.profili || [];
    console.log("Profili trovati:", profili);

    const utente = profili.find(
      (p) => p.username === username && p.password === password
    );

    if (utente) {
      document.cookie = `username=${utente.username}; path=/; max-age=86400`;
      window.location.href = "/";
    } else {
      setErrore('Username o password errati.');
    }
  } catch (err) {
    console.error('Errore nel login:', err);
    setErrore('Errore nella connessione al server.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errore && <div className="login-error">{errore}</div>}

          <button type="submit" className="login-button">Accedi</button>
        </form>
      </div>
    </div>
  );
}
