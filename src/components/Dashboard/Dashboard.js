import React from 'react';
import './Dashboard.css';
import PriceChart from './PriceChart';
import BitcoinInfo from './BitcoinInfo';
import MetricsPanel from './MetricsPanel';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* First section: Main chart and Bitcoin info */}
      <div className="dashboard-grid">
        <div className="main-chart">
          <PriceChart />
        </div>
        <div className="side-panel">
          <BitcoinInfo />
        </div>
      </div>
      
      {/* Second section: Metrics clearly separated */}
      <div className="metrics-section">
        <MetricsPanel />
      </div>
    </div>
  );
};

export default Dashboard;