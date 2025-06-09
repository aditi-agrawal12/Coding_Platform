import React from 'react';

function CoinCounter({ coins, onShowStore }) {
  return (
    <div className="coin-counter">
      <div className="coin-display" onClick={onShowStore}>
        <span className="coin-icon">💰</span>
        <span className="coin-number">{coins}</span>
      </div>
      <p className="coin-label"></p>
    </div>
  );
}

export default CoinCounter;