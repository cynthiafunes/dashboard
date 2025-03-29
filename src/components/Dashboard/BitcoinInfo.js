import React from 'react';
import './BitcoinInfo.css';

const BitcoinInfo = () => {
  return (
    <div className="bitcoin-info">
      <h2>What is Bitcoin?</h2>
      <div className="info-content">
        <div className="bitcoin-logo">₿</div>
        <div className="info-text">
          <p>
            Bitcoin is a decentralized digital currency that operates without
            a central authority. It uses blockchain technology to record
            all transactions permanently.
          </p>
          <p>
            Created in 2009 by an unknown person or group using the name Satoshi Nakamoto,
            Bitcoin introduced a revolutionary way to transfer value without intermediaries.
          </p>
          <button className="learn-more-btn">Learn More →</button>
        </div>
      </div>
    </div>
  );
};

export default BitcoinInfo;