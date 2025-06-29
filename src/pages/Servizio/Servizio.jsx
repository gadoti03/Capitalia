import React from 'react';

export default function Servizio({ nome = 'Roma', regione = 'Lazio' }) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white text-gray-800 max-w-sm">
      <h2 className="text-xl font-bold mb-1">Capoluogo: {nome}</h2>
      <p className="text-sm text-gray-600">Regione: {regione}</p>
    </div>
  );
}
