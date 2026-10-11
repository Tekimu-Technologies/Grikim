import { appendFileSync } from "fs";
import { join } from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolveConfigDir } = require("../../config-dir");

function writeLine(file: "activity.log" | "error.log", message: string) {
  const configDir = resolveConfigDir();
  if (!configDir) return;

  const line = `[${new Date().toISOString()}] ${message}\n`;
  try {
    appendFileSync(join(configDir, "logs", file), line);
  } catch {
    // Logging must never break the request it's logging.
  }
}

export function logActivity(message: string) {
  writeLine("activity.log", message);
}

export function logError(message: string) {
  writeLine("error.log", message);
}
