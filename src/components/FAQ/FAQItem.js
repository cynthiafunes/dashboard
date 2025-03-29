import React from 'react';
import './FAQItem.css';

const FAQItem = ({ faq, isExpanded, onToggle }) => {
  return (
    <div className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="faq-question" onClick={onToggle}>
        <h3>{faq.question}</h3>
        <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>
      {isExpanded && (
        <div className="faq-answer">
          {faq.answer.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQItem;