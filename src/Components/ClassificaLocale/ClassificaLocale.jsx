import React, { useState, useEffect } from 'react';

const apiDbUrl = import.meta.env.VITE_API_DB_URL;
import './ClassificaLocale.css';

const categorie = ['Cultura', 'Ristorazione', 'Ospitalità', 'Trasporto', 'Intrattenimento'];

const ClassificaLocale = ({ capoluogo }) => {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${apiDbUrl}/servizi?capoluogo=${encodeURIComponent(capoluogo)}`)
      .then(res => {
        if (!res.ok) throw new Error('Errore nel caricamento dati');
        return res.json();
      })
      .then(data => {
        setServizi(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [capoluogo]);

  if (loading) return <div>Caricamento dati...</div>;
  if (error) return <div>Errore: {error}</div>;

  const datiClassifica = categorie.map((categoria) => {
    const serviziCategoria = servizi.filter(
      (s) => s.categoria.toLowerCase() === categoria.toLowerCase()
    );

    if (serviziCategoria.length === 0) {
      return {
        categoria,
        mediaVoto: 0,
        migliorServizio: '-',
      };
    }

    let sommaTotale = 0;
    let countTotale = 0;
    let migliorServizio = '-';
    let migliorMedia = 0;

    serviziCategoria.forEach((servizio) => {
      const feedback = servizio.feedback || [];
      const sommaServizio = feedback.reduce((acc, f) => acc + (f.valutazione || 0), 0);
      const countServizio = feedback.length;

      if (countServizio > 0) {
        const mediaServizio = sommaServizio / countServizio;

        if (mediaServizio > migliorMedia) {
          migliorMedia = mediaServizio;
          migliorServizio = servizio.nome;
        }

        sommaTotale += sommaServizio;
        countTotale += countServizio;
      }
    });

    const mediaVoto = countTotale > 0 ? sommaTotale / countTotale : 0;

    return {
      categoria,
      mediaVoto,
      migliorServizio,
    };
  });

  datiClassifica.sort((a, b) => b.mediaVoto - a.mediaVoto);

  return (
    <div
      className="classifica-container"
      style={{
        backgroundColor: '#fefcf8',
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <div className="tabella" style={{ maxHeight: '360px', overflowY: 'auto' }}>
        <div className="tabella-header">
          <div>Posizione</div>
          <div>Categoria</div>
          <div>Media Voto</div>
          <div>Miglior Servizio</div>
        </div>

        {datiClassifica.length === 0 ? (
          <div className="vuoto">Nessun dato disponibile</div>
        ) : (
          datiClassifica.map((item, index) => (
            <div key={item.categoria} className="riga">
              <div>{index + 1}</div>
              <div>{item.categoria}</div>
              <div>
                {typeof item.mediaVoto === 'number' && item.mediaVoto !== 0
                  ? item.mediaVoto.toFixed(2)
                  : '-'}
              </div>
              <div>{item.migliorServizio}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassificaLocale;
