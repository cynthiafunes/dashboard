import React, { useState, useEffect } from 'react';
import './MetricsPanel.css';
import { getBitcoinMetrics } from '../../api/bitcoinData';

const MetricsPanel = () => {
  const [metrics, setMetrics] = useState({
    supply: {
      current: 19500000,
      max: 21000000,
      percentage: 92.9
    },
    hashrate: {
      current: 525,
      unit: 'EH/s'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await getBitcoinMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const SupplyMetric = () => (
    <div className="metric-card">
      <h3>Bitcoin Supply Cap</h3>
      <div className="supply-bar">
        <div 
          className="supply-progress" 
          style={{ width: `${metrics.supply.percentage}%` }}
        ></div>
      </div>
      <div className="metric-value">
        {isLoading ? 'Loading...' : `${(metrics.supply.current / 1000000).toFixed(1)}M / ${metrics.supply.max / 1000000}M coins mined`}
      </div>
      <div className="metric-subtext">
        {isLoading ? '' : `${metrics.supply.percentage}% of total supply`}
      </div>
    </div>
  );

  const SecurityMetric = () => (
    <div className="metric-card">
      <h3>Network Security</h3>
      <div className="security-chart">
        <svg viewBox="0 0 200 100" width="100%" height="60">
          <path 
            d="M0,60 Q30,50 60,55 T120,35 T180,20" 
            stroke="#2ecc71" 
            strokeWidth="2" 
            fill="none" 
          />
        </svg>
      </div>
      <div className="metric-subtext">
        {isLoading ? 'Loading...' : `Hash Rate: ${metrics.hashrate.current} ${metrics.hashrate.unit}`}
      </div>
    </div>
  );

  const PowerLawMetric = () => (
    <div className="metric-card">
      <h3>Understanding Power Law</h3>
      <p className="power-law-text">
        The power law suggests that Bitcoin's price may follow a predictable pattern of growth over extended periods of time.
      </p>
      <div className="interactive-demo">
        <span className="demo-icon">•</span>
        <span>Click to see interactive demo</span>
      </div>
    </div>
  );

  return (
    <div className="metrics-panel">
      <SupplyMetric />
      <SecurityMetric />
      <PowerLawMetric />
    </div>
  );
};

export default MetricsPanel;