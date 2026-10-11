import { appendFileSync, existsSync } from "fs";
import { join } from "path";

const configDir = process.env.GRIKIM_CONFIG_DIR || "/opt/lampp/grikim-config";
const logsDir = join(configDir, "logs");

function writeLine(file: "activity.log" | "error.log", message: string) {
  if (!existsSync(logsDir)) return;
  const line = `[${new Date().toISOString()}] ${message}\n`;
  try {
    appendFileSync(join(logsDir, file), line);
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
