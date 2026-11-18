import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX || 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

let schemaReadyPromise: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      try {
        await pool.query(`
          ALTER TABLE "MediaJob"
            ADD COLUMN IF NOT EXISTS "source" TEXT,
            ADD COLUMN IF NOT EXISTS "config" JSONB,
            ADD COLUMN IF NOT EXISTS "backgroundUrl" TEXT,
            ADD COLUMN IF NOT EXISTS "userPhotoUrl" TEXT,
            ADD COLUMN IF NOT EXISTS "titulo" TEXT,
            ADD COLUMN IF NOT EXISTS "artista" TEXT,
            ADD COLUMN IF NOT EXISTS "dedicatoria" TEXT;
        `);
      } catch (e) {
        console.warn("Schema check warning (MediaJob):", e);
      }

      try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS "CustomTemplate" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            "bgUrl" TEXT NOT NULL,
            config JSONB NOT NULL,
            "createdAt" TIMESTAMP DEFAULT NOW()
          );
        `);
      } catch (e) {
        console.warn("Schema check warning (CustomTemplate):", e);
      }
    })();
  }
  return schemaReadyPromise;
}
