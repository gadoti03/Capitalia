import React, { useEffect, useState } from 'react';
import './Navbar.css';

import logo from '../../assets/logo_no_sfondo.png';
import menu_icon from '../../assets/menu_icon.png';
import profile_icon from '../../assets/profile_icon.webp';
import logout_icon from '../../assets/logout_icon.png';

import { deleteCookie } from './../../utils/cookieUtils';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ backgroundStyle = 'transparent' }) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const getUsernameFromCookies = () => {
    const match = document.cookie.match(/(?:^|;\s*)username=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const handleMenuClick = () => {
    if (window.innerWidth <= 900) setIsOpen(!isOpen);
  };

  const handleGoToSignup = () => {
    navigate('/autenticazione', { state: { activeTab: 'signup' } });
    setIsOpen(false);
  };

  const handleGoToLogin = () => {
    navigate('/autenticazione', { state: { activeTab: 'login' } });
    setIsOpen(false);
  };

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie;
      const hasAuthCookie = cookies.includes('username=');
      setIsAuthenticated(hasAuthCookie);
    };

    checkAuth();

    const cookieObserver = setInterval(checkAuth, 5000);
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

  const username = getUsernameFromCookies();

  // Gestione background color
  let backgroundColor = 'transparent';

  if (sticky && !isOpen) {
    backgroundColor = '#fefcf8'; // Sticky: sempre panna
  } else {
    switch (backgroundStyle) {
      case 'panna':
        backgroundColor = '#fefcf8';
        break;
      case 'verde':
        backgroundColor = '#4CAF50'; // verde chiaro pastello
        break;
      default:
        backgroundColor = 'transparent';
    }
  }

  return (
    <>
      <nav
        className={`container ${sticky && !isOpen ? 'dark-nav' : ''}`}
        style={{ backgroundColor }}
      >
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

          {isAuthenticated && username && (
            <>
              <Link to={`/profilo/${username}`} onClick={handleMenuClick}>
                <img src={profile_icon} alt="Profilo" className="profile-icon" />
              </Link>
              <Link to="/Autenticazione" onClick={() => deleteCookie('username')}>
                <img src={logout_icon} alt="Logout" className="profile-icon" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;
