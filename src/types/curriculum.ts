export type GradeLevel = 6 | 7 | 8 | 9;

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface CodeSimulation {
  title: string;
  lang: string;
  code: string;
  description: string;
  interactiveType: 'smart_home' | 'irrigation_system' | 'circuit_breaker' | 'career_matrix' | 'generic';
}

export interface Lesson {
  id: string;
  grade: GradeLevel;
  chapterId: string;
  chapterTitle: string;
  lessonNumber: number;
  title: string;
  moduleCode: string;
  description: string;
  summary: string[];
  keyPoints: string[];
  specs: SpecItem[];
  practicalProject?: string;
  codeSimulation?: CodeSimulation;
  quiz: QuizQuestion[];
  isCustomAdded?: boolean;
}

export interface Chapter {
  id: string;
  grade: GradeLevel;
  title: string;
  code: string;
  description: string;
  lessons: Lesson[];
}

export interface GradeCurriculum {
  grade: GradeLevel;
  title: string;
  subTitle: string;
  colorScheme: {
    primary: string;
    border: string;
    glow: string;
    badgeBg: string;
    accent: string;
  };
  chapters: Chapter[];
}
