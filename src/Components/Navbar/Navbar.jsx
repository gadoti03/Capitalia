import React, { useEffect, useState } from 'react';
import './Navbar.css';

import logo from '../../assets/logo_no_sfondo.png';
import menu_icon from '../../assets/menu_icon.png';
import profile_icon from '../../assets/profile_icon.webp';

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (window.innerWidth <= 900) setIsOpen(!isOpen);
  };

  const handleGoToSignup = () => {
    navigate('/autenticazione', { state: { activeTab: "signup" } });
    setIsOpen(false);
  };

  const handleGoToLogin = () => {
    navigate('/autenticazione', { state: { activeTab: "login" } });
    setIsOpen(false);
  };

  // Controlla se c'è un cookie che indica l'autenticazione
  useEffect(() => {
    const checkAuth = () => {
      // Sostituisci 'token' con il nome effettivo del tuo cookie di autenticazione
      const cookies = document.cookie;
      const hasAuthCookie = cookies.includes('username='); 
      setIsAuthenticated(hasAuthCookie);
    };

    checkAuth();

    // Facoltativo: aggiorna lo stato quando i cookie cambiano
    const cookieObserver = setInterval(checkAuth, 5000); // controlla ogni 5 secondi

    return () => clearInterval(cookieObserver);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`container ${sticky && !isOpen ? 'dark-nav' : ''}`}>
        <div className="navbar-left">
          <Link to="/">
            <img className="logo" src={logo} alt="Logo" />
          </Link>
        </div>

        <img
          src={menu_icon}
          alt="Menu Icon"
          className="menu_icon"
          onClick={handleMenuClick}
        />

        <div className={`navbar-right ${isOpen ? 'open' : ''}`}>
          {!isAuthenticated ? (
            <>
              <button className="menu-link" onClick={handleGoToSignup}>
                Registrati
              </button>
              <button className="menu-link" onClick={handleGoToLogin}>
                Accedi
              </button>
            </>
          ) : null}
          <Link to="/profile/" onClick={handleMenuClick}>
            <img src={profile_icon} alt="Profilo" className="profile-icon" />
          </Link>
        </div>
      </nav>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;
