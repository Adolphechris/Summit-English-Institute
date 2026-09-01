'use client';

// ============================================================================
// Hook useApi — cache en mémoire stale-while-revalidate (sans dépendance)
// 1er affichage  : spinner/squelette le temps du fetch
// Raffraîchit en arrière-plan à chaque montage → navigation instantanée
// ============================================================================

import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from './apiClient';

const cache = new Map<string, unknown>();
const inflight = new Map<string, Promise<unknown>>();

function fetchAndStore<T>(path: string): Promise<T> {
  const existing = inflight.get(path);
  if (existing) return existing as Promise<T>;
  const p = apiFetch<T>(path)
    .then((data) => {
      cache.set(path, data);
      return data;
    })
    .finally(() => {
      inflight.delete(path);
    });
  inflight.set(path, p as Promise<unknown>);
  return p;
}

export function useApi<T = unknown>(path: string | null) {
  // Paint immédiat depuis le cache si disponible
  const [data, setData] = useState<T | undefined>(() =>
    path ? (cache.get(path) as T | undefined) : undefined
  );
  const [error, setError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!path) return;
    let alive = true;
    setError('');
    setData(cache.get(path) as T | undefined);
    fetchAndStore<T>(path)
      .then((d) => {
        if (alive) setData(d);
      })
      .catch((e) => {
        if (alive) setError(e?.message || 'Erreur de chargement');
      });
    return () => {
      alive = false;
    };
  }, [path, reloadToken]);

  /** Revalider depuis le réseau */
  const refresh = useCallback(() => setReloadToken((t) => t + 1), []);

  /** Mettre à jour le cache localement (optimiste) puis notifier */
  const mutate = useCallback(
    (updater: (current: T | undefined) => T | undefined) => {
      setData((current) => {
        const next = updater(current);
        if (path) cache.set(path, next as T);
        return next;
      });
    },
    [path]
  );

  // isLoading = true uniquement si aucune donnée en cache (1er chargement)
  const isLoading = !!path && data === undefined && !error;

  return { data, error, isLoading, refresh, mutate };
}
