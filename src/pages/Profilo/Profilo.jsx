import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profilo.css";

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

import { getCookie, setCookie } from './../../utils/cookieUtils';
import FeedbackProfilo from './../../Components/FeedbackProfilo/FeedbackProfilo';
import Navbar from './../../Components/Navbar/Navbar';
import ServizioProfilo from './../../Components/ServizioProfilo/ServizioProfilo';
import ModificaProfiloBanner from './../../Components/ModificaProfiloBanner/ModificaProfiloBanner';

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
      showModificaBanner: false,
    };
  }

  async componentDidMount() {
    this.fetchDati();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.params.username !== prevProps.params.username) {
      this.setState({
        loading: true,
        profilo: null,
        servizi: [],
        feedback: [],
        showModificaBanner: false
      });
      this.fetchDati();
    }
  }

  fetchDati = async () => {
    const { username } = this.props.params;
    const { navigate } = this.props;

    try {
      const resProfili = await fetch(`${apiDbUrl}/profili`);
      if (!resProfili.ok) throw new Error(`HTTP error! status: ${resProfili.status}`);
      const listaProfili = await resProfili.json();
      const trovato = listaProfili.find((p) => p.username === username);

      if (!trovato) {
        navigate("/");
        return;
      }

      const resServizi = await fetch(`${apiDbUrl}/servizi`);
      if (!resServizi.ok) throw new Error(`HTTP error! status: ${resServizi.status}`);
      const tuttiServizi = await resServizi.json();
      const serviziUtente = tuttiServizi.filter((s) => s.username_proprietario === username);

      let feedbackFiltrati = [];
      tuttiServizi.forEach(servizio => {
        if (servizio.feedback && Array.isArray(servizio.feedback)) {
          servizio.feedback.forEach(singoloFeedback => {
            if (singoloFeedback.username_proprietario === username) {
              let obj = { ...singoloFeedback };
              obj.citta = servizio.capoluogo;
              obj.nome = servizio.nome;
              feedbackFiltrati.push(obj);
            }
          });
        }
      });

      this.setState({
        profilo: trovato,
        servizi: serviziUtente,
        feedback: feedbackFiltrati,
        loading: false,
      });
    } catch (err) {
      console.error("Errore nel caricamento del profilo:", err);
      this.setState({ error: err, loading: false });
      navigate("/");
    }
  };

  handleModificaClick = () => {
    this.setState({ showModificaBanner: true });
  };

  handleCloseBanner = () => {
    this.setState({ showModificaBanner: false });
    this.fetchDati();
  };

  handleSaveChanges = async (updatedData) => {
    const { profilo } = this.state;
    const { navigate } = this.props;

    if (!profilo || !profilo.id) {
      alert("Impossibile aggiornare il profilo: ID non trovato.");
      return;
    }

    try {
      if (!/^[A-Za-zÀ-ÿ]{1,32}$/.test(updatedData.username)) {
        throw new Error(`Errore salvataggio: non rispetta i vincoli di username`);
      }

      const resProfili = await fetch(`${apiDbUrl}/profili`);
      const listaProfili = await resProfili.json();

      for (let i = 0; i < listaProfili.length; i++) {
        if (listaProfili[i].username === updatedData.username && listaProfili[i].id != profilo.id) {
          throw new Error(`Errore salvataggio: username già esistente`);
        }
      }

      const response = await fetch(`${apiDbUrl}/profili/${profilo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Errore sconosciuto' }));
        throw new Error(`Errore salvataggio: ${response.status} - ${errorData.message || response.statusText}`);
      } else {
        setCookie("username", updatedData.username);
      }

      const updatedProfiloFromServer = await response.json();

      this.setState({
        profilo: updatedProfiloFromServer,
        showModificaBanner: false
      });

      if (updatedData.username && updatedData.username !== profilo.username) {
        navigate(`/profilo/${updatedData.username}`);
      }

    } catch (error) {
      alert("Errore durante l'aggiornamento del profilo: " + error.message);
    }
  };

  render() {
    const { profilo, servizi, feedback, loading, error, showModificaBanner } = this.state;
    const cookieUsername = getCookie('username');

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
      <>
        <Navbar backgroundStyle="panna" />
        <div className="profile-page-wrapper">
          <article className="profile-card">
            <header className="profile-header">
              <div className="profile-cover"></div>
              <div className="profile-info-area">
                <img
                  src={profilo.url_immagine_profilo || "/default-avatar.png"}
                  className="profile-avatar"
                />
                <div className="profile-main-details">
                  <h1 className="profile-name">
                    {cookieUsername === profilo.username ? 'Ciao ' : ""}
                    {profilo.nome} {profilo.cognome}
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
                  {cookieUsername === profilo.username ? (
                    <button className="btn btn-primary" onClick={this.handleModificaClick}>
                      Modifica Profilo
                    </button>
                  ) : null}
                </div>
              </div>
            </header>

            <section className="profile-analytics">
              <div className="analytics-item">
                <span className="icon-analytics">&#128227;</span>
                <div className="analytics-value">{servizi.length}</div>
                <div className="analytics-label">Servizi pubblicati</div>
              </div>
              <div className="analytics-item">
                <span className="icon-analytics">&#128465;&#65039;</span>
                <div className="analytics-value">{profilo.numero_servizi_eliminati || 0}</div>
                <div className="analytics-label">Servizi eliminati</div>
              </div>
              <div className="analytics-item">
                <span className="icon-analytics">&#10060;</span>
                <div className="analytics-value">{profilo.numero_feedback_eliminati || 0}</div>
                <div className="analytics-label">Feedback eliminati</div>
              </div>
            </section>

            <main className="profile-content-grid">
              <section className="profile-content-column">
                <h2 className="section-title">Servizi pubblicati</h2>
                {servizi.length > 0 ? (
                  <ul className="content-list">
                    {servizi.map((s, i) => (
                      <li key={s.id || i} className="list-item">
                        <ServizioProfilo
                          nome={s.nome}
                          capoluogo={s.capoluogo}
                          collocazione={s.collocazione}
                          categoria={s.categoria}
                          lista_immagini={s.lista_immagini}
                          username_proprietario={s.username_proprietario}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">Nessun servizio pubblicato.</p>
                )}
              </section>

              <section className="profile-content-column">
                <h2 className="section-title">Feedback pubblicati</h2>
                {feedback.length > 0 ? (
                  <ul className="content-list">
                    {feedback.map((f, i) => (
                      <li key={f.id || i} className="list-item">
                        <FeedbackProfilo
                          proprietario={f.username_proprietario}
                          servizio={f.nome}
                          citta={f.citta}
                          valutazione={f.valutazione}
                          commento={f.commento}
                          data={f.data}
                          ora={f.ora}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">Nessun feedback pubblicato.</p>
                )}
              </section>
            </main>
          </article>

          {showModificaBanner && (
            <ModificaProfiloBanner
              currentProfilo={profilo}
              onClose={this.handleCloseBanner}
              onSave={this.handleSaveChanges}
            />
          )}
        </div>
      </>
    );
  }
}

export default ProfiloWrapper;
