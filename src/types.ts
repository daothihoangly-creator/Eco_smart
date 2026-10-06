export type EnvironmentType = 'acid' | 'neutral' | 'base';

export type IndicatorType = 
  | 'universal' 
  | 'litmus' 
  | 'phenolphthalein' 
  | 'methyl_orange' 
  | 'homemade';

export interface Sample {
  id: string;
  name: string;
  image: string;
  indicatorType: IndicatorType;
  estimatedPH: number;
  environment: EnvironmentType;
  detectedColor: string;
  rgb: [number, number, number];
  hsv: [number, number, number];
  lab: [number, number, number];
  confidence: number;
  timestamp: number;
  note: string;
}

export interface CalibrationColor {
  id: string;
  indicatorType: IndicatorType;
  pH: number;
  rgb: [number, number, number];
  hsv: [number, number, number];
  lab: [number, number, number];
  image?: string;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
  content: string;
  image: string;
  iupacTerms: { term: string; common: string; formula: string; description: string }[];
  quiz: QuizQuestion;
}

export interface ExperimentTask {
  id: string;
  title: string;
  objective: string;
  indicatorType: IndicatorType;
  suggestedMaterial: string;
  expectedPH: string;
  expectedEnvironment: EnvironmentType;
  steps: string[];
  completed: boolean;
  userSampleId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type AppTab = 
  | 'home' 
  | 'camera' 
  | 'result' 
  | 'library' 
  | 'knowledge' 
  | 'experiments' 
  | 'calibration' 
  | 'minigame' 
  | 'teacher';
