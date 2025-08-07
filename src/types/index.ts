export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number;
  mood: MoodType;
}

export type MoodType = 'calm' | 'happy' | 'energetic' | 'peaceful' | 'creative' | 'melancholy';

export interface MoodResult {
  primaryMood: MoodType;
  secondaryMood: MoodType;
  color: string;
  gradient: string;
  description: string;
  date: string;
}

export interface Answer {
  questionId: number;
  selectedOption: QuestionOption;
}

export interface MoodEntry {
  id: string;
  date: string;
  result: MoodResult;
}

export interface InspirationalQuote {
  id: string;
  text: string;
  mood: MoodType;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  external_urls: { spotify: string };
  album: {
    name: string;
    images: Array<{ url: string; width: number; height: number }>;
  };
} 