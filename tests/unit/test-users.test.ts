import * as fs from 'fs';
import * as path from 'path';

describe('Comptes de test (seeds)', () => {
  const sql = fs.readFileSync(
    path.join(process.cwd(), 'database', 'seeds', 'test_users.sql'),
    'utf-8'
  );

  it('should contain at least 2 valid bcrypt hashes (60 characters)', () => {
    const hashes = sql.match(/\$2[aby]\$\d+\$[.\/A-Za-z0-9]{53}/g) || [];
    expect(hashes.length).toBeGreaterThanOrEqual(2);
    hashes.forEach((hash) => expect(hash).toHaveLength(60));
  });

  it('should not contain the old placeholder 106-character hash', () => {
    expect(sql.includes('rQJ8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8')).toBe(false);
  });

  it('should be idempotent (uses ON CONFLICT)', () => {
    expect(sql.includes('ON CONFLICT')).toBe(true);
  });
});
