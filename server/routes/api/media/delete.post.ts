import { defineHandler } from "nitro";
import { readBody, createError } from "nitro/h3";
import { pool } from "../../../utils/db";
import fs from "fs";
import path from "path";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  const id = body?.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const result = await pool.query(`SELECT * FROM "MediaJob" WHERE id = $1`, [id]);
  const job = result.rows[0];

  if (!job) {
    throw createError({ statusCode: 404, statusMessage: "Job not found" });
  }

  const mediaDir = path.resolve(process.cwd(), "public", "media");

  const unlinkIfLocal = (url: string | null | undefined) => {
    if (!url || !url.startsWith("/media/")) return;
    const filePath = path.join(mediaDir, path.basename(url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  };

  unlinkIfLocal(job.audioUrl);
  unlinkIfLocal(job.videoUrl);

  // Borrar foto de portada local solo si ningún otro job la está usando
  if (job.userPhotoUrl && job.userPhotoUrl.startsWith("/media/cover_")) {
    const refCheck = await pool.query(
      `SELECT COUNT(*)::int AS cnt FROM "MediaJob" WHERE "userPhotoUrl" = $1 AND id <> $2`,
      [job.userPhotoUrl, id]
    );
    if ((refCheck.rows[0]?.cnt || 0) === 0) {
      unlinkIfLocal(job.userPhotoUrl);
    }
  }

  await pool.query(`DELETE FROM "MediaJob" WHERE id = $1`, [id]);

  return { ok: true, message: "Job deleted successfully" };
});
