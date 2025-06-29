import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Cartina from './Components/Cartina/Cartina';
import ClassificaGlobale from './Components/ClassificaGlobale/ClassificaGlobale';
// Questi due componenti non usati direttamente qui, lasciali se li userai in futuro
import FeedbackProfilo from './Components/FeedbackProfilo/FeedbackProfilo';
import ServizioProfilo from './Components/ServizioProfilo/ServizioProfilo';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const offset = -130;

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
    <div style={{
      background: 'linear-gradient(to bottom, #7EC585, #4B975B)',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <Navbar />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '30px 60px',
        gap: '40px',
        flexWrap: 'wrap',  // <--- Modifica qui: permette di andare a capo su schermi piccoli
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ flexBasis: '40%', minWidth: '300px' }}>
          <Cartina />
        </div>

        <div style={{ flexBasis: '40%', minWidth: '350px', textAlign: 'right' }}>
          <ClassificaGlobale />
        </div>
      </div>
    </div>
  );
};

export default App;
