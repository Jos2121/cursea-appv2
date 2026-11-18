import { defineHandler } from "nitro";
import { readBody, createError } from "nitro/h3";
import { pool } from "../../../utils/db";
import fs from "fs";
import path from "path";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  const { id, type } = body;

  if (!id || !['audio', 'video'].includes(type)) {
    throw createError({ statusCode: 400, statusMessage: "ID y tipo (audio/video) son requeridos" });
  }

  const result = await pool.query(`SELECT * FROM "MediaJob" WHERE id = $1`, [id]);
  const job = result.rows[0];

  if (!job) {
    throw createError({ statusCode: 404, statusMessage: "Job no encontrado" });
  }

  const targetUrl = type === 'audio' ? job.audioUrl : job.videoUrl;
  
  if (targetUrl && targetUrl.startsWith("/media/")) {
    const filePath = path.join(process.cwd(), "public", "media", path.basename(targetUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  const field = type === 'audio' ? '"audioUrl"' : '"videoUrl"';
  await pool.query(`UPDATE "MediaJob" SET ${field} = NULL, "updatedAt" = NOW() WHERE id = $1`, [id]);

  return { ok: true, message: `Archivo ${type} eliminado` };
});
