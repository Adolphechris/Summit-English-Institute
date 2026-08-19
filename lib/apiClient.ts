// ============================================================================
// Client API côté navigateur — token + gestion centralisée des erreurs
// ============================================================================

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Authentification par cookie httpOnly posé par /api/auth/login & /api/auth/register.
  // Le token JWT n'est JAMAIS stocké côté client (protection contre le vol par XSS).
  const response = await fetch(path, { ...options, headers, credentials: 'include' });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new ApiError(401, 'Non authentifié');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({} as { error?: string }));
    throw new ApiError(response.status, data.error || 'Erreur serveur');
  }

  return response.json() as Promise<T>;
}

/**
 * Helpers conservés pour compatibilité descendante.
 * Le token vit désormais dans un cookie httpOnly inaccessible au JS :
 * ces fonctions ne manipulent plus localStorage.
 */
export function getToken(): string | null {
  return null;
}

export function setToken(_token: string): void {
  // No-op : le cookie httpOnly est posé par la réponse serveur.
}

export function clearToken(): void {
  // No-op : le cookie est supprimé par POST /api/auth/logout.
}
