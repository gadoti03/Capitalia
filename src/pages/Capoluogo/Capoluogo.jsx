import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Capoluogo.css';

import Navbar from './../../Components/Navbar/Navbar';
import ClassificaLocale from './../../Components/ClassificaLocale/ClassificaLocale';
import ServizioProfilo from './../../Components/ServizioProfilo/ServizioProfilo';

const categorie = ['Cultura', 'Ristorazione', 'Ospitalità', 'Trasporto', 'Intrattenimento'];

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

export default function Capoluogo() {
  const { citta } = useParams();

  const navigate = useNavigate();

  // verifico che il capoluogo esiste
  useEffect(() => {
    if (!isValidCapoluogo(citta)) {
      navigate('/');
    }
  }, [citta, navigate]);
  
  const [categoriaSelezionata, setCategoriaSelezionata] = useState('Cultura');

  const getUsernameFromCookies = () => {
    const match = document.cookie.match(/(?:^|;\s*)username=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const username = getUsernameFromCookies();

  const handleInserisciServizio = () => {
    navigate(`/servizio/${citta}`);
  };

  return (
    <>
      <Navbar backgroundStyle="panna" />

      <div className="page-container">
        <section className="capoluogo-header">
          <h1 className="capoluogo-title">{citta}</h1>

          {username && (
            <button className="btn-inserisci-servizio" onClick={handleInserisciServizio}>
              INSERISCI UN SERVIZIO
            </button>
          )}
        </section>

        <main className="capoluogo-main">
          {/* Colonna servizi con filtro */}
          <section className="servizi-list-container">
            <nav className="categorie-filter">
              {categorie.map((cat) => (
                <button
                  key={cat}
                  className={`categorie-filter-btn ${
                    categoriaSelezionata === cat ? 'categorie-filter-btn--active' : 'categorie-filter-btn--inactive'
                  }`}
                  onClick={() => setCategoriaSelezionata(cat)}
                  aria-pressed={categoriaSelezionata === cat}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <h2 className="servizi-list-title">LISTA DEI SERVIZI</h2>
            <ServizioProfilo capoluogo={citta} categoria={categoriaSelezionata} />
          </section>

          {/* Colonna classifica */}
          <aside className="classifica-locale-container">
            <ClassificaLocale capoluogo={citta} categoriaSelezionata={categoriaSelezionata} />
          </aside>
        </main>
      </div>
    </>
  );
}
