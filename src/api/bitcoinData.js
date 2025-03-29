import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getBitcoinPriceData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bitcoin/price-data`);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch Bitcoin price data');
    }
  } catch (error) {
    console.error('Error fetching Bitcoin price data:', error);
    throw error;
  }
};

// Get Bitcoin metrics (supply, hash rate, etc.)
export const getBitcoinMetrics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bitcoin/metrics`);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch Bitcoin metrics');
    }
  } catch (error) {
    console.error('Error fetching Bitcoin metrics:', error);
    throw error;
  }
};