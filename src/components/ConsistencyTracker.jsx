import React from 'react';


const ConsistencyTracker = () => {
  // Sample data - in a real app, this would come from an API
  const yearData = {
    year: 2024,
    totalSubmissions: 1589,
    totalActiveDays: 256,
    maxStreak: 33,
    months: {
      Jan: generateMonthData(31, [5, 10, 3, 8, 1]), // 31 days, random activity
      Feb: generateMonthData(29, [2, 7, 4, 6]),     // 2024 is a leap year
      Mar: generateMonthData(31, [9, 12, 5, 3]),
      Apr: generateMonthData(30, [1, 4, 7, 2]),
      May: generateMonthData(31, [8, 15, 6, 4]),
      Jun: generateMonthData(30, [3, 9, 5, 1]),
      Jul: generateMonthData(31, [10, 7, 12, 8]),
      Aug: generateMonthData(31, [4, 6, 9, 3]),
      Sep: generateMonthData(30, [7, 2, 5, 8]),
      Oct: generateMonthData(31, [11, 9, 6, 4]),
      Nov: generateMonthData(30, [3, 8, 2, 5]),
      Dec: generateMonthData(31, [12, 7, 9, 6])
    }
  };

  // Helper function to generate month data with varying activity levels
  function generateMonthData(daysInMonth, activityLevels) {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // Randomly assign activity levels (0-4) where 0 = no activity
      const randomLevel = Math.random() > 0.7 ? 
        activityLevels[Math.floor(Math.random() * activityLevels.length)] : 0;
      
      days.push({
        day: i,
        count: randomLevel
      });
    }
    return days;
  }

  // Get color based on question count (similar to LeetCode)
  const getColor = (count) => {
    if (count === 0) return '#ebedf0'; // No activity
    if (count <= 2) return '#9be9a8';   // Light green (1-2 questions)
    if (count <= 4) return '#40c463';   // Medium green (3-4 questions)
    if (count <= 6) return '#30a14e';   // Dark green (5-6 questions)
    return '#216e39';                   // Very dark green (7+ questions)
  };

  return (
    <div className="tracker-container">
      <div className="header">
        <h1>{yearData.totalSubmissions.toLocaleString()} submissions in {yearData.year}</h1>
      </div>
      
      <div className="stats">
        <div className="stat-item">Total active days: {yearData.totalActiveDays}</div>
        <div className="stat-item">Max streak: {yearData.maxStreak}</div>
      </div>
      
      <div className="year">{yearData.year}</div>
      
      <div className="months-grid">
        {Object.entries(yearData.months).map(([monthName, days]) => (
          <div key={monthName} className="month-container">
            <div className="month-name">{monthName}</div>
            <div className="days-grid">
              {days.map(day => (
                <div 
                  key={day.day} 
                  className="day-box"
                  style={{ backgroundColor: getColor(day.count) }}
                  title={`${monthName} ${day.day}: ${day.count} ${day.count === 1 ? 'question' : 'questions'} solved`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div 
            key={level} 
            className="legend-box" 
            style={{ backgroundColor: getColor(level) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ConsistencyTracker;