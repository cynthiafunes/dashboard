import pandas as pd
import numpy as np
import requests
from datetime import datetime
import time
from sklearn.linear_model import LinearRegression

def get_bitcoin_price_data():
    """
    Fetch historical Bitcoin price data from CoinGecko API
    Returns data in format suitable for our dashboard
    """
    # Blockchain.info API endpoint for Bitcoin historical data
    url = "https://api.blockchain.info/charts/market-price"
    
    # Get data from blockchain.info
    params = {
        'timespan': 'all',
        'format': 'json'
    }
    
    # Make API request
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}")
    
    data = response.json()
    
    # Process price data
    prices = data['values']
    
    # Convert to DataFrame
    df = pd.DataFrame(prices)
    
    # Convert timestamp to date (blockchain.info returns timestamps in seconds)
    df['date'] = pd.to_datetime(df['x'], unit='s')
    
    # Create year column
    df['year'] = df['date'].dt.year
    
    # Only keep data from 2010 onwards (to avoid any potential zero values)
    df = df[df['year'] >= 2010]
    
    # Filter out any zero or negative price values
    df = df[df['y'] > 0]
    
    if df.empty:
        raise Exception("No valid Bitcoin price data found after filtering")
    
    # Keep only end-of-year prices for simplicity
    yearly_data = []
    
    for year in sorted(df['year'].unique()):
        # Get the last price entry for each year
        year_data = df[df['year'] == year]
        if not year_data.empty:
            latest_for_year = year_data.iloc[-1]
            yearly_data.append({
                'date': str(year),  # Just the year for our chart
                'price': latest_for_year['y'],
            })
    
    return yearly_data

def calculate_power_law(price_data):
    """
    Calculate the power law projection based on historical data
    """
    if not price_data or len(price_data) < 2:
        # Need at least 2 data points for regression
        return []
        
    # Extract years and prices
    years = np.array([float(item['date']) for item in price_data])
    prices = np.array([float(item['price']) for item in price_data])
    
    # Make sure we don't have any zeros or negative values
    valid_indices = prices > 0
    years = years[valid_indices]
    prices = prices[valid_indices]
    
    if len(years) < 2:
        # Not enough valid data points after filtering
        return []
    
    # The base year is calculated as one year before the earliest data point
    base_year = int(min(years)) - 1
    
    # Apply log transformation for power law fitting
    log_years = np.log(years - base_year)  # Adjust years to start from base_year
    log_prices = np.log(prices)  # This should be safe now with filtered data
    
    # Fit linear regression on log-transformed data
    model = LinearRegression()
    # Reshape for scikit-learn
    model.fit(log_years.reshape(-1, 1), log_prices)
    
    # Extract power law parameters
    alpha = model.coef_[0]
    beta = np.exp(model.intercept_)
    
    # Generate power law projections including future years
    all_years = list(range(int(min(years)), 2026))  # Project up to 2030
    
    result = []
    
    for year in all_years:
        year_data = {
            'date': str(year),
            'powerLaw': beta * ((year - base_year) ** alpha)
        }
        
        actual_price = next((item['price'] for item in price_data if item['date'] == str(year)), None)
        if actual_price is not None:
            year_data['price'] = actual_price
            
        result.append(year_data)
    
    return result