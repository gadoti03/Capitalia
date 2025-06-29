// Servizio.jsx
import React, { useState, useEffect } from 'react';
import './Servizio.css';

import Navbar from '../../Components/Navbar/Navbar';

import { getCookie } from './../../utils/cookieUtils';
import { useParams, useNavigate } from 'react-router-dom';

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

const capoluoghiRegione = [
  "Aosta",
  "Torino",
  "Milano",
  "Trento",
  "Venezia",
  "Genova",
  "Bologna",
  "Firenze",
  "Ancona",
  "Campobasso",
  "Roma",
  "L'Aquila",
  "Potenza",
  "Catanzaro",
  "Bari",
  "Cagliari",
  "Palermo",
  "Catania",
  "Perugia",
  "Trieste"
];

function isValidCapoluogo(capoluogo) {
  if (!capoluogo) return false;
  return capoluoghiRegione.some(c => c.toLowerCase() === capoluogo.toLowerCase());
}

export default function Servizio() {
  const navigate = useNavigate();

  const { capoluogo } = useParams();

  // verifico che il capoluogo esiste
  useEffect(() => {
    if (!isValidCapoluogo(capoluogo)) {
      navigate('/');
    }
  }, [capoluogo, navigate]);

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    collocazione: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [commento, setCommento] = useState('');

  const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (allFieldsFilled) {
      setCurrentStep(2);
    }
  };

  async function inviaServizio(servizio) {
    try {
      const response = await fetch(`${apiDbUrl}/servizi`, {
        method: 'POST',
        body: JSON.stringify(servizio),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Errore sconosciuto dal server';
        alert(`Errore: ${errorMessage}`);
        return;
      }

      navigate(`/capoluogo/${capoluogo}`);

    } catch (error) {
      alert(`Errore di rete o imprevisto: ${error.message}`);
    }
  }

  const handleSubmit = async (valutazione, commento, proprietario, nome, categoria, collocazione, capoluogo) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;
    const currentTime = `${hours}:${minutes}`;

    let feedback = [{
      valutazione: valutazione,
      commento: commento,
      data: currentDate,
      ora: currentTime,
      username_proprietario: proprietario,
    }];

    let servizio = {
      nome: nome,
      capoluogo: capoluogo,
      collocazione: collocazione,
      categoria: categoria,
      feedback: feedback,
      lista_immagini: [
        "https://example.com/img1.jpg",
        "https://example.com/img2.jpg"
      ],
      username_proprietario: proprietario,
    };

    console.log('Servizio pronto per invio:', servizio);

    await inviaServizio(servizio);
  };

  const categorie = [
    'Trasporti',
    'Intrattenimento',
    'Ospitalità',
    'Cultura',
    'Ristorazione',
  ];

  const renderStars = () => {
    const stars = [];
    for (let i = 5; i >= 1; i--) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => setRating(i)}
          style={{ cursor: 'pointer', fontSize: '24px', color: i <= rating ? '#ffc107' : '#e4e5e9' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const proprietario = getCookie('username');

  const renderStepContent = (step) => {
    switch (step) {
        case 1:
            return (
            <form className="form-fields" onSubmit={(e) => e.preventDefault()}>
                <input
                name="nome"
                type="text"
                placeholder="Nome del Servizio"
                value={formData.nome}
                onChange={handleChange}
                className="form-input"
                />
                <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="form-input"
                >
                <option value="" disabled hidden>Seleziona Categoria</option>
                {categorie.map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>
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
            );
        case 2:
            return (
            <div className="form-fields">
                <p>Caricamento immagini disabilitato per ora.</p>
                <button
                onClick={() => setCurrentStep(3)}
                className="form-button enabled"
                >
                Avanti
                </button>
            </div>
            );
        case 3:
        const isSubmitEnabled = rating > 0;

        return (
            <div className="form-fields">
            <textarea
                className="form-input"
                placeholder="Scrivi un feedback (opzionale)"
                value={commento}
                onChange={e => setCommento(e.target.value)}
            />
            <div className="star-rating" style={{ display: 'flex', justifyContent: 'center' }}>
                {renderStars()}
            </div>
            <button
                onClick={async () => await handleSubmit(rating, commento, proprietario, formData.nome, formData.categoria, formData.collocazione, capoluogo)}
                className={`form-button ${isSubmitEnabled ? 'enabled' : 'disabled'}`}
                disabled={!isSubmitEnabled}
            >
                Aggiungi Servizio
            </button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar backgroundStyle="panna" />
      <div className="wizard-container">
        <div className="wizard-wrapper">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`wizard-card ${currentStep !== step ? 'collapsed-step' : ''}`}
            >
              <div
                className="step-header"
                onClick={() => {
                  if (step < currentStep) setCurrentStep(step);
                }}
                style={{ cursor: step < currentStep ? 'pointer' : 'default' }}
              >
                <div className="step-circle">{step}</div>
                <h2 className="step-title">
                  {step === 1
                    ? 'Inserisci il servizio'
                    : step === 2
                      ? 'Inserisci immagini'
                      : 'Inserisci il primo feedback'}
                </h2>
              </div>
              {currentStep === step && renderStepContent(step)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
