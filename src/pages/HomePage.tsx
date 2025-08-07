import React, { useState, useEffect } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { useMoodStore } from '../store/moodStore';
import { generateMoodResult, getQuizQuestions } from '../utils/moodData';
import type { QuestionOption } from '../types';

interface HomePageProps {
  onComplete: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onComplete }) => {
  const { 
    answers, 
    currentQuestionIndex, 
    addAnswer, 
    nextQuestion, 
    setResult 
  } = useMoodStore();

  const [selectedOption, setSelectedOption] = useState<QuestionOption | undefined>(
    answers.find(a => a.questionId === getQuizQuestions()[currentQuestionIndex]?.id)?.selectedOption
  );

  const currentQuestion = getQuizQuestions()[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= getQuizQuestions().length - 1;

  useEffect(() => {
    const existingAnswer = answers.find(a => a.questionId === currentQuestion?.id);
    setSelectedOption(existingAnswer?.selectedOption);
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handleOptionSelect = (option: QuestionOption) => {
    setSelectedOption(option);
    if (currentQuestion) {
      addAnswer({
        questionId: currentQuestion.id,
        selectedOption: option
      });
      
      if (isLastQuestion) {
        const result = generateMoodResult(answers);
        setResult(result);
        onComplete();
      } else {
        nextQuestion();
      }
    }
  };

  if (currentQuestionIndex >= getQuizQuestions().length) {
    return null;
  }

  return (
    <div className="center">
      <div className="container">
        {/* 헤더 */}
        <div className="home-container">
          <h1 className="title">🎨 오늘의 기분은 무슨 색일까</h1>
          <p className="subtitle">질문에 답하고 당신의 기분을 색깔로 확인해보세요</p>
        </div>

        {/* 프로그레스 바 */}
        <ProgressBar 
          current={currentQuestionIndex} 
          total={getQuizQuestions().length} 
        />

        {/* 질문 카드 */}
        <QuestionCard
          question={currentQuestion}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
        />
      </div>
    </div>
  );
}; 