import { defineHandler } from "nitro";
import { readMultipartFormData, createError } from "nitro/h3";
import { pool } from "../../../utils/db";
import { randomUUID } from "crypto";
import fs from "node:fs/promises";
import path from "node:path";

export default defineHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No form data provided" });
  }

  // Encontrar archivo y número de whatsapp
  const fileField = formData.find((field) => field.name === "audioFile");
  const whatsappField = formData.find((field) => field.name === "whatsappNumber");
  const jobIdField = formData.find((field) => field.name === "jobId");

  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, statusMessage: "No audio file found in request" });
  }

  const whatsappNumber = whatsappField ? new TextDecoder().decode(whatsappField.data) : null;
  const existingJobId = jobIdField ? new TextDecoder().decode(jobIdField.data) : null;

  // Directorio de destino
  const mediaDir = path.resolve(process.cwd(), "public/media");
  await fs.mkdir(mediaDir, { recursive: true }).catch(() => {});

  const ext = path.extname(fileField.filename || ".mp3") || ".mp3";
  const fileName = `audio_upload_${Date.now()}${ext}`;
  const relativeUrl = `/media/${fileName}`;
  const filePath = path.join(mediaDir, fileName);

  // Guardar archivo
  await fs.writeFile(filePath, fileField.data);

  let finalJobId = existingJobId || randomUUID();

  if (existingJobId) {
    await pool.query(
      `UPDATE "MediaJob" SET "audioUrl" = $1, status = 'audio_ready', "updatedAt" = NOW() WHERE id = $2`,
      [relativeUrl, existingJobId]
    );
  } else {
    await pool.query(
      `INSERT INTO "MediaJob" 
        (id, status, "audioUrl", source, "whatsappNumber", recipient, prompt, "createdAt", "updatedAt")
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      [finalJobId, 'audio_ready', relativeUrl, 'manual', whatsappNumber, whatsappNumber, 'Subida manual de audio']
    );
  }

  return {
    job: {
      id: finalJobId,
      audioUrl: relativeUrl
    }
  };
});