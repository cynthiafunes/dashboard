import React from 'react';
import './Header.css';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'basics', label: 'Basics' },
    { id: 'value', label: 'Value' },
    { id: 'security', label: 'Security' },
    { id: 'more', label: 'More' }
  ];

  return (
    <header className="header">
      <div className="logo">
        <span className="bitcoin-symbol">₿</span>
        <h1>Bitcoin Power Law Explorer</h1>
      </div>
      <nav className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <button className="get-started-btn">Get Started</button>
    </header>
  );
};

export default Header;