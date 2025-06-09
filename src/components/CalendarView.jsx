import React from 'react';

function CalendarView({ activityHistory }) {
  // Get current month and year
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Create array of dates with activity
  const activeDates = activityHistory.map(activity => activity.date);

  // Generate calendar days
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isActive = activeDates.includes(dateStr);
    const isToday = dateStr === today.toISOString().split('T')[0];
    
    return (
      <div 
        key={day} 
        className={`calendar-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}`}
      >
        {day}
      </div>
    );
  });

  return (
    <div className="calendar-view">
      <h3>Activity Calendar</h3>
      <div className="calendar-grid">
        {calendarDays}
      </div>
    </div>
  );
}

export default CalendarView;