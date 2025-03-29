import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PowerLawExplainer.css';

const PowerLawExplainer = () => {
  const [showExample, setShowExample] = useState(false);
  
  // Simplified data for educational purposes
  const powerLawData = [
    { year: 2010, value: 1 },
    { year: 2012, value: 10 },
    { year: 2014, value: 100 },
    { year: 2016, value: 1000 },
    { year: 2018, value: 10000 },
    { year: 2020, value: 100000 },
    { year: 2022, value: 1000000 }
  ];

  return (
    <div className="power-law-explainer panel">
      <h2 className="explainer-title">Understanding the Bitcoin Power Law</h2>
      
      <div className="explainer-content">
        <p>
          The Power Law is a mathematical concept that describes relationships where one quantity varies as a power of another. 
          In Bitcoin's case, some analysts suggest its price growth may follow a power law pattern over long time periods.
        </p>
        
        <div className="key-points">
          <h3>Key Points:</h3>
          <ul>
            <li>
              <strong>Exponential Growth:</strong> A power law suggests that Bitcoin's price might increase exponentially rather than linearly over time.
            </li>
            <li>
              <strong>Historical Pattern:</strong> When plotted on a logarithmic scale, Bitcoin's price history appears to follow a relatively consistent upward trend.
            </li>
            <li>
              <strong>Not a Prediction:</strong> While this pattern has been observed historically, it's not a guarantee of future performance.
            </li>
          </ul>
        </div>
        
        <button 
          className="example-btn"
          onClick={() => setShowExample(!showExample)}
        >
          {showExample ? 'Hide Example' : 'Show Simple Example'}
        </button>
        
        {showExample && (
          <div className="example-container">
            <h3>Simple Power Law Example</h3>
            <p>
              In this simplified example, each value increases by a factor of 10 every two years - a form of power law growth.
            </p>
            <div className="example-chart">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={powerLawData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#8899aa" 
                  />
                  <YAxis 
                    stroke="#8899aa" 
                    scale="log"
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => {
                      if (value === 1) return '1';
                      if (value === 10) return '10';
                      if (value === 100) return '100';
                      if (value === 1000) return '1K';
                      if (value === 10000) return '10K';
                      if (value === 100000) return '100K';
                      if (value === 1000000) return '1M';
                      return value;
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()}`, 'Value']}
                    labelFormatter={(label) => `Year: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f7931a" 
                    strokeWidth={3} 
                    dot={{ r: 5 }} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="chart-note">
                <p>Note: Y-axis uses logarithmic scale to show the power law pattern as a straight line</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="real-world-application">
          <h3>What This Means for Bitcoin</h3>
          <p>
            If Bitcoin continues to follow a power law pattern, it suggests that while price volatility will continue in the short term,
            the long-term trend may follow a predictable growth curve. This could be due to Bitcoin's adoption spreading through
            network effects and its programmed scarcity with a fixed supply cap of 21 million coins.
          </p>
          <p>
            Understanding this concept helps put short-term price fluctuations in context and may inform long-term
            saving strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PowerLawExplainer;