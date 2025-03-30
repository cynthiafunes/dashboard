import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import FAQ from './components/FAQ/FAQ';
import PowerLawExplainer from './components/Educational/PowerLawExplainer';
import BackToTop from './components/UI/BackToTop';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Dashboard />
        <PowerLawExplainer />
        <FAQ />
      </div>
      <BackToTop />
    </div>
  );
}

export default App;