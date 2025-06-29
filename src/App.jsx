import React, { useEffect } from 'react';

import { Link as ScrollLink } from 'react-scroll'

import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // 👈 Importa Helmet

import FeedbackProfilo from './Components/FeedbackProfilo/FeedbackProfilo'
import ServizioProfilo from './Components/ServizioProfilo/ServizioProfilo'

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const offset = -130; // Modifica questo valore per regolare l'offset

  const datiServizio = {
    nome: "Cinema Massimo",
    capoluogo: "Torino",
    collocazione: "Piemonte",
    categoria: "INTRATTENIMENTO",
    lista_immagini: [
      "/src/assets/1724930121345.jpg",
      "/src/assets/1724930121382.jpg",
      "/src/assets/1724930121416.jpg",
    ],
    username_proprietario: "svolgo92",
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        window.scrollTo({
          top: elementTop + offset,
          behavior: 'smooth',
        });
      }
    }
  }, [location]);

  return (
    <>
     <Navbar />
      nulla cosmico
    <FeedbackProfilo
      proprietario="Mario Rossi"
      servizio="Taglio capelli"
      citta="Torino"
      valutazione={5}
      commento="Ottimo servizio, consigliatissimo!"
      data="28/06/2025"
      ora="14:45"
    />

      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
      <ServizioProfilo {...datiServizio} />
    </>
  );
};

export default App
