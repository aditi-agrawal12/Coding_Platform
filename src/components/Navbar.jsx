// components/Navbar.js
import React from 'react';
import StreakCounter from './StreakCounter';
import CoinCounter from './CoinCounter';

function Navbar({ streak, coins, onShowStore }) {
  return (
    <nav className="navbar w-full">
      <div className="navbar-brand text-black">CodeHurdle</div>
      <div className="navbar-stats">
        <StreakCounter streak={streak} />
        <CoinCounter coins={coins} onShowStore={onShowStore} />
      </div>
    </nav>
  );
}

export default Navbar;