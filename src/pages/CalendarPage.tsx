import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useMoodStore } from '../store/moodStore';
import { dateToYYYYMMDD } from '../utils/dateUtils';
import type { MoodEntry } from '../types';

interface CalendarPageProps {
  onBack: () => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onBack }) => {
  const { moodHistory, clearHistory } = useMoodStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const calendarDays: Date[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    calendarDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const getMoodEntryForDate = (date: Date): MoodEntry | undefined => {
    const dateString = dateToYYYYMMDD(date);
    return moodHistory.find(entry => entry.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handleClearHistory = () => {
    if (window.confirm('모든 기분 기록을 삭제하시겠습니까?')) {
      clearHistory();
    }
  };

  return (
    <div className="calendar-container">
      <div className="container calendar-page-container">
        {/* 헤더 */}
        <div className="calendar-header">
          <Button onClick={onBack} variant="secondary">
            <ArrowLeft size={18} />
          </Button>
          
          <h1 className="title calendar-title">
            📅 기분 캘린더
          </h1>
          
          <Button onClick={handleClearHistory} variant="secondary">
            <Trash2 size={16} />
          </Button>
        </div>

        <div className={selectedEntry ? 'calendar-layout' : 'calendar-layout-single'}>
          <div className="glass-card">
            <div className="month-navigation">
              <button
                onClick={() => navigateMonth('prev')}
                className="btn btn-secondary nav-button"
              >
                <ChevronLeft size={20} />
              </button>
              
              <h2 className="month-title">
                {formatMonthYear(currentDate)}
              </h2>
              
              <button
                onClick={() => navigateMonth('next')}
                className="btn btn-secondary nav-button"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* 요일 헤더 */}
            <div className="weekday-header">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day} className="weekday-cell">
                  {day}
                </div>
              ))}
            </div>

            {/* 캘린더 날짜들 */}
            <div className="calendar-grid">
              {calendarDays.map((date, index) => {
                const moodEntry = getMoodEntryForDate(date);
                const isCurrentMonthDate = isCurrentMonth(date);
                const isTodayDate = isToday(date);

                return (
                  <button
                    key={index}
                    onClick={() => moodEntry && setSelectedEntry(moodEntry)}
                    className={`calendar-day ${isTodayDate ? 'today' : ''} ${!isCurrentMonthDate ? 'other-month' : ''} ${moodEntry ? 'has-mood' : ''}`}
                    style={{
                      background: moodEntry ? moodEntry.result.gradient : undefined
                    }}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 선택된 날짜 정보 */}
          {selectedEntry && moodHistory.length > 0 && (
            <div className="glass-card">
              <div className="entry-header">
                <h3 className="entry-title">
                  {new Date(selectedEntry.date).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </h3>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="close-button"
                >
                  ✕
                </button>
              </div>
              
              <div
                className="mood-preview"
                style={{ background: selectedEntry.result.gradient }}
              >
                <span className="mood-preview-text">
                  {selectedEntry.result.description}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {moodHistory.length === 0 && (
          <div className="glass-card empty-state">
            <p className="empty-title">
              📝 아직 기록이 없습니다
            </p>
            <p className="empty-message">
              테스트를 완료하면 여기에 기록이 나타납니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 