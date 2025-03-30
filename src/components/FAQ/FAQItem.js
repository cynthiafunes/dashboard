import React from 'react';
import './FAQItem.css';

const FAQItem = ({ faq, isExpanded, onToggle }) => {
  // For the bitcoin terms FAQ
  if (faq.id === 5) {
    return (
      <div className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
        <div className="faq-question" onClick={onToggle}>
          <h3>{faq.question}</h3>
          <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
        </div>
        {isExpanded && (
          <div className="faq-answer">
            <p>Bitcoin comes with its own vocabulary that can be confusing for newcomers. Here's what the most common terms actually mean:</p>
            
            <div className="bitcoin-terms">
              <div className="term">Wallet</div>
              <div className="definition">Not actually a container that holds your coins, but software that manages your private keys. Hot wallets are connected to the internet (convenient but less secure); cold wallets stay offline (more secure).</div>
              
              <div className="term">Blockchain</div>
              <div className="definition">The public digital ledger that records all Bitcoin transactions. Think of it as a chain of blocks, where each block contains a batch of transactions.</div>
              
              <div className="term">Mining</div>
              <div className="definition">The process of validating transactions and adding new blocks to the blockchain. Miners use powerful computers to solve complex puzzles, with the winner receiving newly created bitcoins as a reward.</div>
              
              <div className="term">Private Key</div>
              <div className="definition">A secret number that allows you to spend your Bitcoin, like a master password. If someone gets your private key, they can take your Bitcoin – hence the saying: "not your keys, not your coins."</div>
              
              <div className="term">Public Address</div>
              <div className="definition">A string of letters and numbers that works like your account number. You share this with others so they can send you Bitcoin.</div>
              
              <div className="term">Nodes</div>
              <div className="definition">Computers that maintain a copy of the entire blockchain and enforce Bitcoin's rules, acting as the network's auditors.</div>
              
              <div className="term">Satoshi</div>
              <div className="definition">The smallest unit of Bitcoin. One Bitcoin equals 100 million satoshis, named after Bitcoin's creator.</div>
              
              <div className="term">Seed Phrase</div>
              <div className="definition">A series of 12-24 random words that can regenerate all the private keys in your wallet. It's your master backup – write it down physically and never share it.</div>
              
              <div className="term">Exchange</div>
              <div className="definition">A platform where you can buy and sell Bitcoin using traditional currency (like Coinbase or Binance).</div>
              
              <div className="term">HODL</div>
              <div className="definition">Originally a typo for "hold," now means keeping your Bitcoin long-term regardless of price fluctuations.</div>
              
              <div className="term">Lightning Network</div>
              <div className="definition">A "layer 2" solution built on top of Bitcoin to make transactions faster and cheaper.</div>
              
              <div className="term">KYC</div>
              <div className="definition">"Know Your Customer" – the identity verification process required by most exchanges.</div>
              
              <div className="term">FUD</div>
              <div className="definition">"Fear, Uncertainty, and Doubt" – negative information that may cause panic selling.</div>
              
              <div className="term">Mempool</div>
              <div className="definition">The waiting area where transactions sit before being confirmed in a block.</div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // For all other FAQs
  return (
    <div className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="faq-question" onClick={onToggle}>
        <h3>{faq.question}</h3>
        <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>
      {isExpanded && (
        <div className="faq-answer">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;