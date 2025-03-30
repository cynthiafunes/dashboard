import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="bitcoin-symbol">₿</span>
        <h1>Bitcoin Power Law Explorer</h1>
      </div>
      <nav className="nav-tabs">
        <button
          className="nav-tab active"
          onClick={() => scrollToSection('dashboard-section')}
        >
          Dashboard
        </button>
        <button
          className="nav-tab"
          onClick={() => scrollToSection('power-law-section')}
        >
          Power Law
        </button>
        <button
          className="nav-tab"
          onClick={() => scrollToSection('faq-section')}
        >
          FAQ
        </button>
      </nav>
    </header>
  );
};

export default Header;