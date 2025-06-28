import React from "react";
import "./Registrazione.css";

export default function Registrazione() {
  return (
    <>
      <h2 className="signup-title">REGISTRAZIONE</h2>

      <form className="signup-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            required
            maxLength="32"
            pattern="^[a-zA-Z]{1,32}$"
            title="Solo lettere maiuscole e minuscole, massimo 32 caratteri"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" required maxLength="32" title="Massimo 32 caratteri" />
          </div>
          <div className="form-group">
            <label>Cognome</label>
            <input type="text" required maxLength="32" title="Massimo 32 caratteri" />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            maxLength="32"
            pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$"
            title="Inserisci un'email valida (max 32 caratteri)"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            minLength="8"
            maxLength="32"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,32}$"
            title="Almeno 8 caratteri, con almeno una maiuscola, una minuscola e un numero. Max 32 caratteri"
          />
        </div>

        <button type="submit" className="signup-button">Registrati</button>
      </form>
    </>
  );
}
