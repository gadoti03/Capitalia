import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profilo.css";

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

export default function Profilo() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profilo, setProfilo] = useState(null);
  const [servizi, setServizi] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDati = async () => {
      try {
        const resProfili = await fetch(`${apiDbUrl}/profili`);
        const listaProfili = await resProfili.json();
        const trovato = listaProfili.find((p) => p.username === username);

        if (!trovato) {
          navigate("/");
          return;
        }

        setProfilo(trovato);

        const resServizi = await fetch(`${apiDbUrl}/servizi`);
        const tuttiServizi = await resServizi.json();
        const serviziUtente = tuttiServizi.filter(s => s.username === username);
        const feedbackUtente = serviziUtente.flatMap(s => s.feedback || []);

        setServizi(serviziUtente);
        setFeedback(feedbackUtente);
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento del profilo:", err);
        navigate("/");
      }
    };

    fetchDati();
  }, [username, navigate]);

  if (loading) return <div className="profilo-loading">Caricamento in corso...</div>;

  return (
    <div className="profilo-wrapper">
      <div className="profilo-card">
        <div className="profilo-intestazione">
          <img
            src={profilo.url_immagine_profilo || "/default-avatar.png"}
            alt="Immagine Profilo"
            className="profilo-img"
          />
          <div className="profilo-dati">
            <h2 className="profilo-username">@{profilo.username}</h2>
            <p className="profilo-bio">{profilo.biografia || "Nessuna biografia disponibile."}</p>
          </div>
        </div>

        <div className="profilo-statistiche">
          <div className="stat-box"><span>📢</span> <strong>{profilo.numero_servizi_pubblicati}</strong> Servizi pubblicati</div>
          <div className="stat-box"><span>🗑️</span> <strong>{profilo.numero_servizi_eliminati}</strong> Servizi eliminati</div>
          <div className="stat-box"><span>❌</span> <strong>{profilo.numero_feedback_eliminati || 0}</strong> Feedback eliminati</div>
        </div>

        <div className="profilo-section">
          <h3 className="section-title">Servizi pubblicati</h3>
          {servizi.length > 0 ? (
            <ul className="profilo-lista">
              {servizi.map((s, i) => (
                <li key={i} className="profilo-list-item">{s.titolo || `Servizio #${i + 1}`}</li>
              ))}
            </ul>
          ) : (
            <p className="profilo-vuoto">Nessun servizio pubblicato.</p>
          )}
        </div>

        <div className="profilo-section">
          <h3 className="section-title">Feedback pubblicati</h3>
          {feedback.length > 0 ? (
            <ul className="profilo-lista">
              {feedback.map((f, i) => (
                <li key={i} className="profilo-list-item">{f.testo || `Feedback #${i + 1}`}</li>
              ))}
            </ul>
          ) : (
            <p className="profilo-vuoto">Nessun feedback pubblicato.</p>
          )}
        </div>
      </div>
    </div>
  );
}
