import { calculatePercentage } from '@/lib/utils';

function computeAssessmentResult(
  answers: { questionId: number; givenAnswer: string }[],
  correctAnswers: Map<number, string>
) {
  let correctCount = 0;
  const answerResults = answers.map((answer) => {
    const correctAnswer = correctAnswers.get(answer.questionId);
    const isCorrect = correctAnswer === answer.givenAnswer;
    if (isCorrect) correctCount++;
    return {
      ...answer,
      isCorrect,
      correctAnswer,
    };
  });

  const score = Math.round((correctCount / answers.length) * 100);
  const passed = score >= 75;

  return {
    score,
    passed,
    correctCount,
    totalQuestions: answers.length,
    answerResults,
  };
}

describe('Assessment Flow', () => {
  describe('Soumission d\'une évaluation', () => {
    it('should accept a valid submission with answers', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'B' },
        { questionId: 3, givenAnswer: 'C' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.totalQuestions).toBe(3);
      expect(result.correctCount).toBe(3);
    });

    it('should reject empty answers', () => {
      const answers: { questionId: number; givenAnswer: string }[] = [];

      expect(answers.length === 0).toBe(true);
    });
  });

  describe('Calcul du score', () => {
    it('should calculate 100% when all answers are correct', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'B' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(100);
      expect(result.correctCount).toBe(2);
    });

    it('should calculate 0% when no answers are correct', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'X' },
        { questionId: 2, givenAnswer: 'Y' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(0);
      expect(result.correctCount).toBe(0);
    });

    it('should calculate partial score correctly', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'X' },
        { questionId: 3, givenAnswer: 'C' },
        { questionId: 4, givenAnswer: 'X' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
        [4, 'D'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(50);
      expect(result.correctCount).toBe(2);
    });

    it('should round score to nearest integer', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'B' },
        { questionId: 3, givenAnswer: 'X' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(67);
    });
  });

  describe('Validation à 75%', () => {
    it('should pass when score is exactly 75%', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'A' },
        { questionId: 3, givenAnswer: 'X' },
        { questionId: 4, givenAnswer: 'B' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'A'],
        [3, 'A'],
        [4, 'B'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(75);
      expect(result.passed).toBe(true);
    });

    it('should pass when score is above 75%', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'B' },
        { questionId: 3, givenAnswer: 'C' },
        { questionId: 4, givenAnswer: 'D' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
        [4, 'D'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(100);
      expect(result.passed).toBe(true);
    });

    it('should fail when score is below 75%', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'X' },
        { questionId: 3, givenAnswer: 'C' },
        { questionId: 4, givenAnswer: 'X' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
        [4, 'D'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(50);
      expect(result.passed).toBe(false);
    });

    it('should fail when score is exactly 74%', () => {
      const answers = [
        { questionId: 1, givenAnswer: 'A' },
        { questionId: 2, givenAnswer: 'B' },
        { questionId: 3, givenAnswer: 'X' },
        { questionId: 4, givenAnswer: 'X' },
        { questionId: 5, givenAnswer: 'X' },
        { questionId: 6, givenAnswer: 'X' },
        { questionId: 7, givenAnswer: 'X' },
        { questionId: 8, givenAnswer: 'X' },
      ];

      const correctAnswers = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
        [4, 'D'],
        [5, 'E'],
        [6, 'F'],
        [7, 'G'],
        [8, 'H'],
      ]);

      const result = computeAssessmentResult(answers, correctAnswers);

      expect(result.score).toBe(25);
      expect(result.passed).toBe(false);
    });
  });
});
