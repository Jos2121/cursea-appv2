import { defineHandler } from "nitro";
import { readMultipartFormData, createError } from "nitro/h3";
import { pool } from "../../../utils/db";
import { fetchWithTimeout } from "../../../utils/ffmpegQueue";
import fs from "node:fs/promises";
import path from "node:path";

export default defineHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) throw createError({ statusCode: 400, statusMessage: "No data provided" });

  const fileField = formData.find((field) => field.name === "voucher");
  const jobIdField = formData.find((field) => field.name === "jobId");
  const waField = formData.find((field) => field.name === "whatsappNumber");

  if (!fileField || !fileField.data) throw createError({ statusCode: 400, statusMessage: "Falta la imagen" });
  if (!jobIdField || !jobIdField.data) throw createError({ statusCode: 400, statusMessage: "Falta el ID de la petición" });

  const jobId = new TextDecoder().decode(jobIdField.data);
  const whatsappNumber = waField ? new TextDecoder().decode(waField.data) : "Desconocido";

  const mediaDir = path.resolve(process.cwd(), "public/media/vouchers");
  await fs.mkdir(mediaDir, { recursive: true }).catch(() => {});
  const ext = path.extname(fileField.filename || ".jpg") || ".jpg";
  const fileName = `voucher_${Date.now()}${ext}`;
  const filePath = path.join(mediaDir, fileName);
  const publicVoucherUrl = `/media/vouchers/${fileName}`;
  await fs.writeFile(filePath, fileField.data);

  await pool.query(
    `UPDATE "MediaJob" SET pago = 'Pagado', "updatedAt" = NOW() WHERE id = $1`,
    [jobId]
  );

  const tgFormData = new FormData();
  tgFormData.append('chat_id', process.env.TELEGRAM_CHAT_ID || '');
  tgFormData.append('photo', new Blob([fileField.data]), fileName);
  tgFormData.append('caption', `🔔 Nuevo pago recibido\nID: ${jobId}\nWhatsApp: ${whatsappNumber}\nEstado: Pagado`);

  try {
    await fetchWithTimeout(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: tgFormData
    }, 15000);
  } catch (err) {
    console.error("Error enviando a Telegram:", err);
  }

  return { success: true };
});