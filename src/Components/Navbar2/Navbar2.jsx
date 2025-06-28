import React, { useEffect, useState } from 'react';
import './Navbar2.css';

import logo from '../../assets/logo.webp';
import menu_icon from '../../assets/menu_icon.png';

import { Link } from 'react-router-dom';

import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [sticky, setSticky] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  const handleDropdownToggle = (index) => {
    if (window.innerWidth <= 900) {
      // For mobile, toggle the dropdown on click
      setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);
    } else {
      // For desktop, toggle the dropdown on hover
      setDropdownOpen(dropdownOpen === index ? null : index);
    }
  };

  const handleMenuClick = () => {
    if(window.innerWidth <= 900) setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 0);
    };

    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.scrollY >= 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
      if (window.innerWidth > 900) {
        setIsOpen(false);
        setMobileDropdownOpen(null);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`container ${sticky && !isOpen ? 'dark-nav' : ''}`}>
        <Link to='/'>
          <img className={isOpen && width <= 900 ? 'logo2' : 'logo'} src={logo} alt="Logo" />
        </Link>
        <img src={menu_icon} alt="Menu Icon" className='menu_icon' onClick={handleMenuClick}/>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
        <span><Link to='/' className="menu-link">Home</Link></span>
        <span><Link to="/Polo_universitario_128_eCampus" className="menu-link">eCampus</Link></span>
        <span><Link to="/TFA" className="menu-link">TFA</Link></span>
        <span><Link to="/Scuola Moscati" className="menu-link">Scuola Moscati<br/>InfoPoint</Link></span>
        <span><Link to="/News" className="menu-link">News</Link></span>  
          <span className="dropdown-navbar" onMouseEnter={() => window.innerWidth > 900 && handleDropdownToggle(1)} onMouseLeave={() => window.innerWidth > 900 && handleDropdownToggle(null)} onClick={() => window.innerWidth <= 900 && handleDropdownToggle(1)}>
            <a className="menu-link">La Scuola</a>
            <div className={`dropdown-menu ${dropdownOpen === 1 || mobileDropdownOpen === 1 ? 'open' : ''}`}>
            <Link to='/#ChiSiamo' className="menu-link" onClick={handleMenuClick}>Chi Siamo</Link>
            <Link to="/#Maps" className="menu-link" onClick={handleMenuClick}>Dove Ci Troviamo</Link>
            <Link to="/#Testimonials" className="menu-link" onClick={handleMenuClick}>I Feedback</Link>
            </div>
          </span>
          <span>
          <ScrollLink to='contact' smooth={true} offset={-250} duration={500}>
            <button className='btn' onClick={handleMenuClick}>Contattaci</button>
          </ScrollLink>
          </span>
        </div>
      </nav>
      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;


/**
          <span className="dropdown-navbar" onMouseEnter={() => window.innerWidth > 900 && handleDropdownToggle(2)} onMouseLeave={() => window.innerWidth > 900 && handleDropdownToggle(null)} onClick={() => window.innerWidth <= 900 && handleDropdownToggle(2)}>
            <a href="#" className="menu-link">Services 2</a>
            <div className={`dropdown-menu ${dropdownOpen === 2 || mobileDropdownOpen === 2 ? 'open' : ''}`}>
              <a href="/services/3" className="menu-link">Service 3</a>
              <a href="/services/4" className="menu-link">Service 4</a>
            </div>
          </span>
 */
