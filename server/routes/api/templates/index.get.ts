import { defineHandler } from "nitro";
import { pool, ensureSchema } from "../../../utils/db";

export default defineHandler(async () => {
  try {
    await ensureSchema();
    const result = await pool.query('SELECT * FROM "CustomTemplate" ORDER BY "createdAt" DESC');

    return result.rows.map((row) => ({
      id: `db_${row.id}`,
      name: row.name,
      bgUrl: row.bgUrl,
      ...row.config,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
});
