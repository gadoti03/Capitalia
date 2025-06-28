import React, { useEffect } from 'react';

import { Link as ScrollLink } from 'react-scroll'

import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // 👈 Importa Helmet

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const offset = -130; // Modifica questo valore per regolare l'offset

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
    </>
  );
};

export default App
