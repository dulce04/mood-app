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
  nextId?: number;
}

export type MoodType =
  | 'joy'        // 기쁨
  | 'sadness'    // 슬픔
  | 'depression' // 우울함
  | 'stressed'   // 스트레스
  | 'calm'       // 편안함
  | 'pride'      // 뿌듯함
  | 'boredom'    // 지루함
  | 'tired'      // 피곤함
  | 'fear';      // 두려움

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