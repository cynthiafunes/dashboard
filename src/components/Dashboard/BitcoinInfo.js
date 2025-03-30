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
          Bitcoin is an electronic payment system that allows anyone to create an account and send any amount of money to anyone in the world.
          It was created as an alternative to the current financial system. 
          </p>
          <p>
          In the current system we have a small number of large banks that control who can create an account and what transactions you can make. 
          This centralizes the control of money, and we have no other option but to trust these banks to act fairly and responsibly.
          </p>
          <button className="learn-more-btn">Learn More →</button>
        </div>
      </div>
    </div>
  );
};

export default BitcoinInfo;