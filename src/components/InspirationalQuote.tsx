import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { getRandomQuoteByMood } from '../utils/moodData';
import type { InspirationalQuote, MoodType } from '../types';

interface InspirationalQuoteComponentProps {
  mood: MoodType;
}

export interface InspirationalQuoteRef {
  getCurrentQuote: () => InspirationalQuote | undefined;
}

export const InspirationalQuoteComponent = forwardRef<InspirationalQuoteRef, InspirationalQuoteComponentProps>(
  ({ mood }, ref) => {
    const [currentQuote, setCurrentQuote] = useState<InspirationalQuote | undefined>(
      () => getRandomQuoteByMood(mood)
    );

    useImperativeHandle(ref, () => ({
      getCurrentQuote: () => currentQuote
    }));

    const handleRefresh = () => {
      const newQuote = getRandomQuoteByMood(mood);
      if (newQuote && newQuote.id !== currentQuote?.id) {
        setCurrentQuote(newQuote);
      }
    };

    if (!currentQuote) {
      return null;
    }

    return (
      <div className="inspirational-quote">
        <div className="quote-header">
          <h3>💭 오늘의 문구</h3>
          <div className="quote-actions">
            <button onClick={handleRefresh} className="refresh-button">
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        <div className="quote-content">
          <p className="quote-text">
            {currentQuote.text}
          </p>
        </div>
      </div>
    );
  }
); 