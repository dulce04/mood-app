import React from 'react';
import type { MoodType } from '../types';

interface HealingMessageProps {
  mood: MoodType;
}

export const HealingMessage: React.FC<HealingMessageProps> = ({ mood }) => {
  const getHealingMessage = (mood: MoodType) => {
    const messages = {
      happy: {
        title: '☀️ 오늘의 명상',
        message: '작은 기쁨들을 마음에 담아보세요.',
        tip: '주변의 아름다운 것들에 감사하는 마음을.'
      },
      calm: {
        title: '🌊 마음의 평화',
        message: '고요함 속에서 마음을 정리해보세요.',
        tip: '깊은 호흡을 하며 마음의 소리에 귀 기울여.'
      },
      energetic: {
        title: '🔥 에너지 충전',
        message: '새로운 도전에 용기를 내보세요.',
        tip: '당신 안의 무한한 가능성을 믿어.'
      },
      peaceful: {
        title: '🌿 자연과 함께',
        message: '자연의 소리에 귀 기울여보세요.',
        tip: '마음의 평화를 찾는 아름다운 시간.'
      },
      creative: {
        title: '🌈 창의력 깨우기',
        message: '새로운 관점으로 세상을 바라보세요.',
        tip: '상상의 날개를 펼쳐보세요.'
      },
      melancholy: {
        title: '🌙 깊은 사색',
        message: '조용한 시간을 가지며 마음을 정리해보세요.',
        tip: '진정한 자신을 만나는 시간.'
      }
    };
    
    return messages[mood] || messages.happy;
  };

  const healingData = getHealingMessage(mood);

  return (
    <div className="healing-message">
      <div className="glass-card healing-container">
        <h3 className="healing-title">
          {healingData.title}
        </h3>
        <p className="healing-text">
          {healingData.message}
        </p>
        <div className="healing-tip">
          <span className="tip-text">{healingData.tip}</span>
        </div>
      </div>
    </div>
  );
}; 