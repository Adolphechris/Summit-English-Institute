-- ============================================================================
-- Migration 001 — Évaluation finale (id=999)
-- Requise pour le certificat (voir lib/constants.ts : finalAssessmentId = 999)
-- Idempotente : peut être exécutée plusieurs fois.
-- ============================================================================

INSERT INTO assessments (id, title, assessment_type, passing_score, question_count, is_cumulative, status)
VALUES (999, 'Final Assessment — English for IT & Cybersecurity', 'final_assessment', 75, 50, true, 'active')
ON CONFLICT (id) DO NOTHING;