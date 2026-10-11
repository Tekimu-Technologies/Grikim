const { existsSync, readFileSync } = require("fs");
const { join } = require("path");
const { CANDIDATE_DIRS } = require("./config-dir");

// Secrets live outside the repo in grikim-config (sibling of this project),
// not in cPanel's Environment Variables panel -- that UI has a confirmed bug
// on this account that corrupts exported variable names. Tried in order;
// first one found wins.
function loadExternalEnv() {
  for (const dir of CANDIDATE_DIRS) {
    const smtpEnvPath = join(dir, "env", "smtp.env");
    if (!existsSync(smtpEnvPath)) continue;

    for (const line of readFileSync(smtpEnvPath, "utf8").split("\n")) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2];
      }
    }
    break;
  }
}

module.exports = { loadExternalEnv };
