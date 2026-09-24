import { defineHandler } from "nitro";
import { readBody, createError } from "nitro/h3";
import { pool } from "../../../utils/db";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  const { id, prompt } = body;

  if (!id || prompt === undefined) {
    throw createError({ statusCode: 400, statusMessage: "ID y prompt son requeridos" });
  }

  try {
    const result = await pool.query(
      `UPDATE "MediaJob" SET prompt = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING *`,
      [prompt, id]
    );

    if (result.rowCount === 0) {
      throw createError({ statusCode: 404, statusMessage: "Registro no encontrado" });
    }

    return { success: true, job: result.rows[0] };
  } catch (error) {
    console.error("Error updating prompt:", error);
    throw createError({ statusCode: 500, statusMessage: "Error en la base de datos al actualizar" });
  }
});
