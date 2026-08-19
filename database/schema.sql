-- ============================================================================
-- Summit English Institute — Schéma PostgreSQL
-- Version: 1.0
-- Description: Schéma complet du centre de formation en anglais informatique
--              et professionnel. Conforme aux tranches 3 à 6 du cahier des charges.
-- ============================================================================

-- ============================================================================
-- 1. UTILISATEURS ET AUTHENTIFICATION
-- ============================================================================

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'teacher')),
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    preferred_language VARCHAR(10) DEFAULT 'fr',
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at   TIMESTAMP
);

CREATE TABLE sessions (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token           VARCHAR(255) NOT NULL UNIQUE,
    expires_at      TIMESTAMP NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- ============================================================================
-- 2. FORMATIONS
-- ============================================================================

CREATE TABLE courses (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    version         VARCHAR(20) NOT NULL DEFAULT '1.0',
    max_days        INTEGER NOT NULL DEFAULT 20,
    passing_score   INTEGER NOT NULL DEFAULT 75 CHECK (passing_score BETWEEN 0 AND 100),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. NIVEAUX
-- ============================================================================

CREATE TABLE levels (
    id              SERIAL PRIMARY KEY,
    course_id       INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    number          INTEGER NOT NULL,
    title           VARCHAR(255) NOT NULL,
    objective       TEXT,
    description     TEXT,
    passing_score   INTEGER NOT NULL DEFAULT 75 CHECK (passing_score BETWEEN 0 AND 100),
    order_index     INTEGER NOT NULL,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(course_id, number)
);

CREATE INDEX idx_levels_course_id ON levels(course_id);

-- ============================================================================
-- 4. MODULES
-- ============================================================================

CREATE TABLE modules (
    id              SERIAL PRIMARY KEY,
    level_id        INTEGER NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    objective       TEXT,
    description     TEXT,
    order_index     INTEGER NOT NULL,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_modules_level_id ON modules(level_id);

-- ============================================================================
-- 5. LEÇONS
-- ============================================================================

CREATE TABLE lessons (
    id              SERIAL PRIMARY KEY,
    module_id       INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    objective       TEXT NOT NULL,
    explanation     TEXT NOT NULL,
    examples        JSONB,
    vocabulary      JSONB,
    expressions     JSONB,
    it_context      TEXT,
    practice        JSONB,
    summary         TEXT,
    order_index     INTEGER NOT NULL,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    version         INTEGER NOT NULL DEFAULT 1,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lessons_module_id ON lessons(module_id);

-- ============================================================================
-- 6. COMPÉTENCES (SKILLS)
-- ============================================================================

CREATE TABLE skills (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(100) UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    domain          VARCHAR(100) NOT NULL,
    category        VARCHAR(100),
    difficulty      VARCHAR(20) DEFAULT 'B' CHECK (difficulty IN ('A', 'B', 'C', 'D')),
    is_critical     BOOLEAN NOT NULL DEFAULT FALSE,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_skills_domain ON skills(domain);
CREATE INDEX idx_skills_code ON skills(code);

-- ============================================================================
-- 7. VOCABULAIRE
-- ============================================================================

CREATE TABLE vocabulary (
    id              SERIAL PRIMARY KEY,
    word            VARCHAR(255) NOT NULL,
    pronunciation   VARCHAR(255),
    definition      TEXT NOT NULL,
    translation     TEXT,
    example         TEXT,
    it_example      TEXT,
    category        VARCHAR(100),
    domain          VARCHAR(100),
    level           VARCHAR(20) DEFAULT 'A' CHECK (level IN ('A', 'B', 'C', 'D')),
    skill_id        INTEGER REFERENCES skills(id) ON DELETE SET NULL,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vocabulary_domain ON vocabulary(domain);
CREATE INDEX idx_vocabulary_skill_id ON vocabulary(skill_id);

-- ============================================================================
-- 8. EXPRESSIONS
-- ============================================================================

CREATE TABLE expressions (
    id              SERIAL PRIMARY KEY,
    expression      VARCHAR(500) NOT NULL,
    meaning         TEXT NOT NULL,
    context         TEXT,
    example         TEXT,
    category        VARCHAR(100),
    classification VARCHAR(50) NOT NULL DEFAULT 'general' CHECK (classification IN ('general', 'professional', 'it', 'cybersecurity', 'academic')),
    difficulty      VARCHAR(20) DEFAULT 'B' CHECK (difficulty IN ('A', 'B', 'C', 'D')),
    skill_id        INTEGER REFERENCES skills(id) ON DELETE SET NULL,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_expressions_classification ON expressions(classification);
CREATE INDEX idx_expressions_skill_id ON expressions(skill_id);

-- ============================================================================
-- 9. QUESTIONS
-- ============================================================================

CREATE TABLE questions (
    id              SERIAL PRIMARY KEY,
    type            VARCHAR(50) NOT NULL CHECK (type IN (
                        'multiple_choice', 'fill_blank', 'matching', 'ordering',
                        'transformation', 'error_correction', 'translation',
                        'sentence_building', 'scenario', 'production'
                    )),
    question_text   TEXT NOT NULL,
    context         TEXT,
    difficulty      VARCHAR(20) NOT NULL DEFAULT 'B' CHECK (difficulty IN ('A', 'B', 'C', 'D')),
    skill_id        INTEGER NOT NULL REFERENCES skills(id) ON DELETE RESTRICT,
    lesson_id       INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
    explanation     TEXT,
    tags            TEXT[], -- Array de tags pour recherche
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    version         INTEGER NOT NULL DEFAULT 1,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_questions_skill_id ON questions(skill_id);
CREATE INDEX idx_questions_lesson_id ON questions(lesson_id);
CREATE INDEX idx_questions_type ON questions(type);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_tags ON questions USING GIN(tags);

-- ============================================================================
-- 10. RÉPONSES (OPTIONS)
-- ============================================================================

CREATE TABLE answers (
    id              SERIAL PRIMARY KEY,
    question_id     INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    answer_text     TEXT NOT NULL,
    is_correct      BOOLEAN NOT NULL DEFAULT FALSE,
    order_index     INTEGER,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_answers_question_id ON answers(question_id);

-- ============================================================================
-- 11. ÉVALUATIONS (ASSESSMENTS)
-- ============================================================================

CREATE TABLE assessments (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(50) NOT NULL CHECK (assessment_type IN (
                        'micro_check', 'lesson_quiz', 'module_assessment',
                        'level_assessment', 'cumulative_review', 'final_assessment'
                    )),
    level_id        INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    module_id       INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    lesson_id       INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    passing_score   INTEGER NOT NULL DEFAULT 75 CHECK (passing_score BETWEEN 0 AND 100),
    question_count  INTEGER,
    time_limit_minutes INTEGER,
    distribution    JSONB, -- Distribution des questions par compétence/difficulté
    is_cumulative   BOOLEAN NOT NULL DEFAULT FALSE,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assessments_level_id ON assessments(level_id);
CREATE INDEX idx_assessments_module_id ON assessments(module_id);
CREATE INDEX idx_assessments_lesson_id ON assessments(lesson_id);
CREATE INDEX idx_assessments_type ON assessments(assessment_type);

-- ============================================================================
-- 12. QUESTIONS DANS LES ÉVALUATIONS
-- ============================================================================

CREATE TABLE assessment_questions (
    id              SERIAL PRIMARY KEY,
    assessment_id   INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_id     INTEGER NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    order_index     INTEGER NOT NULL,
    weight          INTEGER NOT NULL DEFAULT 1,
    UNIQUE(assessment_id, question_id)
);

CREATE INDEX idx_assessment_questions_assessment_id ON assessment_questions(assessment_id);

-- ============================================================================
-- 13. TENTATIVES (ATTEMPTS)
-- ============================================================================

CREATE TABLE attempts (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_id   INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    started_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at     TIMESTAMP,
    score           INTEGER CHECK (score BETWEEN 0 AND 100),
    status          VARCHAR(50) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    result          VARCHAR(50) CHECK (result IN ('passed', 'failed', 'pending')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_attempts_user_id ON attempts(user_id);
CREATE INDEX idx_attempts_assessment_id ON attempts(assessment_id);
CREATE INDEX idx_attempts_user_assessment ON attempts(user_id, assessment_id);

-- ============================================================================
-- 14. RÉPONSES DE L'ÉTUDIANT
-- ============================================================================

CREATE TABLE attempt_answers (
    id              SERIAL PRIMARY KEY,
    attempt_id      INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
    question_id     INTEGER NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    given_answer    TEXT,
    is_correct      BOOLEAN,
    skill_id        INTEGER REFERENCES skills(id) ON DELETE SET NULL,
    error_type      VARCHAR(100), -- temps, auxiliaire, vocabulaire, préposition, ordre, compréhension, contexte
    points_earned   INTEGER DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_attempt_answers_attempt_id ON attempt_answers(attempt_id);
CREATE INDEX idx_attempt_answers_question_id ON attempt_answers(question_id);
CREATE INDEX idx_attempt_answers_skill_id ON attempt_answers(skill_id);
CREATE INDEX idx_attempt_answers_error_type ON attempt_answers(error_type);

-- ============================================================================
-- 15. PROGRESSION GÉNÉRALE
-- ============================================================================

CREATE TABLE progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    current_level   INTEGER DEFAULT 1,
    current_day     INTEGER DEFAULT 1,
    overall_progress INTEGER DEFAULT 0 CHECK (overall_progress BETWEEN 0 AND 100),
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at    TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_course_id ON progress(course_id);

-- ============================================================================
-- 16. PROGRESSION PAR COMPÉTENCE (MAÎTRISE)
-- ============================================================================

CREATE TABLE skill_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id        INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    mastery_score   INTEGER DEFAULT 0 CHECK (mastery_score BETWEEN 0 AND 100),
    mastery_status  VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (mastery_status IN (
                        'new', 'learning', 'practicing', 'stable', 'mastered', 'review_required'
                    )),
    attempt_count   INTEGER NOT NULL DEFAULT 0,
    correct_count   INTEGER NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMP,
    next_review_at  TIMESTAMP,
    priority        VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('critical', 'high', 'normal', 'low')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, skill_id)
);

CREATE INDEX idx_skill_progress_user_id ON skill_progress(user_id);
CREATE INDEX idx_skill_progress_skill_id ON skill_progress(skill_id);
CREATE INDEX idx_skill_progress_status ON skill_progress(mastery_status);
CREATE INDEX idx_skill_progress_next_review ON skill_progress(next_review_at);

-- ============================================================================
-- 17. ÉLÉMENTS DE RÉVISION
-- ============================================================================

CREATE TABLE review_items (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id        INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    error_type      VARCHAR(100),
    error_count     INTEGER NOT NULL DEFAULT 1,
    last_error_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    last_result     INTEGER CHECK (last_result BETWEEN 0 AND 100),
    priority        VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (priority IN ('critical', 'high', 'normal', 'low')),
    status          VARCHAR(50) NOT NULL DEFAULT 'due' CHECK (status IN ('due', 'in_review', 'mastered', 'dismissed')),
    scheduled_for   TIMESTAMP,
    completed_at    TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_review_items_user_id ON review_items(user_id);
CREATE INDEX idx_review_items_skill_id ON review_items(skill_id);
CREATE INDEX idx_review_items_status ON review_items(status);
CREATE INDEX idx_review_items_scheduled ON review_items(scheduled_for);

-- ============================================================================
-- 18. PROGRESSION PAR NIVEAU
-- ============================================================================

CREATE TABLE level_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level_id        INTEGER NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    is_started      BOOLEAN NOT NULL DEFAULT FALSE,
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    best_score      INTEGER CHECK (best_score BETWEEN 0 AND 100),
    attempt_count   INTEGER NOT NULL DEFAULT 0,
    completed_at    TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, level_id)
);

CREATE INDEX idx_level_progress_user_id ON level_progress(user_id);
CREATE INDEX idx_level_progress_level_id ON level_progress(level_id);

-- ============================================================================
-- 19. PROGRESSION PAR MODULE
-- ============================================================================

CREATE TABLE module_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module_id       INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    is_started      BOOLEAN NOT NULL DEFAULT FALSE,
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    best_score      INTEGER CHECK (best_score BETWEEN 0 AND 100),
    completed_at    TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, module_id)
);

CREATE INDEX idx_module_progress_user_id ON module_progress(user_id);
CREATE INDEX idx_module_progress_module_id ON module_progress(module_id);

-- ============================================================================
-- 20. PROGRESSION PAR LEÇON
-- ============================================================================

CREATE TABLE lesson_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id       INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    is_started      BOOLEAN NOT NULL DEFAULT FALSE,
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    best_score      INTEGER CHECK (best_score BETWEEN 0 AND 100),
    completed_at    TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);

-- ============================================================================
-- 21. CERTIFICATS / ATTESTATIONS
-- ============================================================================

CREATE TABLE certificates (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    certificate_code VARCHAR(100) UNIQUE NOT NULL,
    final_score     INTEGER NOT NULL CHECK (final_score BETWEEN 0 AND 100),
    status          VARCHAR(50) NOT NULL DEFAULT 'issued' CHECK (status IN ('issued', 'revoked')),
    issued_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_certificates_user_id ON certificates(user_id);
CREATE INDEX idx_certificates_code ON certificates(certificate_code);

-- ============================================================================
-- 22. ACHIEVEMENTS (BADGES)
-- ============================================================================

CREATE TABLE achievements (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(100) UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    icon            VARCHAR(255),
    criteria        JSONB,
    status          VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_achievements (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id  INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);

-- ============================================================================
-- 23. JOURNAL DES MODIFICATIONS (VERSIONNAGE)
-- ============================================================================

CREATE TABLE content_versions (
    id              SERIAL PRIMARY KEY,
    content_type    VARCHAR(100) NOT NULL, -- 'lesson', 'question', 'vocabulary', 'expression'
    content_id      INTEGER NOT NULL,
    version         INTEGER NOT NULL,
    change_summary  TEXT,
    changed_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_versions_content ON content_versions(content_type, content_id);

-- ============================================================================
-- 24. FONCTIONS UTILITAIRES
-- ============================================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_levels_updated_at BEFORE UPDATE ON levels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vocabulary_updated_at BEFORE UPDATE ON vocabulary FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expressions_updated_at BEFORE UPDATE ON expressions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_progress_updated_at BEFORE UPDATE ON skill_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_review_items_updated_at BEFORE UPDATE ON review_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_level_progress_updated_at BEFORE UPDATE ON level_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_module_progress_updated_at BEFORE UPDATE ON module_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 25. DONNÉES INITIALES
-- ============================================================================

-- Cours principal
INSERT INTO courses (title, description, version, max_days, passing_score) VALUES (
    'English for IT & Cybersecurity',
    'Formation intensive de 20 jours en anglais professionnel, informatique et cybersécurité.',
    '1.0',
    20,
    75
);

-- Compétences fondamentales
INSERT INTO skills (code, name, description, domain, category, difficulty, is_critical) VALUES
('grammar.present_simple', 'Present Simple', 'Formation et utilisation du Present Simple', 'grammar', 'tenses', 'A', TRUE),
('grammar.present_continuous', 'Present Continuous', 'Formation et utilisation du Present Continuous', 'grammar', 'tenses', 'A', FALSE),
('grammar.past_simple', 'Past Simple', 'Formation et utilisation du Past Simple', 'grammar', 'tenses', 'A', TRUE),
('grammar.past_continuous', 'Past Continuous', 'Formation et utilisation du Past Continuous', 'grammar', 'tenses', 'B', FALSE),
('grammar.present_perfect', 'Present Perfect', 'Formation et utilisation du Present Perfect', 'grammar', 'tenses', 'B', FALSE),
('grammar.future_will', 'Future with will', 'Formation et utilisation du future avec will', 'grammar', 'tenses', 'A', FALSE),
('grammar.future_going_to', 'Future with going to', 'Formation et utilisation du future avec going to', 'grammar', 'tenses', 'A', FALSE),
('grammar.modals', 'Modal Verbs', 'Utilisation des modaux : can, could, may, might, must, should, would', 'grammar', 'modals', 'A', TRUE),
('grammar.questions', 'Question Formation', 'Construction des questions en anglais', 'grammar', 'questions', 'A', TRUE),
('grammar.negation', 'Negation', 'Construction de la négation en anglais', 'grammar', 'negation', 'A', TRUE),
('grammar.articles', 'Articles', 'Utilisation de a, an, the', 'grammar', 'articles', 'B', FALSE),
('grammar.prepositions', 'Prepositions', 'Prépositions fréquentes : in, on, at, to, for, with, by...', 'grammar', 'prepositions', 'B', FALSE),
('grammar.connectors', 'Connectors', 'Connecteurs logiques : and, but, because, so, although...', 'grammar', 'connectors', 'B', FALSE),
('grammar.comparatives', 'Comparatives and Superlatives', 'Formation des comparatifs et superlatifs', 'grammar', 'comparatives', 'B', FALSE),
('grammar.conditionals', 'Conditionals', 'Conditionnels fonctionnels', 'grammar', 'conditionals', 'B', FALSE),
('grammar.passive', 'Passive Voice', 'Voix passive utile', 'grammar', 'passive', 'B', FALSE),
('grammar.pronouns', 'Pronouns', 'Pronoms personnels, possessifs, démonstratifs', 'grammar', 'pronouns', 'A', FALSE),
('conjugation.irregular_verbs', 'Irregular Verbs', 'Verbes irréguliers essentiels', 'conjugation', 'irregular', 'A', TRUE),
('conjugation.auxiliaries', 'Auxiliaries', 'BE, DO, HAVE comme auxiliaires', 'conjugation', 'auxiliaries', 'A', TRUE),
('conjugation.verb_patterns', 'Verb Patterns', 'Patterns fonctionnels : need to, want to, try to...', 'conjugation', 'patterns', 'B', FALSE),
('conversation.basics', 'Conversation Basics', 'Répondre, questionner, demander, clarifier', 'conversation', 'basics', 'A', TRUE),
('conversation.production', 'Active Production', 'Production personnelle de phrases et réponses', 'conversation', 'production', 'A', TRUE),
('conversation.professional', 'Professional Communication', 'Communication en environnement professionnel', 'conversation', 'professional', 'B', FALSE),
('it.vocabulary', 'IT Vocabulary', 'Vocabulaire informatique général', 'it', 'vocabulary', 'A', TRUE),
('it.networking', 'Networking', 'Vocabulaire réseau : server, client, router, firewall...', 'it', 'networking', 'A', TRUE),
('it.operating_systems', 'Operating Systems', 'OS, process, service, terminal, command', 'it', 'os', 'B', FALSE),
('it.development', 'Development', 'Code, repository, branch, commit, merge, deploy', 'it', 'development', 'B', FALSE),
('it.databases', 'Databases', 'Database, table, query, backup, restore', 'it', 'databases', 'B', FALSE),
('it.cloud', 'Cloud', 'Cloud, deployment, instance, scaling, availability', 'it', 'cloud', 'B', FALSE),
('it.support', 'IT Support', 'Situations de support technique', 'it', 'support', 'B', FALSE),
('cybersecurity.fundamentals', 'Security Fundamentals', 'Security, threat, vulnerability, risk, attack', 'cybersecurity', 'fundamentals', 'B', FALSE),
('cybersecurity.operations', 'Security Operations', 'Monitoring, logs, alert, incident, response', 'cybersecurity', 'operations', 'B', FALSE),
('cybersecurity.identity', 'Identity and Access', 'Authentication, authorization, privilege, access control', 'cybersecurity', 'identity', 'B', FALSE),
('cybersecurity.malware', 'Malware and Attacks', 'Malware, ransomware, phishing, exploit', 'cybersecurity', 'malware', 'B', FALSE),
('cybersecurity.actions', 'Security Action Verbs', 'Detect, prevent, protect, monitor, investigate, isolate...', 'cybersecurity', 'actions', 'A', TRUE),
('professional.meetings', 'Meeting English', 'Participating in meetings', 'professional', 'meetings', 'B', FALSE),
('professional.email', 'Email and Messaging', 'Professional written communication', 'professional', 'email', 'B', FALSE),
('academic.instructions', 'Academic Instructions', 'Understanding university instructions', 'academic', 'instructions', 'B', FALSE),
('academic.reading', 'Technical Reading', 'Reading documentation and technical texts', 'academic', 'reading', 'B', FALSE),
('idioms.phrasal_verbs', 'Phrasal Verbs', 'Phrasal verbs fréquents', 'idioms', 'phrasal_verbs', 'B', FALSE),
('idioms.expressions', 'Common Expressions', 'Expressions idiomatiques utiles', 'idioms', 'expressions', 'B', FALSE);

-- Achievements de base
INSERT INTO achievements (code, name, description, criteria) VALUES
('first_login', 'First Steps', 'Complete your first login', '{"type": "login", "count": 1}'),
('first_lesson', 'Learner', 'Complete your first lesson', '{"type": "lesson_complete", "count": 1}'),
('first_assessment', 'Test Taker', 'Complete your first assessment', '{"type": "assessment_complete", "count": 1}'),
('level_1_pass', 'Foundation', 'Pass Level 1', '{"type": "level_pass", "level": 1}'),
('streak_3', 'Consistent', '3 days in a row', '{"type": "streak", "days": 3}'),
('streak_7', 'Dedicated', '7 days in a row', '{"type": "streak", "days": 7}'),
('perfect_score', 'Perfect', 'Get 100% on an assessment', '{"type": "perfect_score", "count": 1}'),
('course_complete', 'Graduate', 'Complete the full program', '{"type": "course_complete", "count": 1}');

-- ============================================================================
-- FIN DU SCHÉMA
-- ============================================================================
