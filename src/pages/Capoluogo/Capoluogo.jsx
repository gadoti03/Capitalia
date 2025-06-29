import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Capoluogo.css';

import Navbar from './../../Components/Navbar/Navbar';
import ClassificaLocale from './../../Components/ClassificaLocale/ClassificaLocale';
import ServizioProfilo from './../../Components/ServizioProfilo/ServizioProfilo';

const categorie = ['Cultura', 'Ristorazione', 'Ospitalità', 'Trasporto', 'Intrattenimento'];

export default function Capoluogo() {
  const { citta } = useParams();
  const navigate = useNavigate();
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
