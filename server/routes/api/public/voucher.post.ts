import { defineHandler } from "nitro";
import { readMultipartFormData, createError } from "nitro/h3";
import { pool } from "../../../utils/db";
import fs from "node:fs/promises";
import path from "node:path";

export default defineHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) throw createError({ statusCode: 400, statusMessage: "No data provided" });

  const fileField = formData.find((field) => field.name === "voucher");
  const waField = formData.find((field) => field.name === "whatsappNumber");

  if (!fileField || !fileField.data) throw createError({ statusCode: 400, statusMessage: "Falta la imagen" });
  if (!waField || !waField.data) throw createError({ statusCode: 400, statusMessage: "Falta el WhatsApp" });

  const whatsappNumber = new TextDecoder().decode(waField.data);

  const mediaDir = path.resolve(process.cwd(), "public/media/vouchers");
  await fs.mkdir(mediaDir, { recursive: true }).catch(() => {});
  const ext = path.extname(fileField.filename || ".jpg") || ".jpg";
  const fileName = `voucher_${Date.now()}${ext}`;
  const filePath = path.join(mediaDir, fileName);
  await fs.writeFile(filePath, fileField.data);

  await pool.query(
    `UPDATE "MediaJob" SET pago = 'Esperando', "updatedAt" = NOW() WHERE "whatsappNumber" = $1`,
    [whatsappNumber]
  );

  const tgFormData = new FormData();
  tgFormData.append('chat_id', process.env.TELEGRAM_CHAT_ID || '');
  tgFormData.append('photo', new Blob([fileField.data]), fileName);
  tgFormData.append('caption', `🔔 Nuevo pago recibido\nWhatsApp: ${whatsappNumber}\nEstado: Esperando validación`);
  tgFormData.append('reply_markup', JSON.stringify({
    inline_keyboard: [[{ text: '✅ Confirmar Pago', callback_data: `confirm_${whatsappNumber}` }]]
  }));

  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: tgFormData
    });
  } catch (err) {
    console.error("Error enviando a Telegram:", err);
  }

  return { success: true };
});