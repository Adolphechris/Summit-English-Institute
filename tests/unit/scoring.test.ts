import { calculatePercentage, formatPercentage, getScoreStatus } from '@/lib/utils';

describe('getScoreStatus', () => {
  it('should return "excellent" for score >= 95', () => {
    expect(getScoreStatus(95)).toBe('excellent');
    expect(getScoreStatus(100)).toBe('excellent');
  });

  it('should return "strong" for score >= 85 and < 95', () => {
    expect(getScoreStatus(85)).toBe('strong');
    expect(getScoreStatus(90)).toBe('strong');
    expect(getScoreStatus(94)).toBe('strong');
  });

  it('should return "passed" for score >= threshold and < 85', () => {
    expect(getScoreStatus(75)).toBe('passed');
    expect(getScoreStatus(80)).toBe('passed');
    expect(getScoreStatus(84)).toBe('passed');
  });

  it('should return "remediation" for score >= 60 and < threshold', () => {
    expect(getScoreStatus(60)).toBe('remediation');
    expect(getScoreStatus(70)).toBe('remediation');
    expect(getScoreStatus(74)).toBe('remediation');
  });

  it('should return "failed" for score < 60', () => {
    expect(getScoreStatus(0)).toBe('failed');
    expect(getScoreStatus(50)).toBe('failed');
    expect(getScoreStatus(59)).toBe('failed');
  });

  it('should use custom threshold', () => {
    expect(getScoreStatus(70, 70)).toBe('passed');
    expect(getScoreStatus(69, 70)).toBe('remediation');
  });
});

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(5, 10)).toBe(50);
    expect(calculatePercentage(3, 4)).toBe(75);
    expect(calculatePercentage(100, 100)).toBe(100);
  });

  it('should return 0 when total is 0', () => {
    expect(calculatePercentage(0, 0)).toBe(0);
    expect(calculatePercentage(5, 0)).toBe(0);
  });

  it('should return 0 when earned is 0', () => {
    expect(calculatePercentage(0, 10)).toBe(0);
  });

  it('should round to nearest integer', () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });
});

describe('formatPercentage', () => {
  it('should format with 0 decimals by default', () => {
    expect(formatPercentage(50)).toBe('50%');
    expect(formatPercentage(75)).toBe('75%');
  });

  it('should format with specified decimals', () => {
    expect(formatPercentage(75.5, 1)).toBe('75.5%');
    expect(formatPercentage(33.333, 1)).toBe('33.3%');
    expect(formatPercentage(33.333, 2)).toBe('33.33%');
  });

  it('should handle integer values with decimals parameter', () => {
    expect(formatPercentage(100, 1)).toBe('100.0%');
  });
});
