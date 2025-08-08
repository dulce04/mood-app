import React from 'react';

interface ProgressBarProps {
  completed: number; 
  total: number;
  labelCurrent?: number; 
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, labelCurrent }) => {
  const safeCompleted = Math.min(Math.max(completed, 0), total);
  const progress = total > 0 ? (safeCompleted / total) * 100 : 0;

  return (
    <div className="progress-container">
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}; 