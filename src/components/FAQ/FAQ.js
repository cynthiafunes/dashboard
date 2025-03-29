import React, { useState } from 'react';
import './FAQ.css';
import FAQItem from './FAQItem';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'What is Bitcoin and how does it work?',
      answer: `Bitcoin is a decentralized digital currency that operates without a central authority like a government or bank. 
      
      It works using a technology called blockchain, which is a distributed ledger that records all transactions across a network of computers. This makes Bitcoin transparent, secure, and resistant to censorship.
      
      When someone sends Bitcoin, the transaction is verified by network participants called "miners" who solve complex mathematical problems. Once verified, the transaction is added to a "block" and linked to previous blocks, forming a chain.`
    },
    {
      id: 2,
      question: 'What gives Bitcoin value?',
      answer: `Bitcoin derives its value from several key factors:

      • Scarcity: There will only ever be 21 million bitcoins, making it a scarce resource similar to gold.
      
      • Utility: Bitcoin can be used as a medium of exchange for goods and services, a store of value, and a unit of account.
      
      • Network effects: As more people use and accept Bitcoin, its value and utility increase.
      
      • Production cost: The energy and computational resources required to "mine" new bitcoins establish a floor for its price.
      
      • Trust and consensus: People trust that Bitcoin will maintain its value because of its decentralized nature and the security of its blockchain.`
    },
    {
      id: 3,
      question: 'How secure is Bitcoin?',
      answer: `Bitcoin is secured through several layers of protection:

      • Cryptography: Bitcoin uses advanced mathematical encryption to secure transactions and control the creation of new coins.
      
      • Decentralization: The Bitcoin network is distributed across thousands of computers worldwide, making it extremely difficult to attack or shut down.
      
      • Proof-of-Work: Miners must solve complex problems that require significant computational power, making it economically impractical to attempt to manipulate the blockchain.
      
      • Immutability: Once a transaction is confirmed and added to the blockchain, it cannot be altered or reversed.
      
      While the Bitcoin protocol itself has never been hacked, third-party services like exchanges can be vulnerable if they don't implement proper security measures.`
    },
    {
      id: 4,
      question: 'What\'s the environmental impact?',
      answer: `Bitcoin mining consumes significant energy because of its Proof-of-Work consensus mechanism. Key points to understand:

      • Energy consumption: Bitcoin's network currently uses roughly as much electricity as some small countries.
      
      • Renewable energy: Many mining operations use renewable energy sources like hydroelectric, solar, or wind power.
      
      • Location optimization: Miners often set up in regions with excess energy capacity or where energy would otherwise be wasted.
      
      • Efficiency improvements: Mining hardware continues to become more energy-efficient over time.
      
      • Value proposition: Supporters argue that Bitcoin's benefits as a global, censorship-resistant monetary system justify its energy usage.
      
      The environmental impact remains debated, with ongoing efforts to make Bitcoin mining more sustainable.`
    },
    {
      id: 5,
      question: 'How volatile is Bitcoin\'s price?',
      answer: `Bitcoin is known for its price volatility:

      • Historical fluctuations: Bitcoin has experienced several boom and bust cycles, with price changes of 20-30% in a single day not uncommon.
      
      • Maturing market: As the Bitcoin market has grown, some analysts suggest volatility has decreased compared to its early years.
      
      • Market factors: Price movements are influenced by regulatory news, technological developments, macroeconomic trends, and market sentiment.
      
      • Emerging asset class: As a relatively new asset, Bitcoin is still finding its price discovery through market mechanisms.
      
      • Long-term trend: Despite short-term volatility, Bitcoin has appreciated significantly over longer time frames, following patterns that some describe as a power law growth curve.`
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-section panel">
      <h2 className="faq-header">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map(faq => (
          <FAQItem 
            key={faq.id}
            faq={faq}
            isExpanded={expandedId === faq.id}
            onToggle={() => toggleExpand(faq.id)}
          />
        ))}
      </div>
      <div className="view-all-container">
        <button className="view-all-btn primary">View All FAQs</button>
      </div>
    </div>
  );
};

export default FAQ;