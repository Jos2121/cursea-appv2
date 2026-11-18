import { defineHandler } from "nitro";
import { readBody, createError } from "nitro/h3";
import { pool, ensureSchema } from "../../../utils/db";
import fs from "fs";
import path from "path";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: "Body is required" });
  }

  const { appTitle, appLogo } = body;

  const localFile = path.resolve(process.cwd(), "public/settings.json");
  let currentSettings: any = {};
  if (fs.existsSync(localFile)) {
    try {
      currentSettings = JSON.parse(fs.readFileSync(localFile, "utf-8"));
    } catch (e) {}
  }

  if (appTitle !== undefined) currentSettings.appTitle = String(appTitle).trim();
  if (appLogo !== undefined) currentSettings.appLogo = String(appLogo).trim();

  try {
    fs.writeFileSync(localFile, JSON.stringify(currentSettings, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local settings:", e);
  }

  try {
    await ensureSchema();
    if (appTitle !== undefined) {
      await pool.query(
        `INSERT INTO "PlatformSettings" (key, value, "updatedAt")
         VALUES ('appTitle', $1, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $1, "updatedAt" = NOW()`,
        [String(appTitle).trim()]
      );
    }
    if (appLogo !== undefined) {
      await pool.query(
        `INSERT INTO "PlatformSettings" (key, value, "updatedAt")
         VALUES ('appLogo', $1, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $1, "updatedAt" = NOW()`,
        [String(appLogo).trim()]
      );
    }
  } catch (e) {
    console.warn("Could not persist settings to DB:", e);
  }

  return {
    ok: true,
    appTitle: currentSettings.appTitle || "Qustom Go",
    appLogo: currentSettings.appLogo || "/logo.svg",
  };
});
