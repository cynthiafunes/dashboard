import React from 'react';
import './BitcoinInfo.css';

const BitcoinInfo = () => {
  return (
    <div className="bitcoin-info">
      <div className="info-header">
        <div className="bitcoin-logo">₿</div>
        <h2>What is Bitcoin?</h2>
      </div>
      <div className="info-content">
        <div className="info-text">
          <p>
            Bitcoin is a decentralized digital currency that enables instant payments to anyone, anywhere in the world without requiring a central authority, like a bank or government.
          </p>
          <p>
            Unlike traditional currencies issued by governments, Bitcoin has a fixed supply limit of 21 million coins, making it inherently resistant to inflation. All transactions are recorded on a public ledger called the blockchain.
          </p>
        </div>
        <div className="bitcoin-features">
          <span>Transparent</span>
          <span>Decentralized</span>
          <span>Fixed Supply</span>
        </div>
      </div>
    </div>
  );
};

export default BitcoinInfo;