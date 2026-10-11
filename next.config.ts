import type { NextConfig } from "next";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

// Local dev only: secrets live outside the repo, in grikim-config (sibling of
// this project). Production (cPanel) sets these directly via the Node.js
// App's own Environment Variables panel, so this never runs there.
const configDir = process.env.GRIKIM_CONFIG_DIR || "/opt/lampp/grikim-config";
const smtpEnvPath = join(configDir, "env", "smtp.env");
if (existsSync(smtpEnvPath)) {
  for (const line of readFileSync(smtpEnvPath, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
