import React, { useState, useEffect } from 'react';

const apiDbUrl = import.meta.env.VITE_API_DB_URL;

const categorie = ['Cultura', 'Ristorazione', 'Ospitalità', 'Trasporto', 'Intrattenimento'];

const ClassificaGlobale = () => {
  const [categoriaSelezionata, setCategoriaSelezionata] = useState('Cultura');
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${apiDbUrl}/servizi`)
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
  }, []);

  // Calcola media per capoluogo filtrando per categoria selezionata
  // Raggruppa i servizi per capoluogo, calcola media totale dai feedback di tutti i servizi del capoluogo nella categoria scelta
  const datiPerClassifica = React.useMemo(() => {
    if (!servizi || servizi.length === 0) return [];

    // Filtra servizi per categoria (case insensitive)
    const serviziFiltrati = servizi.filter(
      s => s.categoria.toLowerCase() === categoriaSelezionata.toLowerCase()
    );

    // Mappa per raggruppare per capoluogo: { capoluogo: { sommaValutazioni, countValutazioni } }
    const aggregati = {};

    serviziFiltrati.forEach(s => {
      const capoluogo = s.capoluogo;
      const feedback = s.feedback || [];

      const sommaValutazioni = feedback.reduce((acc, f) => acc + (f.valutazione || 0), 0);
      const countValutazioni = feedback.length;

      if (!aggregati[capoluogo]) {
        aggregati[capoluogo] = { somma: 0, count: 0 };
      }

      aggregati[capoluogo].somma += sommaValutazioni;
      aggregati[capoluogo].count += countValutazioni;
    });

    // Trasforma in array con media calcolata
    const risultati = Object.entries(aggregati).map(([capoluogo, { somma, count }]) => ({
      capoluogo,
      media: count > 0 ? somma / count : 0,
    }));

    // Ordina decrescente per media
    risultati.sort((a, b) => b.media - a.media);

    return risultati;
  }, [categoriaSelezionata, servizi]);

  if (loading) return <div>Caricamento dati...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div
      style={{
        backgroundColor: '#fefcf8',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      
      {/* Pulsanti categoria */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {categorie.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelezionata(cat)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: categoriaSelezionata === cat ? '#0a581b' : '#ccc',
              color: 'white',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              if (categoriaSelezionata !== cat) {
                e.target.style.backgroundColor = '#4B975B';
              }
            }}
            onMouseLeave={(e) => {
              if (categoriaSelezionata !== cat) {
                e.target.style.backgroundColor = '#ccc';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tabella classifica */}
      <div style={{ overflowY: 'auto', maxHeight: '360px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#fefcf8',
                zIndex: 2,
                borderBottom: '2px solid #ddd',
              }}
            >
              <th style={{ padding: '8px' }}>Posizione</th>
              <th style={{ padding: '8px' }}>Capoluogo</th>
              <th style={{ padding: '8px' }}>Media</th>
            </tr>
          </thead>
          <tbody>
            {datiPerClassifica.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  Nessun dato disponibile per questa categoria
                </td>
              </tr>
            ) : (
              datiPerClassifica.map((item, index) => (
                <tr key={item.capoluogo} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>{index + 1}</td>
                  <td style={{ padding: '8px' }}>{item.capoluogo}</td>
                  <td style={{ padding: '8px' }}>{item.media.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassificaGlobale;
