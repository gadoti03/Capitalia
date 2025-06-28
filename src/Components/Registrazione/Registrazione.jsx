import React, { useState } from "react";
import "./Registrazione.css"; 

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

export default function Registrazione({ setActiveTab }) {
  const [formData, setFormData] = useState({
    username: '',
    nome: '',
    cognome: '',
    email: '',
    password: ''
  });

  const [errore, setErrore] = useState('');
  const [successo, setSuccesso] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrore('');
    setSuccesso('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore('');
    setSuccesso('');

    try {
      // Controllo se username già esiste
      const res = await fetch(`${apiDbUrl}/profili?username=${formData.username}`);
      const userExists = await res.json();
      if (userExists.length > 0) {
        setErrore("Username già esistente!");
        return;
      }

      // Controllo se email già registrata
      const resEmail = await fetch(`${apiDbUrl}/profili?email=${formData.email}`);
      const emailExists = await resEmail.json();
      if (emailExists.length > 0) {
        setErrore("Email già registrata!");
        return;
      }

      // Aggiunta utente
      const response = await fetch(`${apiDbUrl}/profili`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          numero_servizi_pubblicati: 0,
          numero_servizi_eliminati: 0,
          url_immagine_profilo: "",
          biografia: ""
        })
      });

      if (response.ok) {
        setSuccesso("Registrazione completata!");
        setTimeout(() => setActiveTab("login"), 1500); // Passa al login dopo 1.5s
      } else {
        setErrore("Errore durante la registrazione.");
      }

    } catch (error) {
      console.error("Errore:", error);
      setErrore("Errore nella connessione al server.");
    }
  };

  return (
    <>
      <h2 className="signup-title">REGISTRAZIONE</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            maxLength="32"
            pattern="^[a-zA-Z]{1,32}$"
            title="Solo lettere maiuscole e minuscole, massimo 32 caratteri"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              maxLength="32"
              title="Massimo 32 caratteri"
            />
          </div>
          <div className="form-group">
            <label>Cognome</label>
            <input
              type="text"
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              required
              maxLength="32"
              title="Massimo 32 caratteri"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength="32"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
            title="Inserisci un'email valida (max 32 caratteri)"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="32"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$"
            title="Almeno 8 caratteri, con almeno una maiuscola, una minuscola e un numero. Max 32 caratteri"
          />
        </div>

        {errore && <div className="signup-error">{errore}</div>}
        {successo && <div className="signup-success">{successo}</div>}

        <button type="submit" className="signup-button">Registrati</button>
      </form>
    </>
  );
}
