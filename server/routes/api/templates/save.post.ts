import { defineHandler } from "nitro";
import { readBody, createError } from "nitro/h3";
import { pool } from "../../../utils/db";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  const name = body.name?.trim() || `Plantilla ${new Date().toLocaleDateString()}`;
  const config = body.config || body;
  const bgUrl = config.bgUrl || config.backgroundUrl || "";

  try {
    // Make sure the table exists to avoid errors on first run
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "CustomTemplate" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        "bgUrl" TEXT NOT NULL,
        config JSONB NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);

    const result = await pool.query(
      `INSERT INTO "CustomTemplate" (name, "bgUrl", config, "createdAt")
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [name, bgUrl, typeof config === "string" ? config : JSON.stringify(config)]
    );
    return { ok: true, template: result.rows[0] };
  } catch (err: any) {
    console.error("Error guardando plantilla en DB:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Error al guardar en base de datos"
    });
  }
});
