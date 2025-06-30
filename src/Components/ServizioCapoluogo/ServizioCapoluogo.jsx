import React, { useState } from "react";
import "./ServizioCapoluogo.css";

import FeedbackServizioCapoluogo from "./../FeedbackServizioCapoluogo/FeedbackServizioCapoluogo"

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
  onPubblicaFeedback,
}) {
  const [indiceImg, setIndiceImg] = useState(0);
  const [mostraFeedback, setMostraFeedback] = useState(false);

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

  if (!lista_immagini || lista_immagini.length === 0) {
    return <p className="sc-no-img">Nessuna immagine disponibile.</p>;
  }

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
          <button
            className="sc-icon-btn"
            onClick={toggleFeedback}
            aria-label="Visualizza feedback"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="sc-feedback-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-6l-4 4v-4H7a2 2 0 01-2-2v-2" />
            </svg>
          </button>

          <button
            className="sc-icon-btn"
            onClick={onPubblicaFeedback}
            aria-label="Pubblica feedback"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="sc-feedback-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        </div>
      </div>

      {mostraFeedback && (
        <div className="sc-feedback-banner">
          <div className="sc-feedback-list">
            {lista_feedback.length > 0 ? (
              lista_feedback.map((feedback, idx) => (
                <div key={idx} className="sc-feedback-item">
                  <FeedbackServizioCapoluogo
                    key={idx}
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
    </div>
  );
}
