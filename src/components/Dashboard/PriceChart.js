import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PriceChart.css';
import { getBitcoinPriceData } from '../../api/bitcoinData';

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-year">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ${entry.value?.toLocaleString() || 'N/A'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PriceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logScale, setLogScale] = useState(true);
  const [showPowerLaw, setShowPowerLaw] = useState(true);
  const [timeRange, setTimeRange] = useState('all');
  
  // Fetch Bitcoin price data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getBitcoinPriceData();
        setChartData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Bitcoin price data. Using sample data instead.');
        // Fallback to sample data if API fails
        setChartData(sampleData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Sample data as fallback
  const sampleData = [
    { date: '2010', price: 0.1, powerLaw: 0.1 },
    { date: '2011', price: 6, powerLaw: 0.8 },
    { date: '2012', price: 13, powerLaw: 6 },
    { date: '2013', price: 817, powerLaw: 50 },
    { date: '2014', price: 320, powerLaw: 400 },
    { date: '2015', price: 430, powerLaw: 1000 },
    { date: '2016', price: 952, powerLaw: 2500 },
    { date: '2017', price: 13860, powerLaw: 6000 },
    { date: '2018', price: 3742, powerLaw: 10000 },
    { date: '2019', price: 7240, powerLaw: 14000 },
    { date: '2020', price: 28990, powerLaw: 20000 },
    { date: '2021', price: 47686, powerLaw: 30000 },
    { date: '2022', price: 16625, powerLaw: 40000 },
    { date: '2023', price: 42270, powerLaw: 50000 },
    { date: '2024', price: 52000, powerLaw: 60000 },
    { date: '2025', price: null, powerLaw: 75000 },
  ];
  
  // Filter data based on time range
  const getFilteredData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    if (timeRange === '1y') {
      return chartData.slice(-2); // Last 2 years
    } else if (timeRange === '5y') {
      return chartData.slice(-6); // Last 6 years
    }
    return chartData;
  };

  return (
    <div className="price-chart-container">
      <div className="chart-header">
        <h2>Bitcoin Price History & Power Law</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="chart-controls">
          <div className="toggle-controls">
            <button 
              className={`control-btn ${logScale ? 'active' : ''}`} 
              onClick={() => setLogScale(!logScale)}
            >
              Log Scale
            </button>
            <button 
              className={`control-btn ${showPowerLaw ? 'active' : ''}`} 
              onClick={() => setShowPowerLaw(!showPowerLaw)}
            >
              Power Law
            </button>
          </div>
          <div className="time-range-controls">
            <button 
              className={`time-btn ${timeRange === '1y' ? 'active' : ''}`} 
              onClick={() => setTimeRange('1y')}
            >
              1Y
            </button>
            <button 
              className={`time-btn ${timeRange === '5y' ? 'active' : ''}`} 
              onClick={() => setTimeRange('5y')}
            >
              5Y
            </button>
            <button 
              className={`time-btn ${timeRange === 'all' ? 'active' : ''}`} 
              onClick={() => setTimeRange('all')}
            >
              All
            </button>
          </div>
        </div>
      </div>
      <div className="chart-container">
        {isLoading ? (
          <div className="loading-indicator">Loading price data...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={getFilteredData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
              <XAxis dataKey="date" stroke="#8899aa" />
              <YAxis 
                stroke="#8899aa" 
                scale={logScale ? 'log' : 'auto'}
                domain={logScale ? ['auto', 'auto'] : [0, 'auto']}
                tickFormatter={(value) => `$${value}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Line
                name="BTC Price (USD)"
                type="monotone"
                dataKey="price"
                stroke="#f7931a"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 8 }}
                connectNulls={true}
              />
              {showPowerLaw && (
                <Line
                  name="Power Law Model"
                  type="monotone"
                  dataKey="powerLaw"
                  stroke="#3498db"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PriceChart;