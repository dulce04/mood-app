import React, { useCallback, useMemo, useState } from 'react';
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
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const monthRange = useMemo(() => {
    const first = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const last = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return { first, last };
  }, [currentDate]);

  const gridRange = useMemo(() => {
    const start = new Date(monthRange.first);
    start.setDate(start.getDate() - monthRange.first.getDay());
    const end = new Date(monthRange.last);
    end.setDate(end.getDate() + (6 - monthRange.last.getDay()));
    return { start, end };
  }, [monthRange]);

  const calendarDays = useMemo<Date[]>(() => { 
    const days: Date[] = [];
    const iter = new Date(gridRange.start);
    while (iter <= gridRange.end) {
      days.push(new Date(iter));
      iter.setDate(iter.getDate() + 1);
    }
    return days;
  }, [gridRange]);

  const moodEntryByDate = useMemo<Record<string, MoodEntry>>(() => {
    return moodHistory.reduce<Record<string, MoodEntry>>((map, entry) => {
      map[entry.date] = entry;
      return map;
    }, {});
  }, [moodHistory]);

  const getMoodEntryForDate = useCallback((date: Date): MoodEntry | undefined => {
    return moodEntryByDate[dateToYYYYMMDD(date)];
  }, [moodEntryByDate]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(previousDate => {
      const nextDate = new Date(previousDate);
      nextDate.setMonth(nextDate.getMonth() + (direction === 'prev' ? -1 : 1));
      return nextDate;
    });
  }, []);

  const formatMonthYear = useCallback((date: Date) => {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
  }, []);

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }, []);

  const isCurrentMonth = useCallback((date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  }, [currentDate]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('모든 기분 기록을 삭제하시겠습니까?')) {
      clearHistory();
    }
  }, [clearHistory]);

  const handleSelectDate = useCallback((entry?: MoodEntry) => {
    if (entry) setSelectedEntry(entry);
  }, []);

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
                aria-label="이전 달"
              >
                <ChevronLeft size={20} />
              </button>
              
              <h2 className="month-title">
                {formatMonthYear(currentDate)}
              </h2>
              
              <button
                onClick={() => navigateMonth('next')}
                className="btn btn-secondary nav-button"
                aria-label="다음 달"
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
                    onClick={() => handleSelectDate(moodEntry)}
                    className={`calendar-day ${isTodayDate ? 'today' : ''} ${!isCurrentMonthDate ? 'other-month' : ''} ${moodEntry ? 'has-mood' : ''}`}
                    style={{ background: moodEntry ? moodEntry.result.gradient : undefined }}
                    aria-label={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${moodEntry ? '기록 있음' : '기록 없음'}`}
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
                  aria-label="선택 닫기"
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