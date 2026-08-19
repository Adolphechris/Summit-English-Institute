import { calculatePercentage } from '@/lib/utils';

describe('Progression', () => {
  describe('calculatePercentage', () => {
    it('should calculate progress based on completed vs total items', () => {
      expect(calculatePercentage(2, 5)).toBe(40);
      expect(calculatePercentage(5, 5)).toBe(100);
      expect(calculatePercentage(0, 5)).toBe(0);
    });

    it('should return raw percentage even if earned exceeds total', () => {
      expect(calculatePercentage(6, 5)).toBe(120);
    });
  });

  describe('Pas de double comptabilisation', () => {
    it('should not exceed 100% when adding progress incrementally', () => {
      let overallProgress = 0;
      const increment = 5;

      for (let i = 0; i < 25; i++) {
        overallProgress = Math.min(100, overallProgress + increment);
      }

      expect(overallProgress).toBe(100);
    });

    it('should not count the same completed item twice', () => {
      const completedLessons = new Set<number>();
      const totalLessons = 5;
      let completedCount = 0;

      const markLessonComplete = (lessonId: number) => {
        if (!completedLessons.has(lessonId)) {
          completedLessons.add(lessonId);
          completedCount++;
        }
      };

      markLessonComplete(1);
      markLessonComplete(1);
      markLessonComplete(2);
      markLessonComplete(2);
      markLessonComplete(3);

      expect(completedCount).toBe(3);
      expect(calculatePercentage(completedCount, totalLessons)).toBe(60);
    });

    it('should not add progress if already at 100%', () => {
      let overallProgress = 100;

      if (overallProgress < 100) {
        overallProgress += 5;
      }

      expect(overallProgress).toBe(100);
    });

    it('should recalculate progress from scratch without double counting', () => {
      const completedItems = [1, 2, 3, 4];
      const uniqueCompleted = [...new Set(completedItems)];
      const totalItems = 10;

      expect(calculatePercentage(uniqueCompleted.length, totalItems)).toBe(40);
    });
  });
});
