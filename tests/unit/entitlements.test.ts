import { canAccessLevelNumber, isPremiumUser } from '@/lib/entitlements';
import { FREE_LEVELS } from '@/lib/constants';

describe('Entitlements — isPremiumUser', () => {
  it('refuse un utilisateur absent ou sans données', () => {
    expect(isPremiumUser(null)).toBe(false);
    expect(isPremiumUser(undefined)).toBe(false);
  });

  it('accepte un utilisateur avec plan premium', () => {
    expect(isPremiumUser({ plan: 'premium' })).toBe(true);
    expect(isPremiumUser({ plan: 'premium', role: 'student' })).toBe(true);
  });

  it('refuse un utilisateur gratuit (plan free ou absent)', () => {
    expect(isPremiumUser({ plan: 'free' })).toBe(false);
    expect(isPremiumUser({})).toBe(false);
  });

  it('le staff admin/teacher contourne le paywall (insensible à la casse)', () => {
    expect(isPremiumUser({ role: 'admin' })).toBe(true);
    expect(isPremiumUser({ role: 'Admin' })).toBe(true);
    expect(isPremiumUser({ role: 'teacher' })).toBe(true);
    expect(isPremiumUser({ role: 'TEACHER' })).toBe(true);
  });

  it('refuse un rôle étudiant même sans plan premium', () => {
    expect(isPremiumUser({ role: 'student' })).toBe(false);
  });
});

describe('Entitlements — canAccessLevelNumber', () => {
  it('niveaux gratuits accessibles même sans compte ni plan', () => {
    for (let level = 1; level <= FREE_LEVELS; level++) {
      expect(canAccessLevelNumber(null, level)).toBe(true);
      expect(canAccessLevelNumber({ plan: 'free' }, level)).toBe(true);
    }
    expect(canAccessLevelNumber(undefined, FREE_LEVELS)).toBe(true);
  });

  it('niveaux payants interdits aux utilisateurs gratuits', () => {
    expect(canAccessLevelNumber(null, FREE_LEVELS + 1)).toBe(false);
    expect(canAccessLevelNumber({ plan: 'free' }, 8)).toBe(false);
  });

  it('niveaux payants accessibles aux utilisateurs premium', () => {
    expect(canAccessLevelNumber({ plan: 'premium' }, FREE_LEVELS + 1)).toBe(true);
    expect(canAccessLevelNumber({ plan: 'premium' }, 8)).toBe(true);
  });

  it('niveaux payants accessibles au staff (bypass)', () => {
    expect(canAccessLevelNumber({ role: 'admin' }, 5)).toBe(true);
    expect(canAccessLevelNumber({ role: 'teacher' }, 8)).toBe(true);
  });
});
