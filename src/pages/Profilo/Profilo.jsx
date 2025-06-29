import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profilo.css"; // Assicurati che questo sia il percorso corretto

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

import { getCookie } from './../../utils/cookieUtils';

import FeedbackProfilo from './../../Components/FeedbackProfilo/FeedbackProfilo'

import ServizioProfilo from './../../Components/ServizioProfilo/ServizioProfilo'

// Componente wrapper per passare i hook React (useParams, useNavigate) al componente di classe
function ProfiloWrapper(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <Profilo {...props} params={params} navigate={navigate} />;
}

class Profilo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilo: null,
      servizi: [],
      feedback: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    this.fetchDati();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.params.username !== prevProps.params.username) {
      this.setState({ loading: true, profilo: null, servizi: [], feedback: [] });
      this.fetchDati();
    }
  }

  fetchDati = async () => {
    const { username } = this.props.params;
    const { navigate } = this.props;

    try {
      const resProfili = await fetch(`${apiDbUrl}/profili`);
      if (!resProfili.ok) {
        throw new Error(`HTTP error! status: ${resProfili.status}`);
      }
      const listaProfili = await resProfili.json();
      const trovato = listaProfili.find((p) => p.username === username);

      if (!trovato) {
        navigate("/");
        return;
      }

      this.setState({ profilo: trovato });

      const resServizi = await fetch(`${apiDbUrl}/servizi`);
      if (!resServizi.ok) {
        throw new Error(`HTTP error! status: ${resServizi.status}`);
      }
      const tuttiServizi = await resServizi.json();
      const serviziUtente = tuttiServizi.filter((s) => s.username === username);
      const feedbackUtente = serviziUtente.flatMap((s) => s.feedback || []);

      this.setState({
        servizi: serviziUtente,
        feedback: feedbackUtente,
        loading: false,
      });
    } catch (err) {
      console.error("Errore nel caricamento del profilo:", err);
      this.setState({ error: err, loading: false });
      navigate("/");
    }
  };

  render() {
    const { profilo, servizi, feedback, loading, error } = this.state;

    if (loading) {
      return <div className="profile-status profile-loading">Caricamento in corso...</div>;
    }

    if (error) {
      return <div className="profile-status profile-error">Si è verificato un errore: {error.message}. Riprova più tardi.</div>;
    }

    if (!profilo) {
      return null;
    }

    return (
      <div className="profile-page-wrapper">
        <article className="profile-card">
          {/* Sezione Intestazione con Cover e Info Principali */}
          <header className="profile-header">
            <div className="profile-cover"></div> {/* Immagine di copertina */}
            <div className="profile-info-area">
              <img
                src={profilo.url_immagine_profilo || "/default-avatar.png"}
                className="profile-avatar"
              />
              <div className="profile-main-details">
                <h1 className="profile-name">
                  {getCookie('username') === profilo.username ? 'Ciao ' : ""}                  {profilo.nome} {profilo.cognome}
                </h1>
                <p className="profile-headline">
                  {profilo.username ? '@' : ""}
                  {profilo.username || "Professionista non specificato"}
                </p>
                <p className="profile-bio">
                  {profilo.biografia || "Nessuna biografia disponibile."}
                </p>
              </div>
              <div className="profile-action-buttons">
                <button className="btn btn-primary">Mofifica Profilo</button>
              </div>
            </div>
          </header>

          {/* Sezione Analytics/Statistiche */}
          <section className="profile-analytics">
            <div className="analytics-item">
              <span className="icon-analytics">&#128227;</span> {/* Altoparlante */}
              <div className="analytics-value">{profilo.numero_servizi_pubblicati || 0}</div>
              <div className="analytics-label">Servizi pubblicati</div>
            </div>
            <div className="analytics-item">
              <span className="icon-analytics">&#128465;&#65039;</span> {/* Cestino */}
              <div className="analytics-value">{profilo.numero_servizi_eliminati || 0}</div>
              <div className="analytics-label">Servizi eliminati</div>
            </div>
            <div className="analytics-item">
              <span className="icon-analytics">&#10060;</span> {/* Croce rossa */}
              <div className="analytics-value">{profilo.numero_feedback_eliminati || 0}</div>
              <div className="analytics-label">Feedback eliminati</div>
            </div>
          </section>

          {/* Sezione Contenuto Principale con Colonne */}
          <main className="profile-content-grid">
            {/* Colonna Sinistra: Servizi */}
            <section className="profile-content-column">
              <h2 className="section-title">Servizi offerti</h2>
              {servizi.length > 0 ? (
                <ul className="content-list">
                  {servizi.map((s, i) => (
                    <li key={i} className="list-item">
                      {s.titolo || `Servizio #${i + 1}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">Nessun servizio pubblicato.</p>
              )}
            </section>

            {/* Colonna Destra: Feedback */}
            <section className="profile-content-column">
              <h2 className="section-title">Feedback ricevuti</h2>
              {feedback.length > 0 ? (
                <ul className="content-list">
                  {feedback.map((f, i) => (
                    <li key={i} className="list-item">
                      {f.testo || `Feedback #${i + 1}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">Nessun feedback pubblicato.</p>
              )}
            </section>
          </main>
        </article>
      </div>
    );
  }
}

export default ProfiloWrapper;