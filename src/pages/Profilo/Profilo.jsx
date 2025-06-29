import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profilo.css"; // Assicurati che questo sia il percorso corretto

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

import { getCookie, setCookie } from './../../utils/cookieUtils';

import FeedbackProfilo from './../../Components/FeedbackProfilo/FeedbackProfilo'
import Navbar from './../../Components/Navbar/Navbar';

import ServizioProfilo from './../../Components/ServizioProfilo/ServizioProfilo'

import ModificaProfiloBanner from './../../Components/ModificaProfiloBanner/ModificaProfiloBanner'; // Import del nuovo componente

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
      showModificaBanner: false, // <-- NUOVO STATO: per controllare la visibilità del banner
    };
  }

  async componentDidMount() {
    this.fetchDati();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.params.username !== prevProps.params.username) {
      // Quando cambia l'username nella URL, resetta lo stato e ricarica i dati
      this.setState({
        loading: true,
        profilo: null,
        servizi: [],
        feedback: [],
        showModificaBanner: false // <-- Reset anche del banner se si cambia profilo
      });
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
        navigate("/"); // Se il profilo non esiste, reindirizza alla home
        return;
      }

      this.setState({ profilo: trovato });

      const resServizi = await fetch(`${apiDbUrl}/servizi`);
      if (!resServizi.ok) {
        throw new Error(`HTTP error! status: ${resServizi.status}`);
      }
      const tuttiServizi = await resServizi.json();

      // Ottengo tutti i servizi di {username}
      const serviziUtente = tuttiServizi.filter((s) => s.username_proprietario === username);
      
      // Ottengo tutti i feedback con username_proprietario === {username}
      let feedbackFiltrati = [];
      tuttiServizi.forEach(servizio => {
        if (servizio.feedback && Array.isArray(servizio.feedback) && servizio.feedback.length > 0) {
          servizio.feedback.forEach(singoloFeedback => {
            if (singoloFeedback.username_proprietario === username) {
              // Aggiungi le informazioni del servizio al feedback prima di aggiungerlo
              let obj = { ...singoloFeedback }; // Clona l'oggetto per non modificarlo direttamente
              obj.citta = servizio.capoluogo;
              obj.nome = servizio.nome; // Nome del servizio
              feedbackFiltrati.push(obj);
            }
          });
        }
      });

      this.setState({
        servizi: serviziUtente,
        feedback: feedbackFiltrati,
        loading: false,
      });
    } catch (err) {
      console.error("Errore nel caricamento del profilo:", err);
      this.setState({ error: err, loading: false });
      navigate("/"); // In caso di errore, reindirizza alla home
    }
  };

  // <-- NUOVE FUNZIONI PER IL BANNER DI MODIFICA PROFILO -->

  // Funzione per mostrare il banner di modifica
  handleModificaClick = () => {
    this.setState({ showModificaBanner: true });
  };

  // Funzione per chiudere il banner di modifica
  handleCloseBanner = () => {
    this.setState({ showModificaBanner: false });
    // Dopo aver chiuso il banner, ricarica i dati per visualizzare le modifiche (se ce ne sono state)
    this.fetchDati();
  };

  // Funzione per gestire il salvataggio delle modifiche dal banner
  handleSaveChanges = async (updatedData) => {    
    const { profilo } = this.state; // updated
    const { navigate } = this.props;

    console.log(updatedData)

    if (!profilo || !profilo.id) {
      console.error("ID del profilo non disponibile per l'aggiornamento.");
      alert("Impossibile aggiornare il profilo: ID non trovato.");
      return;
    }
    

    try {
      // Verifica se posso cambiare username
      const resProfili = await fetch(`${apiDbUrl}/profili`);
      const listaProfili = await resProfili.json();

      // Verifico che l'username non esista già
      for (let i = 0; i < listaProfili.length; i++) {
        console.log(listaProfili[i].username, profilo.username, listaProfili[i].id, profilo.id)
        if (listaProfili[i].username === updatedData.username && listaProfili[i].id != profilo.id){
          console.log("ahahahhahahahhahahhaha")
          throw new Error(`Errore salvataggio: username già esistente`);
        }
      }

      // Effettua la chiamata PATCH al tuo backend per aggiornare il profilo
      const response = await fetch(`${apiDbUrl}/profili/${profilo.id}`, {
        method: 'PATCH', // PATCH è più appropriato per aggiornamenti parziali
        headers: {
          'Content-Type': 'application/json',
          // Aggiungi qui eventuali header di autenticazione, es. 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        // Se la risposta non è OK, tenta di leggere il messaggio di errore dal backend
        const errorData = await response.json().catch(() => ({ message: 'Errore sconosciuto' }));
        throw new Error(`Errore salvataggio: ${response.status} - ${errorData.message || response.statusText}`);
      } else {
        // Se cambio username cambia cookie
        console.log("setto username")
        setCookie("username", updatedData.username)
      }

      const updatedProfiloFromServer = await response.json();
      
      // Aggiorna lo stato locale del profilo con i dati freschi dal server
      // e chiudi il banner
      this.setState({
        profilo: updatedProfiloFromServer,
        showModificaBanner: false
      });

      // Se l'username è stato modificato, potresti voler aggiornare il cookie o reindirizzare
      // Questo dipende dalla tua logica di autenticazione e gestione degli username.
      // Ad esempio, se l'username è parte della URL:
      if (updatedData.username && updatedData.username !== profilo.username) {
          // Opzionale: aggiorna il cookie username se è legato all'utente loggato
          // document.cookie = `username=${updatedData.username}; path=/; max-age=86400`;
          navigate(`/profilo/${updatedData.username}`); // Reindirizza al nuovo URL del profilo
      }

    } catch (error) {
      console.error("Errore durante il salvataggio del profilo:", error);
      alert("Errore durante l'aggiornamento del profilo: " + error.message);
    }
  };

  // <-- FINE NUOVE FUNZIONI -->

  render() {
    const { profilo, servizi, feedback, loading, error, showModificaBanner } = this.state; // Destruttura showModificaBanner
    const cookieUsername = getCookie('username'); // Recupera l'username dal cookie

    if (loading) {
      return <div className="profile-status profile-loading">Caricamento in corso...</div>;
    }

    if (error) {
      return <div className="profile-status profile-error">Si è verificato un errore: {error.message}. Riprova più tardi.</div>;
    }

    if (!profilo) {
      return null; // O un messaggio di "profilo non trovato" se preferisci
    }

    return (
      <><Navbar backgroundStyle="panna"/> 
      
      <div className="profile-page-wrapper">
        <article className="profile-card">
          {/* Sezione Intestazione con Cover e Info Principali */}
          <header className="profile-header">
            <div className="profile-cover"></div> {/* Immagine di copertina */}
            <div className="profile-info-area">
              {/* Ho rimosso l'alt testuale per l'immagine del profilo in conformità con le istruzioni fornite. */}
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
                {/* Modificato il pulsante per chiamare handleModificaClick */}
                {cookieUsername === profilo.username ? (
                  <button className="btn btn-primary" onClick={this.handleModificaClick}>
                    Modifica Profilo
                  </button>
                ) : null}
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
              <h2 className="section-title">Servizi pubblicati</h2>
              {servizi.length > 0 ? (
                <ul className="content-list">
                  {servizi.map((s, i) => (
                    // È preferibile usare un ID univoco per la key se disponibile, altrimenti l'indice
                    <li key={s.id || i} className="list-item">
                      <ServizioProfilo 
                        nome = {s.nome}
                        capoluogo = {s.capoluogo}
                        collocazione = {s.collocazione}
                        categoria = {s.categoria}
                        lista_immagini = {s.lista_immagini}
                        username_proprietario = {s.username_proprietario}
                      />
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
                    // È preferibile usare un ID univoco per la key se disponibile, altrimenti l'indice
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

        {/* <-- NUOVO: Rendering condizionale del banner di modifica --> */}
        {showModificaBanner && (
          <ModificaProfiloBanner
            currentProfilo={profilo} // Passa l'intero oggetto profilo attuale al banner
            onClose={this.handleCloseBanner} // Funzione per chiudere il banner (passata come prop)
            onSave={this.handleSaveChanges}   // Funzione per salvare le modifiche (passata come prop)
          />
        )}
      </div>
      </>
    );
    
  }
}

export default ProfiloWrapper;