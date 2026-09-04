import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const LOG_FILE = path.join(DATA_DIR, "analytics.jsonl");

export type PageviewEvent = {
  path: string;
  referrer: string | null;
  ts: string;
};

export async function recordPageview(event: Omit<PageviewEvent, "ts">) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ ...event, ts: new Date().toISOString() });
  await fs.appendFile(LOG_FILE, line + "\n", "utf8");
}

export async function readTopPages(limit = 10) {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf8");
    const counts = new Map<string, number>();
    for (const line of raw.split("\n").filter(Boolean)) {
      try {
        const { path: p } = JSON.parse(line) as PageviewEvent;
        counts.set(p, (counts.get(p) ?? 0) + 1);
      } catch {
        // skip malformed lines
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([path, views]) => ({ path, views }));
  } catch {
    return [];
  }
}
