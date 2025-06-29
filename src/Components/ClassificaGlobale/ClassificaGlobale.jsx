import React, { useState } from 'react';

const categorie = ['Cultura', 'Ristorazione', 'Ospitalità', 'Trasporto', 'Intrattenimento'];

const datiMock = [
  { capoluogo: 'Ancona', media: 4.2 },
  { capoluogo: 'Aosta', media: 3.9 },
  { capoluogo: 'Bari', media: 4.1 },
  { capoluogo: 'Bologna', media: 4.5 },
  { capoluogo: 'Cagliari', media: 4.0 },
  { capoluogo: 'Campobasso', media: 3.8 },
  { capoluogo: 'Catanzaro', media: 3.7 },
  { capoluogo: 'Firenze', media: 4.6 },
  { capoluogo: 'Genova', media: 4.0 },
  { capoluogo: "L'Aquila", media: 3.9 },
  { capoluogo: 'Milano', media: 4.8 },
  { capoluogo: 'Napoli', media: 4.4 },
  { capoluogo: 'Palermo', media: 4.2 },
  { capoluogo: 'Perugia', media: 4.1 },
  { capoluogo: 'Potenza', media: 3.6 },
  { capoluogo: 'Roma', media: 4.9 },
  { capoluogo: 'Torino', media: 4.3 },
  { capoluogo: 'Trento', media: 4.7 },
  { capoluogo: 'Trieste', media: 4.1 },
  { capoluogo: 'Venezia', media: 4.4 },
];

const ClassificaGlobale = () => {
  const [categoriaSelezionata, setCategoriaSelezionata] = useState('Cultura');

  // Ordina per media decrescente
  const datiOrdinati = [...datiMock].sort((a, b) => b.media - a.media);

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
                backgroundColor: '#fefcf8', // Colore pieno, identico al contenitore
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
            {datiOrdinati.map((item, index) => (
              <tr key={item.capoluogo} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{index + 1}</td>
                <td style={{ padding: '8px' }}>{item.capoluogo}</td>
                <td style={{ padding: '8px' }}>{item.media}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassificaGlobale;
