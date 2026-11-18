import { defineHandler } from "nitro";
import { getRouterParam, getRequestHeader, createError, setHeader, setResponseStatus, sendStream } from "nitro/h3";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export default defineHandler(async (event) => {
  const file = getRouterParam(event, "file");

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }

  const safeFile = path.basename(file);
  const filePath = path.resolve(process.cwd(), "public/media", safeFile);

  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "File not found" });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const ext = path.extname(safeFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Accept-Ranges", "bytes");
  setHeader(event, "Cache-Control", "public, max-age=86400");

  const rangeHeader = getRequestHeader(event, "range");
  if (rangeHeader && fileSize > 0) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), fileSize - 1) : fileSize - 1;

      if (start >= fileSize || start > end || Number.isNaN(start) || Number.isNaN(end)) {
        setHeader(event, "Content-Range", `bytes */${fileSize}`);
        throw createError({ statusCode: 416, statusMessage: "Range Not Satisfiable" });
      }

      setResponseStatus(event, 206);
      setHeader(event, "Content-Range", `bytes ${start}-${end}/${fileSize}`);
      setHeader(event, "Content-Length", String(end - start + 1));
      return sendStream(event, fs.createReadStream(filePath, { start, end }));
    }
  }

  setHeader(event, "Content-Length", String(fileSize));
  return sendStream(event, fs.createReadStream(filePath));
});
