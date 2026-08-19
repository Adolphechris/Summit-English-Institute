-- ============================================================================
-- Comptes de test — Summit English Institute
-- Mot de passe test1234 => $2a$10$xo2ios5sxGgOmS9c.p/gdedBkTFOX0zuhsAAv3ASVNdXT8kw0lGxW
-- Mot de passe admin1234 => $2a$10$sfQgqHEwdiymJPw8bfxhDuecmcOtyr5zIZAl8e4aAdEFQH5DS68JG
-- Idempotent : peut être exécuté plusieurs fois sans doublon.
-- ============================================================================

-- ============================================================================
-- Étudiant de test
-- ============================================================================

INSERT INTO users (email, password_hash, first_name, last_name, role, status, preferred_language)
VALUES (
  'test@summit-english.local',
  '$2a$10$xo2ios5sxGgOmS9c.p/gdedBkTFOX0zuhsAAv3ASVNdXT8kw0lGxW',
  'Test',
  'User',
  'student',
  'active',
  'fr'
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  status = 'active';

-- ============================================================================
-- Administrateur de test
-- ============================================================================

INSERT INTO users (email, password_hash, first_name, last_name, role, status, preferred_language)
VALUES (
  'admin@summit-english.local',
  '$2a$10$sfQgqHEwdiymJPw8bfxhDuecmcOtyr5zIZAl8e4aAdEFQH5DS68JG',
  'Admin',
  'Summit',
  'admin',
  'active',
  'fr'
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  status = 'active';

-- ============================================================================
-- Initialiser la progression pour l'utilisateur test
-- ============================================================================

INSERT INTO progress (user_id, course_id, current_level, current_day, overall_progress, is_completed)
SELECT id, 1, 1, 1, 0, false FROM users WHERE email = 'test@summit-english.local'
ON CONFLICT (user_id, course_id) DO NOTHING;

-- ============================================================================
-- Initialiser les niveaux de progression
-- ============================================================================

INSERT INTO level_progress (user_id, level_id, is_started, is_completed)
SELECT u.id, l.id, true, false
FROM users u
CROSS JOIN levels l
WHERE u.email = 'test@summit-english.local'
  AND l.course_id = 1
ON CONFLICT (user_id, level_id) DO NOTHING;
