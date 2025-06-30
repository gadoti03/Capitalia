import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Capoluogo.css';

import { getCookie } from './../../utils/cookieUtils';

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

import Navbar from './../../Components/Navbar/Navbar';
import ClassificaLocale from './../../Components/ClassificaLocale/ClassificaLocale';
import ServizioCapoluogo from './../../Components/ServizioCapoluogo/ServizioCapoluogo';

const categorie = ['Cultura', 'Ristorazione', 'Ospitalità', 'Trasporto', 'Intrattenimento'];

const capoluoghiRegione = [
  "Aosta", "Torino", "Milano", "Trento", "Venezia", "Genova", "Bologna", "Firenze",
  "Ancona", "Campobasso", "Roma", "L'Aquila", "Potenza", "Catanzaro", "Bari",
  "Cagliari", "Palermo", "Perugia", "Trieste", "Napoli"
];

function isValidCapoluogo(capoluogo) {
  if (!capoluogo) return false;
  return capoluoghiRegione.some(c => c.toLowerCase() === capoluogo.toLowerCase());
}

export default function Capoluogo() {
  const { citta } = useParams();
  const navigate = useNavigate();

  const [categoriaSelezionata, setCategoriaSelezionata] = useState('Cultura');
  const [servizi, setServizi] = useState([]);

  const username = getCookie('username');
  useEffect(() => {
    if (!isValidCapoluogo(citta)) {
      navigate('/');
      return;
    }

    const fetchServizi = async () => {
      try {
        const res = await fetch(`${apiDbUrl}/servizi`);        
        const data = await res.json();

        console.log(data)

        const serviziFiltrati = data.filter(
          (s) =>
            s.capoluogo.toLowerCase() == citta.toLowerCase() &&
            s.categoria.toLowerCase() == categoriaSelezionata.toLowerCase()
        );

        setServizi(serviziFiltrati);

      } catch (err) {
        console.error('Errore durante il fetch dei servizi:', err);
      }
    };

    fetchServizi();
  }, [categoriaSelezionata, servizi]);

  const handleInserisciServizio = () => {
    navigate(`/servizio/${citta}`);
  };

  return (
    <>
      <Navbar backgroundStyle="verde" />

      <div className="page-container">
        <section className="capoluogo-header">
          <h1 className="capoluogo-title">{citta}</h1>

          {console.log(username)}
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
            {servizi.length === 0 ? (
              <p className="no-servizi-msg">Nessun servizio trovato in questa categoria.</p>
            ) : (
              servizi.map((servizio, idx) => (
                <ServizioCapoluogo
                  id={servizio.id || idx}
                  nome={servizio.nome}
                  capoluogo={servizio.capoluogo}
                  collocazione={servizio.collocazione}
                  categoria={servizio.categoria}
                  lista_immagini={servizio.lista_immagini}
                  lista_feedback={servizio.feedback}
                  username_proprietario={servizio.username_proprietario}
                />
              ))
            )}
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
