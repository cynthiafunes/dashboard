import React, { useState } from 'react';
import './FAQ.css';
import FAQItem from './FAQItem';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'What is Bitcoin and how does it work?',
      answer: `Bitcoin is digital money that runs on a technology called blockchain – think of it as a public ledger maintained by thousands of computers worldwide instead of a bank. When you send Bitcoin, these computers race to solve math puzzles to verify your transaction and add it to the chain. This decentralized system means no single entity controls the network. The computers (miners) that solve the puzzles first get rewarded with new bitcoins, which is how new coins enter circulation, up to the maximum limit of 21 million.`
    },
    {
      id: 2,
      question: 'What gives Bitcoin value?',
      answer: `Bitcoin's value comes from its limited supply (only 21 million will ever exist) and growing demand. Just like gold is valuable because it's scarce and difficult to mine, Bitcoin is digitally scarce and requires significant computing power and electricity to produce. But unlike physical currencies, you can send Bitcoin anywhere in the world within minutes, without banks or middlemen. It's also protected from inflation since governments can't print more of it – making it attractive as a potential "digital gold."`
    },
    {
      id: 3,
      question: 'How secure is Bitcoin?',
      answer: `Bitcoin uses military-grade cryptography that would take today's supercomputers billions of years to crack. Each transaction is secured with a unique digital signature, and the entire network is protected by thousands of computers that constantly verify each other's work. To hack Bitcoin, you'd need to control over 50% of the entire network's computing power simultaneously – which would cost billions and likely crash the value of your stolen coins anyway. This distributed security approach has kept the Bitcoin network uncompromised for over 14 years.`
    },
    {
      id: 4,
      question: 'How is Bitcoin different from traditional money?',
      answer: `Your dollars and euros are controlled by central banks and governments – they can create more at will (potentially causing inflation) and track or block your transactions. Bitcoin operates outside this system. No central authority controls it, transactions can't be censored, and the supply is mathematically fixed. Your Bitcoin is secured by cryptography rather than account numbers and passwords. Traditional money requires trusting banks, credit card companies, and governments – Bitcoin requires trusting mathematics and a distributed network.`
    },
    {
      id: 5,
      question: 'What do all these Bitcoin terms mean?',
      answer: `Bitcoin comes with its own vocabulary that can be confusing for newcomers. Here's what the most common terms actually mean:

Wallet: Not actually a container that holds your coins, but software that manages your private keys. Hot wallets are connected to the internet (convenient but less secure); cold wallets stay offline (more secure).

Blockchain: The public digital ledger that records all Bitcoin transactions. Think of it as a chain of blocks, where each block contains a batch of transactions.

Mining: The process of validating transactions and adding new blocks to the blockchain. Miners use powerful computers to solve complex puzzles, with the winner receiving newly created bitcoins as a reward.

Private Key: A secret number that allows you to spend your Bitcoin, like a master password. If someone gets your private key, they can take your Bitcoin – hence the saying: "not your keys, not your coins."

Public Address: A string of letters and numbers that works like your account number. You share this with others so they can send you Bitcoin.

Nodes: Computers that maintain a copy of the entire blockchain and enforce Bitcoin's rules, acting as the network's auditors.

Satoshi: The smallest unit of Bitcoin. One Bitcoin equals 100 million satoshis, named after Bitcoin's creator.

Seed Phrase: A series of 12-24 random words that can regenerate all the private keys in your wallet. It's your master backup – write it down physically and never share it.

Exchange: A platform where you can buy and sell Bitcoin using traditional currency (like Coinbase or Binance).

HODL: Originally a typo for "hold," now means keeping your Bitcoin long-term regardless of price fluctuations.

Lightning Network: A "layer 2" solution built on top of Bitcoin to make transactions faster and cheaper.

KYC: "Know Your Customer" – the identity verification process required by most exchanges.

FUD: "Fear, Uncertainty, and Doubt" – negative information that may cause panic selling.

Mempool: The waiting area where transactions sit before being confirmed in a block.`
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="faq-section" className="faq-section panel">
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