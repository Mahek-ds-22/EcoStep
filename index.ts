export interface UserData {
  id: string;
  name: string;
  email?: string;
  language: 'en' | 'hi' | 'es';
  totalScore: number;
  currentStreak: number;
  longestStreak: number;
  points: number;
  badges: Badge[];
  history: FootprintEntry[];
  createdAt: Date;
}

export interface FootprintEntry {
  id: string;
  date: string;
  answers: QuizAnswers;
  score: number;
  breakdown: {
    transport: number;
    diet: number;
    energy: number;
    habits: number;
  };
  tips: string[];
  offsetSuggestions: OffsetSuggestion[];
}

export interface QuizAnswers {
  transport: number;
  diet: number;
  energy: number;
  habits: number;
  [key: string]: number;
}

export interface Question {
  id: string;
  category: 'transport' | 'diet' | 'energy' | 'habits';
  text: {
    en: string;
    hi: string;
    es: string;
  };
  options: {
    text: {
      en: string;
      hi: string;
      es: string;
    };
    value: number;
  }[];
}

export interface Badge {
  id: string;
  name: {
    en: string;
    hi: string;
    es: string;
  };
  description: {
    en: string;
    hi: string;
    es: string;
  };
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface OffsetSuggestion {
  id: string;
  title: {
    en: string;
    hi: string;
    es: string;
  };
  description: {
    en: string;
    hi: string;
    es: string;
  };
  cost: number;
  currency: string;
  impact: string;
  provider: string;
  url: string;
}