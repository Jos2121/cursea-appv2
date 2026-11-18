import { defineHandler } from "nitro";
import { readMultipartFormData, createError } from "nitro/h3";
import { pool, ensureSchema } from "../../../utils/db";
import { fetchWithTimeout } from "../../../utils/ffmpegQueue";
import fs from "node:fs/promises";
import path from "node:path";

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/heic": ".heic",
  "image/heif": ".heif",
  "application/pdf": ".pdf",
};

export default defineHandler(async (event) => {
  await ensureSchema();
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No se recibieron datos" });
  }

  const fileField = formData.find((field) => field.name === "voucher" || Boolean(field.filename));
  const jobIdField = formData.find((field) => field.name === "jobId");
  const waField = formData.find((field) => field.name === "whatsappNumber");

  if (!fileField || !fileField.data || fileField.data.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Falta la imagen del comprobante" });
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (fileField.data.length > MAX_SIZE) {
    throw createError({ statusCode: 413, statusMessage: "El comprobante no puede superar los 10MB" });
  }

  if (!jobIdField || !jobIdField.data) {
    throw createError({ statusCode: 400, statusMessage: "Falta el ID de la petición" });
  }

  const jobId = new TextDecoder().decode(jobIdField.data).trim();
  if (!jobId) {
    throw createError({ statusCode: 400, statusMessage: "El ID de la petición es inválido" });
  }

  const whatsappNumber = waField ? new TextDecoder().decode(waField.data).trim() : "Desconocido";

  const rawExt = path.extname(fileField.filename || "").toLowerCase();
  const mimeExt = fileField.type ? MIME_TO_EXT[fileField.type.toLowerCase()] : undefined;
  const ext = rawExt || mimeExt || ".jpg";

  const mediaDir = path.resolve(process.cwd(), "public/media/vouchers");
  await fs.mkdir(mediaDir, { recursive: true });
  const fileName = `voucher_${Date.now()}${ext}`;
  const filePath = path.join(mediaDir, fileName);
  const publicVoucherUrl = `/media/vouchers/${fileName}`;

  await fs.writeFile(filePath, fileField.data);

  const updateRes = await pool.query(
    `UPDATE "MediaJob" SET pago = 'Pagado', "voucherUrl" = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING id`,
    [publicVoucherUrl, jobId]
  );

  if (updateRes.rowCount === 0) {
    await fs.unlink(filePath).catch(() => {});
    throw createError({ statusCode: 404, statusMessage: "No se encontró la petición para asociar el pago" });
  }

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      const tgFormData = new FormData();
      tgFormData.append("chat_id", process.env.TELEGRAM_CHAT_ID);
      tgFormData.append(
        "photo",
        new Blob([new Uint8Array(fileField.data)], { type: fileField.type || "image/jpeg" }),
        fileName
      );
      tgFormData.append(
        "caption",
        `🔔 Nuevo pago recibido\nID: ${jobId}\nWhatsApp: ${whatsappNumber}\nEstado: Pagado`
      );

      await fetchWithTimeout(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`,
        {
          method: "POST",
          body: tgFormData,
        },
        15000
      );
    } catch (err) {
      console.error("Error enviando a Telegram:", err);
    }
  }

  return { success: true, voucherUrl: publicVoucherUrl };
});
