import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Store from './components/Store';
import CalendarView from './components/CalendarView';
import './App.css';
import ConsistencyTracker from './components/ConsistencyTracker';

function App() {
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState('');
  const [showStore, setShowStore] = useState(false);
  const [activityHistory, setActivityHistory] = useState([]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('codingTrackerData');
    if (storedData) {
      const { streak, coins, lastActiveDate, activityHistory } = JSON.parse(storedData);
      setStreak(streak);
      setCoins(coins);
      setLastActiveDate(lastActiveDate);
      setActivityHistory(activityHistory || []);
      
      // Check if streak should be reset
      checkStreakValidity(lastActiveDate);
    }
  }, []);

  const checkStreakValidity = (lastDate) => {
    if (!lastDate) return;
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastDate !== today && lastDate !== yesterdayStr) {
      setStreak(0);
      saveToLocalStorage(0, coins, lastDate, activityHistory);
    }
  };

  const handleProblemSolved = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already solved today
    if (lastActiveDate === today) return;
    
    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const newStreak = lastActiveDate === yesterdayStr ? streak + 1 : 1;
    
    // Calculate coins earned (base + streak bonus)
    const baseCoins = 10;
    const streakBonus = Math.min(newStreak * 2, 50); // Max 50 coin bonus
    const coinsEarned = baseCoins + streakBonus;
    
    // Update activity history
    const newActivityHistory = [...activityHistory, { date: today, problemsSolved: 1 }];
    
    // Update state
    setStreak(newStreak);
    setCoins(coins + coinsEarned);
    setLastActiveDate(today);
    setActivityHistory(newActivityHistory);
    
    // Save to localStorage
    saveToLocalStorage(newStreak, coins + coinsEarned, today, newActivityHistory);
  };

  const saveToLocalStorage = (streak, coins, lastActiveDate, activityHistory) => {
    localStorage.setItem('codingTrackerData', JSON.stringify({
      streak,
      coins,
      lastActiveDate,
      activityHistory
    }));
  };

  const handleRedeemItem = (cost) => {
    if (coins >= cost) {
      const newCoins = coins - cost;
      setCoins(newCoins);
      saveToLocalStorage(streak, newCoins, lastActiveDate, activityHistory);
      return true;
    }
    return false;
  };

  return (
    <div className="app min-h-screen ">
      <Navbar 
        streak={streak} 
        coins={coins} 
        onShowStore={() => setShowStore(true)} 
      />
      
  
      <div className='flex '>
  <div className="w-[80%]">
    <ConsistencyTracker   
  activityData={[
  { date: '2024-06-01', level: 0 },
  { date: '2024-06-02', level: 1 },
  { date: '2024-06-03', level: 2 },
  { date: '2024-06-04', level: 3 },
  { date: '2024-06-05', level: 4 },
]}
    />
  </div>


        {/* Sidebar */}
        <div className='sidebar p- border-l border-gray-800'>
          <div className="action-section mb-6">
            <button 
              className="solve-btn w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
              onClick={handleProblemSolved}
            >
              ✅ Problem Solved Today
            </button>
          </div>
          
          <div>
            <CalendarView activityHistory={activityHistory} />
          </div>
        </div>
      </div>

      {showStore && (
        <Store 
          coins={coins} 
          onClose={() => setShowStore(false)} 
          onRedeem={handleRedeemItem}
        />
      )}
    </div>
  );
}

export default App;