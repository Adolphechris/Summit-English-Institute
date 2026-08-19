// ============================================================================
// Client PostgreSQL
// ============================================================================

import { Pool, PoolClient } from 'pg';
import { config } from '@/lib/config';

// Pool de connexions
export const pool = new Pool({
  connectionString: config.database.url,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Types pour les requêtes
export type QueryResult<T = any> = {
  rows: T[];
  rowCount: number;
};

/**
 * Exécuter une requête SELECT
 */
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] ${duration}ms: ${text}`);
    }
    return result.rows as T[];
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
    throw error;
  }
}

/**
 * Exécuter une requête INSERT/UPDATE/DELETE
 */
export async function execute(text: string, params?: any[]): Promise<{ rowCount: number }> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] ${duration}ms: ${text}`);
    }
    return { rowCount: result.rowCount ?? 0 };
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
    throw error;
  }
}

/**
 * Récupérer un seul résultat
 */
export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Vérifier la connexion
 */
export async function checkConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

/**
 * Exécuter une suite d'opérations dans une transaction atomique.
 * Les requêtes passées au callback utilisent le client transactionnel
 * (`client.query`) : toute erreur annule l'ensemble (ROLLBACK).
 */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
