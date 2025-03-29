import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import FAQ from './components/FAQ/FAQ';
import PowerLawExplainer from './components/Educational/PowerLawExplainer';
import BackToTop from './components/UI/BackToTop';

function App() {
  const [activeTab, setActiveTab] = useState('basics');

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Dashboard activeTab={activeTab} />
        <PowerLawExplainer />
        <FAQ />
      </div>
      <BackToTop />
    </div>
  );
}

export default App;