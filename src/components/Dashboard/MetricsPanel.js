// For MetricsPanel.js
// Replace the existing MetricsPanel component with this code

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

  return (
    <div className="metrics-panel">
      <div className="metric-card supply-card">
        <div className="metric-card-header">
          <div className="metric-icon">
            <span>₿</span>
          </div>
          <h3>Bitcoin Supply Cap</h3>
        </div>
        <div className="supply-bar">
          <div 
            className="supply-progress" 
            style={{ width: `${metrics.supply.percentage}%` }}
          >
            <div className="progress-shine"></div>
          </div>
        </div>
        <div className="supply-values">
          <div className="current-value">
            <div className="metric-value">
              {isLoading ? '...' : `${(metrics.supply.current / 1000000).toFixed(1)}M`}
            </div>
            <div className="metric-label">Mined</div>
          </div>
          <div className="total-value">
            <div className="metric-value">
              {metrics.supply.max / 1000000}M
            </div>
            <div className="metric-label">Total</div>
          </div>
        </div>
        <div className="metric-status">
          <span>{isLoading ? 'Loading...' : `${metrics.supply.percentage}% of maximum supply`}</span>
        </div>
      </div>

      <div className="metric-card security-card">
        <div className="metric-card-header">
          <div className="metric-icon security-icon">
            <span>🛡️</span>
          </div>
          <h3>Network Security</h3>
        </div>
        <div className="security-chart">
          <svg viewBox="0 0 200 100" width="100%" height="60">
            <defs>
              <linearGradient id="securityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#2ecc71", stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: "#2ecc71", stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <path 
              d="M0,60 Q30,50 60,55 T120,35 T180,20" 
              stroke="#2ecc71" 
              strokeWidth="3" 
              fill="none" 
            />
            <path 
              d="M0,60 Q30,50 60,55 T120,35 T180,20 L180,100 L0,100 Z" 
              fill="url(#securityGradient)" 
              opacity="0.3" 
            />
          </svg>
        </div>
        <div className="hashrate-container">
          <div className="hashrate-value">
            {isLoading ? 'Loading...' : `${metrics.hashrate.current} ${metrics.hashrate.unit}`}
          </div>
          <div className="hashrate-label">Current Hash Rate</div>
        </div>
      </div>

      <div className="metric-card power-law-card">
        <div className="metric-card-header">
          <div className="metric-icon power-law-icon">
            <span>📈</span>
          </div>
          <h3>What is Bitcoin Power Law?</h3>
        </div>
        <p className="power-law-text">
          The power law suggests Bitcoin's price follows a mathematical pattern where growth is proportional to its current value, creating a predictable long-term trajectory when viewed on a logarithmic scale.
        </p>
        <div className="power-law-concepts">
          <span>Network Growth</span>
          <span>Price Scaling</span>
          <span>Adoption Curve</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;

