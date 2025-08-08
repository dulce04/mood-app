import React, { useMemo, useCallback } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { useMoodStore } from '../store/moodStore';
import { generateMoodResult, getQuizQuestions, getQuestionById, getLongestPathLenFrom } from '../utils/moodData';
import type { QuestionOption } from '../types';

interface HomePageProps {
  onComplete: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onComplete }) => {
  const { 
    answers, 
    currentQuestionIndex, 
    currentQuestionId,
    addAnswer, 
    nextQuestion, 
    setResult 
  } = useMoodStore();

  const currentQuestion = useMemo(() => getQuestionById(currentQuestionId) ?? getQuizQuestions()[currentQuestionIndex], [currentQuestionId, currentQuestionIndex]);
  const totalPlanned = useMemo(() => currentQuestionIndex + getLongestPathLenFrom(currentQuestionId), [currentQuestionIndex, currentQuestionId]);
  const selectedOption = useMemo(() => {
    return answers.find(a => a.questionId === currentQuestion?.id)?.selectedOption;
  }, [answers, currentQuestion?.id]);

  const handleOptionSelect = useCallback((option: QuestionOption) => {
    if (!currentQuestion) return;

    addAnswer({
      questionId: currentQuestion.id,
      selectedOption: option
    });

    const nextId = option.nextId;
    if (!nextId) {
      const result = generateMoodResult([...answers, { questionId: currentQuestion.id, selectedOption: option }]);
      setResult(result);
      onComplete();
    } else {
      nextQuestion(nextId);
    }
  }, [currentQuestion, addAnswer, answers, setResult, onComplete, nextQuestion]);

  if (!currentQuestion) {
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
        <ProgressBar completed={currentQuestionIndex} total={totalPlanned} />

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