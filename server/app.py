from flask import Flask, jsonify
from flask_cors import CORS
import os
from analysis.power_law import get_bitcoin_price_data, calculate_power_law

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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
        # Could expand this with more metrics in the future
        return jsonify({
            'success': True,
            'data': {
                'supply': {
                    'current': 19500000,  # This would be fetched from an API in production
                    'max': 21000000,
                    'percentage': 92.9
                },
                'hashrate': {
                    'current': 525,  # In EH/s
                    'unit': 'EH/s'
                }
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)