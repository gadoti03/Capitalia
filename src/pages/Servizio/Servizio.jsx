import React, { useState } from 'react';
import './Servizio.css';

export default function Servizio() {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    collocazione: '',
  });

  const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (allFieldsFilled) {
      console.log('Procedi con i dati:', formData);
      // qui ci andrà la logica per passare allo step successivo
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-wrapper">

        {/* Step 1: Attivo */}
        <div className="wizard-card">
          <div className="step-header">
            <div className="step-circle" />
            <h2 className="step-title">Inserisci il servizio</h2>
          </div>

          <form className="form-fields" onSubmit={(e) => e.preventDefault()}>
            <input
              name="nome"
              type="text"
              placeholder="Nome del Servizio"
              value={formData.nome}
              onChange={handleChange}
              className="form-input"
            />
            <input
              name="categoria"
              type="text"
              placeholder="Categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="form-input"
            />
            <input
              name="collocazione"
              type="text"
              placeholder="Collocazione"
              value={formData.collocazione}
              onChange={handleChange}
              className="form-input"
            />
            <button
              type="submit"
              onClick={handleNext}
              className={`form-button ${allFieldsFilled ? 'enabled' : 'disabled'}`}
              disabled={!allFieldsFilled}
            >
              Next
            </button>
          </form>
        </div>

        {/* Step 2 */}
        <div className="wizard-card disabled-step">
          <div className="step-header">
            <div className="step-circle" />
            <span className="step-title">Inserisci immagini</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="wizard-card disabled-step">
          <div className="step-header">
            <div className="step-circle" />
            <span className="step-title">Inserisci il primo feedback</span>
          </div>
        </div>

      </div>
    </div>
  );
}
