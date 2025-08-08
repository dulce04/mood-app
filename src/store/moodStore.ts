import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Answer, MoodResult, MoodEntry } from '../types';
import { getFirstQuestionId } from '../utils/moodData';

interface MoodState {
  answers: Answer[];
  currentQuestionIndex: number;
  currentQuestionId: number;
  result: MoodResult | null;
  moodHistory: MoodEntry[];
  
  // Actions
  addAnswer: (answer: Answer) => void;
  nextQuestion: (nextId: number) => void;
  resetQuiz: () => void;
  setResult: (result: MoodResult) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  clearHistory: () => void;
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      answers: [],
      currentQuestionIndex: 0,
      currentQuestionId: getFirstQuestionId(),
      result: null,
      moodHistory: [],

      addAnswer: (answer) => {
        set((state) => ({
          answers: [...state.answers.filter(a => a.questionId !== answer.questionId), answer]
        }));
      },

      nextQuestion: (nextId) => {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          currentQuestionId: nextId,
        }));
      },

      resetQuiz: () => {
        set({
          answers: [],
          currentQuestionIndex: 0,
          currentQuestionId: getFirstQuestionId(),
          result: null
        });
      },

      setResult: (result) => {
        set({ result });
      },

      addMoodEntry: (entry) => {
        set((state) => ({
          moodHistory: [entry, ...state.moodHistory]
        }));
      },

      clearHistory: () => {
        set({ moodHistory: [] });
      }
    }),
    {
      name: 'mood-storage',
      partialize: (state) => ({ 
        moodHistory: state.moodHistory 
      }),
    }
  )
); 