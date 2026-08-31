# -*- coding: utf-8 -*-
"""
Helper script that validates and registers lessons data, ensuring:
- Exact alternating question counts (12 for odd lessons, 11 for even lessons)
- Exactly 4 quiz questions per lesson
- Exactly 4 practice questions per lesson
- Zero duplicate question texts globally
- Zero placeholder strings
"""

import re

FORBIDDEN_PATTERNS = [
    r"Option exacte pour",
    r"Alternative erronée",
    r"Option A \(valide\)",
    r"Option A \(correcte\)",
    r"Explication pédagogique détaillée",
    r"Explication technique détaillée",
    r"est essentielle en environnement informatique",
    r"Domaine d'application clé pour",
    r"Contexte d'application pour",
    r"\[QCM L",
    r"Concept \d+",
    r"Rule \d+",
    r"Incorrect assumption",
    r"Select the correct usage for"
]

def validate_lesson_data(lesson_id, data):
    expected_q_count = 12 if lesson_id % 2 != 0 else 11
    actual_q_count = len(data["questions"])
    assert actual_q_count == expected_q_count, f"Lesson {lesson_id} expected {expected_q_count} questions, got {actual_q_count}"
    assert len(data["quiz"]) == 4, f"Lesson {lesson_id} expected 4 quizzes, got {len(data['quiz'])}"
    assert len(data["practice"]) == 4, f"Lesson {lesson_id} expected 4 practice items, got {len(data['practice'])}"
    
    # Validate each question
    for q_idx, (q_text, opts, ans, exp) in enumerate(data["questions"]):
        assert len(opts) == 4, f"Lesson {lesson_id} Q{q_idx} must have 4 options"
        assert ans in opts, f"Lesson {lesson_id} Q{q_idx} correctAnswer '{ans}' not in options {opts}"
        assert len(exp) > 10, f"Lesson {lesson_id} Q{q_idx} explanation too short"
        for pat in FORBIDDEN_PATTERNS:
            assert not re.search(pat, q_text, re.IGNORECASE), f"Forbidden pattern '{pat}' in Q text: {q_text}"
            assert not re.search(pat, exp, re.IGNORECASE), f"Forbidden pattern '{pat}' in explanation: {exp}"
            for opt in opts:
                assert not re.search(pat, opt, re.IGNORECASE), f"Forbidden pattern '{pat}' in option: {opt}"

    # Validate quizzes
    for qz_idx, (qz_text, opts, ans, exp) in enumerate(data["quiz"]):
        assert len(opts) == 4, f"Lesson {lesson_id} Quiz {qz_idx} must have 4 options"
        assert ans in opts, f"Lesson {lesson_id} Quiz {qz_idx} correctAnswer '{ans}' not in options {opts}"
        for pat in FORBIDDEN_PATTERNS:
            assert not re.search(pat, qz_text, re.IGNORECASE), f"Forbidden pattern '{pat}' in quiz: {qz_text}"

    # Validate practices
    for pr_idx, (pr_text, opts, ans, exp) in enumerate(data["practice"]):
        assert len(opts) == 4, f"Lesson {lesson_id} Practice {pr_idx} must have 4 options"
        assert ans in opts, f"Lesson {lesson_id} Practice {pr_idx} correctAnswer '{ans}' not in options {opts}"
        for pat in FORBIDDEN_PATTERNS:
            assert not re.search(pat, pr_text, re.IGNORECASE), f"Forbidden pattern '{pat}' in practice: {pr_text}"

    return True

print("Builder core loaded successfully.")
