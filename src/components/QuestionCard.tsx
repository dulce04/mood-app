import React from 'react';
import type { Question, QuestionOption } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOption?: QuestionOption;
  onOptionSelect: (option: QuestionOption) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onOptionSelect
}) => {
  return (
    <div className="glass-card">
      <h2 className="question-title">{question.text}</h2>
      
      <div>
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option)}
            className={`option ${selectedOption?.id === option.id ? 'selected' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}; 