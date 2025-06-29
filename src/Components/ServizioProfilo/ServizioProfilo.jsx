import React, { useState } from "react";
import "./ServizioProfilo.css";

export default function ServizioProfilo({
  nome,
  capoluogo,
  collocazione,
  categoria,
  lista_immagini,
  username_proprietario,
}) {
  const [indiceImg, setIndiceImg] = useState(0);

  const nextImage = () => {
    setIndiceImg((prev) => (prev + 1) % lista_immagini.length);
  };

  const prevImage = () => {
    setIndiceImg((prev) =>
      prev === 0 ? lista_immagini.length - 1 : prev - 1
    );
  };

  if (!lista_immagini || lista_immagini.length === 0) {
    return <p>Nessuna immagine disponibile.</p>;
  }

  return (
    <div className="servizio-card">
      <div className="servizio-img-container">
        <button
          className="img-btn"
          onClick={prevImage}
          aria-label="Immagine precedente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="arrow-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img
          src={lista_immagini[indiceImg]}
          alt={`Immagine di ${nome} numero ${indiceImg + 1}`}
          className="servizio-img"
          loading="lazy"
        />
        <button
          className="img-btn"
          onClick={nextImage}
          aria-label="Immagine successiva"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="arrow-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="servizio-info">
        <h1 className="servizio-nome">{nome}</h1>
        <p>
          <strong>Capoluogo:</strong> {capoluogo}
        </p>
        <p>
          <strong>Collocazione:</strong> {collocazione}
        </p>
        <p>
          <strong>Categoria:</strong> {categoria}
        </p>
        <p>
          <strong>Servizio aggiunto da:</strong> {username_proprietario}
        </p>
      </div>
    </div>
  );
}
