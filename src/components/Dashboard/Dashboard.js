import React from 'react';
import './Dashboard.css';
import PriceChart from './PriceChart';
import BitcoinInfo from './BitcoinInfo';
import MetricsPanel from './MetricsPanel';

const Dashboard = ({ activeTab }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="main-chart">
          <PriceChart />
        </div>
        <div className="side-panel">
          <BitcoinInfo />
        </div>
      </div>
      <MetricsPanel />
    </div>
  );
};

export default Dashboard;