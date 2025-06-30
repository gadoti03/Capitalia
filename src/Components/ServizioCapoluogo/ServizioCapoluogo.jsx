import React, { useState } from "react";
import "./ServizioCapoluogo.css";
import FeedbackServizioCapoluogo from "../FeedbackServizioCapoluogo/FeedbackServizioCapoluogo";
import { getCookie } from "../../utils/cookieUtils";

export default function ServizioCapoluogo({
  id,
  nome,
  capoluogo,
  collocazione,
  categoria,
  lista_immagini,
  lista_feedback = [],
  username_proprietario,
  onVisualizzaFeedback,
}) {
  const [indiceImg, setIndiceImg] = useState(0);
  const [mostraFeedback, setMostraFeedback] = useState(false);
  const [scriviFeedback, setScriviFeedback] = useState(false);
  const [testoFeedback, setTestoFeedback] = useState("");
  const [valutazione, setValutazione] = useState(0);
  const [hoverVal, setHoverVal] = useState(null);

  const nextImage = () => {
    setIndiceImg((prev) => (prev + 1) % lista_immagini.length);
  };

  const prevImage = () => {
    setIndiceImg((prev) => (prev === 0 ? lista_immagini.length - 1 : prev - 1));
  };

  const toggleFeedback = () => {
    setMostraFeedback((prev) => !prev);
    onVisualizzaFeedback?.();
  };

  const toggleScriviFeedback = () => {
    setScriviFeedback((prev) => !prev);
  };

  async function onPubblicaFeedback(idServizio, nuovaValutazione, nuovoCommento, username) {
    const apiDbUrl = import.meta.env.VITE_API_DB_URL;

    try {
      // Prendo il servizio dal DB
      const resGet = await fetch(`${apiDbUrl}/servizi/${idServizio}`);
      if (!resGet.ok) throw new Error(`Errore nel GET servizio: ${resGet.status}`);

      const servizio = await resGet.json();

      // Creo il nuovo feedback con data e ora correnti
      const now = new Date();
      const nuovoFeedback = {
        valutazione: nuovaValutazione,
        commento: nuovoCommento,
        data: now.toISOString().slice(0, 10), // YYYY-MM-DD
        ora: now.toTimeString().slice(0, 5),  // HH:mm
        username_proprietario: username
      };

      // Aggiungo il feedback alla lista esistente (assumo campo "feedback")
      const updatedFeedback = [...(servizio.feedback || []), nuovoFeedback];

      // Creo oggetto aggiornato
      const servizioAggiornato = {
        ...servizio,
        feedback: updatedFeedback
      };

      // PUT per aggiornare il servizio
      const resPut = await fetch(`${apiDbUrl}/servizi/${idServizio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servizioAggiornato)
      });

      if (!resPut.ok) throw new Error(`Errore nel PUT servizio: ${resPut.status}`);

      // Feedback inviato con successo
      console.log('Feedback pubblicato con successo');
      return true;

    } catch (error) {
      console.error('Errore durante pubblicazione feedback:', error);
      return false;
    }
  }

  const handleInvia = async () => {
    if (!testoFeedback.trim()) {
      alert("Inserisci un commento!");
      return;
    }
    if (valutazione === 0) {
      alert("Seleziona un numero di stelle!");
      return;
    }

    try {
      const username = getCookie("username");
      if (!username) {
        alert("Devi essere loggato per inviare feedback");
        return;
      }

      const success = await onPubblicaFeedback(
        id,
        valutazione,
        testoFeedback.trim(),
        username
      );

      if (success) {
        setTestoFeedback("");
        setValutazione(0);
        setScriviFeedback(false);
        onVisualizzaFeedback?.(); // se vuoi aggiornare la lista feedback
      } else {
        alert("Errore durante la pubblicazione del feedback.");
      }
    } catch (error) {
      alert("Errore imprevisto: " + error.message);
    }
  };

  return (
    <div className="sc-card">
      <div className="sc-carousel">
        <button className="sc-img-btn sc-prev" onClick={prevImage} aria-label="Immagine precedente">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="sc-arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <img
          src={lista_immagini[indiceImg]}
          alt={`Immagine di ${nome} numero ${indiceImg + 1}`}
          className="sc-img"
          loading="lazy"
        />

        <button className="sc-img-btn sc-next" onClick={nextImage} aria-label="Immagine successiva">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="sc-arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="sc-info-row">
        <div className="sc-info-left">
          <h2 className="sc-nome">{nome}</h2>
          <p><strong>Capoluogo:</strong> {capoluogo}</p>
          <p><strong>Collocazione:</strong> {collocazione}</p>
        </div>

        <div className="sc-info-right">
          <button className="sc-icon-btn" onClick={toggleFeedback} aria-label="Visualizza feedback">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="sc-feedback-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-6l-4 4v-4H7a2 2 0 01-2-2v-2" />
            </svg>
          </button>

          {getCookie("username") !== null && (
            <button className="sc-icon-btn" onClick={toggleScriviFeedback} aria-label="Scrivi feedback">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="sc-feedback-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {mostraFeedback && (
        <div className="sc-feedback-banner">
          <div className="sc-feedback-list">
            {lista_feedback.length > 0 ? (
              lista_feedback.map((feedback, idx) => (
                <div key={idx} className="sc-feedback-item">
                  <FeedbackServizioCapoluogo
                    valutazione={feedback.valutazione}
                    commento={feedback.commento}
                    username_proprietario={feedback.username_proprietario}
                    data={feedback.data}
                    ora={feedback.ora}
                  />
                </div>
              ))
            ) : (
              <p>Nessun feedback disponibile.</p>
            )}
          </div>
        </div>
      )}

      {scriviFeedback && (
        <div className="sc-feedback-form">
          <div className="sc-stars-input">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`sc-star ${n <= (hoverVal ?? valutazione) ? "filled" : ""}`}
                onMouseEnter={() => setHoverVal(n)}
                onMouseLeave={() => setHoverVal(null)}
                onClick={() => setValutazione(n)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            className="sc-textarea"
            value={testoFeedback}
            onChange={(e) => setTestoFeedback(e.target.value)}
            placeholder="Scrivi il tuo feedback qui..."
            rows={3}
          />
          <button className="sc-submit-btn" onClick={handleInvia}>Invia</button>
        </div>
      )}
    </div>
  );
}
