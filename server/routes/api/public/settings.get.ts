import { defineHandler } from "nitro";
import { pool, ensureSchema } from "../../../utils/db";
import fs from "fs";
import path from "path";

const DEFAULT_SETTINGS = {
  appTitle: "Qustom Go",
  appLogo: "/logo.svg",
};

export default defineHandler(async () => {
  let settings = { ...DEFAULT_SETTINGS };

  // Fallback to local settings file
  const localFile = path.resolve(process.cwd(), "public/settings.json");
  if (fs.existsSync(localFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(localFile, "utf-8"));
      if (data.appTitle) settings.appTitle = data.appTitle;
      if (data.appLogo) settings.appLogo = data.appLogo;
    } catch (e) {}
  }

  try {
    await ensureSchema();
    const res = await pool.query(`SELECT key, value FROM "PlatformSettings" WHERE key IN ('appTitle', 'appLogo')`);
    for (const row of res.rows) {
      if (row.key === "appTitle" && row.value) settings.appTitle = row.value;
      if (row.key === "appLogo" && row.value) settings.appLogo = row.value;
    }
  } catch (e) {
    // DB not available or offline, return local settings
  }

  return settings;
});
