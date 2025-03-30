import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import './PriceChart.css';
import { getBitcoinPriceData } from '../../api/bitcoinData';

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
  const [showForecast, setShowForecast] = useState(false);
  const [forecastYears, setForecastYears] = useState(5);
  const [timeRange, setTimeRange] = useState('all');
  const [confidenceInterval, setConfidenceInterval] = useState(true);
  
  // Function to calculate forecast based on power law
  const calculateForecast = (data) => {
    if (!data || data.length < 2) return data;
    
    // Extract years and prices for regression
    const dataWithYearAndPrice = data.filter(item => item.price && item.date);
    const years = dataWithYearAndPrice.map(item => parseInt(item.date));
    const prices = dataWithYearAndPrice.map(item => parseFloat(item.price));
    
    // Calculate years since start to avoid log(0)
    const minYear = Math.min(...years);
    const yearsSinceStart = years.map(year => year - minYear + 1);
    
    // Apply logarithm for log-log regression
    const logX = yearsSinceStart.map(year => Math.log(year));
    const logY = prices.map(price => Math.log(price));
    
    // Simple linear regression on log-transformed data
    const n = logX.length;
    const sumX = logX.reduce((a, b) => a + b, 0);
    const sumY = logY.reduce((a, b) => a + b, 0);
    const sumXY = logX.reduce((a, b, i) => a + b * logY[i], 0);
    const sumXX = logX.reduce((a, b) => a + b * b, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Convert coefficients to power law parameters
    const a = Math.exp(intercept);
    const b = slope;
    
    // Calculate standard error for confidence intervals
    const predictedLogY = logX.map(x => intercept + slope * x);
    const residuals = logY.map((y, i) => y - predictedLogY[i]);
    const residualSumSquares = residuals.reduce((sum, res) => sum + res * res, 0);
    const standardError = Math.sqrt(residualSumSquares / (n - 2));
    
    // Current year and future years for forecast
    const currentYear = new Date().getFullYear();
    const lastDataYear = Math.max(...years);
    const futureYears = Array.from(
      {length: forecastYears},
      (_, i) => lastDataYear + i + 1
    );
    
    // Create new data array with forecast
    const dataWithForecast = [...data]; // Start with existing data
    
    // Add future predictions
    futureYears.forEach(year => {
      const yearSinceStart = year - minYear + 1;
      const predictedPrice = a * Math.pow(yearSinceStart, b);
      
      // Calculate upper and lower bounds for confidence interval
      const logPrediction = Math.log(predictedPrice);
      const upperBound = Math.exp(logPrediction + 2 * standardError);
      const lowerBound = Math.exp(logPrediction - 2 * standardError);
      
      // Create data point with forecast values
      dataWithForecast.push({
        date: year.toString(),
        forecast: predictedPrice,
        upperBound: upperBound,
        lowerBound: lowerBound
      });
    });
    
    return dataWithForecast;
  };
  
  // Fetch Bitcoin price data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getBitcoinPriceData();
        
        // Add forecast data if needed
        const dataWithForecast = showForecast ? calculateForecast(data) : data;
        setChartData(dataWithForecast);
        setError(null);
      } catch (err) {
        setError('Failed to load Bitcoin price data. Using sample data instead.');
        // Fallback to sample data if API fails
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
        
        // Add forecast to sample data if needed
        const sampleWithForecast = showForecast ? calculateForecast(sampleData) : sampleData;
        setChartData(sampleWithForecast);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [showForecast, forecastYears]);
  
  // Filter data based on time range
  const getFilteredData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    if (timeRange === '1y') {
      return chartData.slice(-2 - (showForecast ? forecastYears : 0)); // Last 2 years + forecast
    } else if (timeRange === '5y') {
      return chartData.slice(-6 - (showForecast ? forecastYears : 0)); // Last 6 years + forecast
    }
    return chartData;
  };

  // Toggle forecast display and recalculate when needed
  const toggleForecast = () => {
    const newShowForecast = !showForecast;
    setShowForecast(newShowForecast);
    
    // If turning on forecast, we need to recalculate with current data
    if (newShowForecast && chartData.length > 0) {
      const dataWithForecast = calculateForecast(chartData);
      setChartData(dataWithForecast);
    }
  };

  // Change forecast years
  const handleForecastYearsChange = (years) => {
    setForecastYears(years);
    
    // Recalculate forecast with new years
    if (showForecast && chartData.length > 0) {
      const dataWithForecast = calculateForecast(chartData);
      setChartData(dataWithForecast);
    }
  };

  return (
    <div className="price-chart-container">
      <div className="chart-header">
        <div className="chart-title-container">
          <div className="chart-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2>Bitcoin Price History & Forecast</h2>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="chart-controls">
          <div className="toggle-controls">
            <button 
              className={`control-btn ${logScale ? 'active' : ''}`} 
              onClick={() => setLogScale(!logScale)}
            >
              <span className="btn-icon">📊</span>
              <span>Log Scale</span>
            </button>
            <button 
              className={`control-btn ${showPowerLaw ? 'active' : ''}`} 
              onClick={() => setShowPowerLaw(!showPowerLaw)}
            >
              <span className="btn-icon">📈</span>
              <span>Power Law</span>
            </button>
            <button 
              className={`control-btn ${showForecast ? 'active' : ''}`} 
              onClick={toggleForecast}
            >
              <span className="btn-icon">🔮</span>
              <span>Forecast</span>
            </button>
            {showForecast && (
              <button 
                className={`control-btn ${confidenceInterval ? 'active' : ''}`} 
                onClick={() => setConfidenceInterval(!confidenceInterval)}
              >
                <span className="btn-icon">📏</span>
                <span>Confidence Range</span>
              </button>
            )}
          </div>
          <div className="right-controls">
            {showForecast && (
              <div className="forecast-controls">
                <button 
                  className={`time-btn ${forecastYears === 3 ? 'active' : ''}`} 
                  onClick={() => handleForecastYearsChange(3)}
                >
                  +3Y
                </button>
                <button 
                  className={`time-btn ${forecastYears === 5 ? 'active' : ''}`} 
                  onClick={() => handleForecastYearsChange(5)}
                >
                  +5Y
                </button>
                <button 
                  className={`time-btn ${forecastYears === 10 ? 'active' : ''}`} 
                  onClick={() => handleForecastYearsChange(10)}
                >
                  +10Y
                </button>
              </div>
            )}
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
      </div>
      <div className="chart-container">
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading price data...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={getFilteredData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f7931a" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f7931a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2ecc71" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
              <XAxis 
                dataKey="date" 
                stroke="#8899aa" 
                tick={{ fill: '#8899aa' }}
                tickLine={{ stroke: '#8899aa' }}
              />
              <YAxis 
                stroke="#8899aa" 
                scale={logScale ? 'log' : 'auto'}
                domain={logScale ? ['auto', 'auto'] : [0, 'auto']}
                tickFormatter={(value) => `$${value}`}
                width={60}
                tick={{ fill: '#8899aa' }}
                tickLine={{ stroke: '#8899aa' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              
              {/* Historical Price Line */}
              <Line
                name="BTC Price (USD)"
                type="monotone"
                dataKey="price"
                stroke="#f7931a"
                strokeWidth={3}
                dot={{ r: 3, fill: '#f7931a', stroke: '#ffffff', strokeWidth: 1 }}
                activeDot={{ r: 8, fill: '#f7931a', stroke: '#ffffff', strokeWidth: 2 }}
                connectNulls={true}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              
              {/* Power Law Model Line */}
              {showPowerLaw && (
                <Line
                  name="Power Law Model"
                  type="monotone"
                  dataKey="powerLaw"
                  stroke="#3498db"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationDelay={300}
                  animationEasing="ease-in-out"
                />
              )}
              
              {/* Forecast Line */}
              {showForecast && (
                <Line
                  name="Price Forecast"
                  type="monotone"
                  dataKey="forecast"
                  stroke="#2ecc71"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#2ecc71', stroke: '#ffffff', strokeWidth: 1 }}
                  connectNulls={true}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationDelay={600}
                  animationEasing="ease-in-out"
                />
              )}
              
              {/* Confidence Interval Upper Bound */}
              {showForecast && confidenceInterval && (
                <Line
                  name="Upper Bound (95%)"
                  type="monotone"
                  dataKey="upperBound"
                  stroke="#2ecc71"
                  strokeWidth={1}
                  strokeOpacity={0.3}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationDelay={900}
                />
              )}
              
              {/* Confidence Interval Lower Bound */}
              {showForecast && confidenceInterval && (
                <Line
                  name="Lower Bound (95%)"
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="#2ecc71"
                  strokeWidth={1}
                  strokeOpacity={0.3}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationDelay={900}
                />
              )}
              
              {/* Reference line for current year */}
              {showForecast && (
                <ReferenceLine
                  x={new Date().getFullYear().toString()}
                  stroke="#e67e22"
                  strokeDasharray="3 3"
                  label={{
                    value: "Current",
                    position: "insideTopRight",
                    fill: "#e67e22",
                    fontSize: 12
                  }}
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