import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
import { CalendarPage } from './pages/CalendarPage';
import { useMoodStore } from './store/moodStore';
import './App.css';

type AppState = 'home' | 'result' | 'calendar';

function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('home');
  const { resetQuiz } = useMoodStore();

  const handleQuizComplete = () => {
    setCurrentPage('result');
  };

  const handleRestart = () => {
    resetQuiz();
    setCurrentPage('home');
  };

  const handleShowCalendar = () => {
    setCurrentPage('calendar');
  };

  const handleBackFromCalendar = () => {
    setCurrentPage('result');
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage onComplete={handleQuizComplete} />
      )}
      
      {currentPage === 'result' && (
        <ResultPage 
          onRestart={handleRestart}
          onShowCalendar={handleShowCalendar}
        />
      )}
      
      {currentPage === 'calendar' && (
        <CalendarPage onBack={handleBackFromCalendar} />
      )}
    </div>
  );
}

export default App;
