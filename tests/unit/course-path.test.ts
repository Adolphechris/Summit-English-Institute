import { DAY_TO_LEVEL, getDayTitle, getLevelForDay, MAX_DAYS } from '@/lib/coursePath';

describe('Course Path — mapping jours → niveaux', () => {
  it('should expose exactly 20 days', () => {
    expect(DAY_TO_LEVEL).toHaveLength(20);
    expect(MAX_DAYS).toBe(20);
  });

  it('should only map to valid levels (1..8)', () => {
    DAY_TO_LEVEL.forEach((level) => {
      expect(level).toBeGreaterThanOrEqual(1);
      expect(level).toBeLessThanOrEqual(8);
    });
  });

  it('should cover exactly the 8 levels of the programme', () => {
    const levels = new Set(DAY_TO_LEVEL);
    expect(levels.size).toBe(8);
  });

  it('should start with the diagnostic (day 1 = level 1)', () => {
    expect(getLevelForDay(1)).toBe(1);
  });

  it('should end with the final assessment (day 20 = level 8)', () => {
    expect(getLevelForDay(20)).toBe(8);
  });

  it('should be monotonic non-decreasing (progression logique)', () => {
    for (let i = 1; i < DAY_TO_LEVEL.length; i++) {
      expect(DAY_TO_LEVEL[i]).toBeGreaterThanOrEqual(DAY_TO_LEVEL[i - 1]);
    }
  });

  it('should provide a title for every day', () => {
    for (let day = 1; day <= MAX_DAYS; day++) {
      expect(getDayTitle(day)).not.toBe(`Jour ${day}`);
    }
  });

  it('should be consistent between DAY_TO_LEVEL and getLevelForDay', () => {
    DAY_TO_LEVEL.forEach((level, index) => {
      expect(getLevelForDay(index + 1)).toBe(level);
    });
  });
});
