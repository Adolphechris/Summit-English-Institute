// ============================================================================
// Validation des entrées côté serveur
// ============================================================================

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

export function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 8 && password.length <= 72;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizeName(value?: unknown, max = 100): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}
