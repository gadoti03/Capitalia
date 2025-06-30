import React from "react";
import "./FeedbackServizioCapoluogo.css";

export default function FeedbackServizioCapoluogo({
  valutazione,
  commento,
  username_proprietario,
  data,
  ora,
}) {
  return (
    <div className="fsc-container">
      <div className="fsc-header">
        <span className="fsc-username"><a href={`/profilo/${username_proprietario}`} className="fsc-username">@{username_proprietario}</a></span>
        <span className="fsc-rating">{"★".repeat(valutazione)}{"☆".repeat(5 - valutazione)}</span>
      </div>

      <p className="fsc-comment">"{commento}"</p>

      <div className="fsc-footer">
        <span>{data}</span>
        <span>alle {ora}</span>
      </div>
    </div>
  );
}
