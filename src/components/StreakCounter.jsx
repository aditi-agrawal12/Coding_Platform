import React from 'react';

function StreakCounter({ streak }) {
  return (
    <div className="streak-counter">
      <div className="streak-display">
        <span className="fire-icon">🔥</span>
        <span className="streak-number">{streak}</span>
      </div>
      <p className="streak-label"></p>
    </div>
  );
}

export default StreakCounter;