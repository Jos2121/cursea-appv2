import { defineHandler } from "nitro";
import { getRouterParam, getQuery, createError, setHeader, sendStream } from "nitro/h3";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".pdf": "application/pdf",
};

export default defineHandler(async (event) => {
  const file = getRouterParam(event, "file");

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }

  const safeFile = path.basename(file);
  const filePath = path.resolve(process.cwd(), "public/media/vouchers", safeFile);

  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "Voucher not found" });
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(safeFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Content-Length", String(stat.size));
  setHeader(event, "Cache-Control", "public, max-age=86400");

  const query = getQuery(event);
  if (query.download === "1" || query.download === "true") {
    setHeader(event, "Content-Disposition", `attachment; filename="${safeFile}"`);
  }

  return sendStream(event, fs.createReadStream(filePath));
});
