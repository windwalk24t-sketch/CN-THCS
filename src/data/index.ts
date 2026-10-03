import { GradeCurriculum, GradeLevel, Lesson, Chapter } from '../types/curriculum';
import { grade6Data } from './grade6';
import { grade7Data } from './grade7';
import { grade8Data } from './grade8';
import { grade9Data } from './grade9';

const STORAGE_KEY = 'cong_nghe_thcs_curriculum_v1';

export const defaultCurricula: Record<GradeLevel, GradeCurriculum> = {
  6: grade6Data,
  7: grade7Data,
  8: grade8Data,
  9: grade9Data,
};

export function loadAllCurriculum(): Record<GradeLevel, GradeCurriculum> {
  if (typeof window === 'undefined') return defaultCurricula;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCurricula;
    const parsed = JSON.parse(raw);
    if (parsed && parsed[6] && parsed[7] && parsed[8] && parsed[9]) {
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to load saved curriculum from localStorage, using default', err);
  }
  return defaultCurricula;
}

export function saveAllCurriculum(data: Record<GradeLevel, GradeCurriculum>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save curriculum to localStorage', err);
  }
}

export function resetToDefaultCurriculum(): Record<GradeLevel, GradeCurriculum> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultCurricula;
}

export function exportCurriculumJSON(data: Record<GradeLevel, GradeCurriculum>): string {
  return JSON.stringify(data, null, 2);
}

export function importCurriculumJSON(jsonString: string): Record<GradeLevel, GradeCurriculum> {
  const parsed = JSON.parse(jsonString);
  if (!parsed[6] || !parsed[7] || !parsed[8] || !parsed[9]) {
    throw new Error('Dữ liệu không đúng định dạng môn Công nghệ THCS (thiếu khối lớp 6, 7, 8, hoặc 9)');
  }
  saveAllCurriculum(parsed);
  return parsed;
}

export function saveLesson(
  currentData: Record<GradeLevel, GradeCurriculum>,
  lesson: Lesson
): Record<GradeLevel, GradeCurriculum> {
  const grade = lesson.grade;
  const gradeCurriculum = currentData[grade];
  if (!gradeCurriculum) return currentData;

  const updatedChapters = gradeCurriculum.chapters.map((chapter: Chapter) => {
    if (chapter.id === lesson.chapterId) {
      const existingIndex = chapter.lessons.findIndex((l: Lesson) => l.id === lesson.id);
      let newLessons = [...chapter.lessons];
      if (existingIndex >= 0) {
        newLessons[existingIndex] = lesson;
      } else {
        newLessons.push(lesson);
      }
      return { ...chapter, lessons: newLessons };
    }
    // In case the lesson was moved from another chapter
    return {
      ...chapter,
      lessons: chapter.lessons.filter((l: Lesson) => l.id !== lesson.id),
    };
  });

  const updatedData: Record<GradeLevel, GradeCurriculum> = {
    ...currentData,
    [grade]: {
      ...gradeCurriculum,
      chapters: updatedChapters,
    },
  };

  saveAllCurriculum(updatedData);
  return updatedData;
}

export function deleteLesson(
  currentData: Record<GradeLevel, GradeCurriculum>,
  grade: GradeLevel,
  lessonId: string
): Record<GradeLevel, GradeCurriculum> {
  const gradeCurriculum = currentData[grade];
  if (!gradeCurriculum) return currentData;

  const updatedChapters = gradeCurriculum.chapters.map((chapter: Chapter) => ({
    ...chapter,
    lessons: chapter.lessons.filter((l: Lesson) => l.id !== lessonId),
  }));

  const updatedData: Record<GradeLevel, GradeCurriculum> = {
    ...currentData,
    [grade]: {
      ...gradeCurriculum,
      chapters: updatedChapters,
    },
  };

  saveAllCurriculum(updatedData);
  return updatedData;
}
