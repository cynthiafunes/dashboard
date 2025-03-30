from flask import Flask, jsonify
from flask_cors import CORS
import os
import requests
from analysis.power_law import get_bitcoin_price_data, calculate_power_law

app = Flask(__name__)
CORS(app)

@app.route('/api/bitcoin/price-data', methods=['GET'])
def get_bitcoin_data():
    try:
        # Get historical bitcoin price data
        price_data = get_bitcoin_price_data()
        
        # Calculate power law projection
        data_with_power_law = calculate_power_law(price_data)
        
        return jsonify({
            'success': True,
            'data': data_with_power_law
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/bitcoin/metrics', methods=['GET'])
def get_bitcoin_metrics():
    try:
        response = requests.get('https://blockchain.info/stats?format=json')
        
        if response.status_code != 200:
            raise Exception(f"API request failed with status code {response.status_code}")
        
        blockchain_stats = response.json()
        
        print("Blockchain.info API response:", blockchain_stats)
        
        # Calculate the percentage of mined bitcoins
        total_supply_satoshis = blockchain_stats.get('totalbc', 19500000 * 100000000)  # Fallback value
        total_supply_btc = total_supply_satoshis / 100000000
        max_supply = 21000000 
        supply_percentage = (total_supply_btc / max_supply) * 100
        
        # Based on observations and documentation, the hash_rate is in TH/s (Terahash)
        # We need to convert to EH/s (1 EH/s = 1,000,000 TH/s)
        hash_rate = blockchain_stats.get('hash_rate', 525000000)
        print(f"Raw hash_rate value from API: {hash_rate}")
        hash_rate_eh = hash_rate / 1000000
        
        return jsonify({
            'success': True,
            'data': {
                'supply': {
                    'current': round(total_supply_btc),
                    'max': max_supply,
                    'percentage': round(supply_percentage, 1)
                },
                'hashrate': {
                    'current': round(hash_rate_eh, 2),
                    'unit': 'EH/s'
                },
                'market_data': {
                    'price_usd': blockchain_stats.get('market_price_usd'),
                    'volume_usd': blockchain_stats.get('trade_volume_usd')
                },
                'network': {
                    'difficulty': blockchain_stats.get('difficulty'),
                    'blocks_mined_last_24h': blockchain_stats.get('n_blocks_mined'),
                    'minutes_between_blocks': blockchain_stats.get('minutes_between_blocks')
                }
            }
        })
    except Exception as e:
        # Fallback to default values if API fails
        return jsonify({
            'success': True,
            'data': {
                'supply': {
                    'current': 19500000,
                    'max': 21000000,
                    'percentage': 92.9
                },
                'hashrate': {
                    'current': 525,
                    'unit': 'EH/s'
                }
            },
            'error': str(e)
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)