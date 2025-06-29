import React from "react";
import "./FeedbackProfilo.css";

export default function Feedback({ proprietario, servizio, citta, valutazione, commento, data, ora }) {
  const stellePiene = Math.min(Math.max(valutazione, 1), 5);

  return (
    <div className="feedback-container">
      <div className="feedback-service-city">
        <span className="feedback-service">{servizio}</span>
        {citta && <span className="feedback-city">{citta}</span>}
      </div>

      <div className="feedback-header">
        <span className="feedback-owner">{proprietario}</span>
        <div className="feedback-stars" aria-label={`Valutazione: ${stellePiene} stelle`}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`star ${i < stellePiene ? "filled" : ""}`}
              role="img"
              aria-hidden="true"
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="feedback-comment">“{commento}”</p>

      <div className="feedback-datetime">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-calendar"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <time dateTime={`${data}T${ora}`}>
          {data} • {ora}
        </time>
      </div>
    </div>
  );
}
