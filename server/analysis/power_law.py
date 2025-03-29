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
    # CoinGecko API endpoint for Bitcoin historical data
    url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
    
    # Get data from 2010 to present
    params = {
        'vs_currency': 'usd',
        'days': 'max',
        'interval': 'daily'
    }
    
    # Make API request
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}")
    
    data = response.json()
    
    # Process price data
    prices = data['prices']
    
    # Convert to DataFrame
    df = pd.DataFrame(prices, columns=['timestamp', 'price'])
    
    # Convert timestamp to date
    df['date'] = pd.to_datetime(df['timestamp'], unit='ms')
    
    # Create year column
    df['year'] = df['date'].dt.year
    
    # Keep only end-of-year prices for simplicity
    yearly_data = []
    
    for year in sorted(df['year'].unique()):
        # Get the last price entry for each year
        year_data = df[df['year'] == year]
        if not year_data.empty:
            latest_for_year = year_data.iloc[-1]
            yearly_data.append({
                'date': str(year),  # Just the year for our chart
                'price': latest_for_year['price'],
            })
    
    return yearly_data

def calculate_power_law(price_data):
    """
    Calculate the power law projection based on historical data
    """
    # Extract years and prices
    years = np.array([float(item['date']) for item in price_data])
    prices = np.array([float(item['price']) for item in price_data])
    
    # Apply log transformation for power law fitting
    log_years = np.log(years - 2008)  # Adjust years to start from Bitcoin's creation
    log_prices = np.log(prices)
    
    # Fit linear regression on log-transformed data
    model = LinearRegression()
    # Reshape for scikit-learn
    model.fit(log_years.reshape(-1, 1), log_prices)
    
    # Extract power law parameters
    alpha = model.coef_[0]
    beta = np.exp(model.intercept_)
    
    # Generate power law projections including future years
    all_years = list(range(int(min(years)), 2031))  # Project up to 2030
    
    result = []
    
    for year in all_years:
        year_data = {
            'date': str(year),
            'powerLaw': beta * ((year - 2008) ** alpha)
        }
        
        actual_price = next((item['price'] for item in price_data if item['date'] == str(year)), None)
        if actual_price is not None:
            year_data['price'] = actual_price
            
        result.append(year_data)
    
    return result