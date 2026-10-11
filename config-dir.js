const { existsSync } = require("fs");

// Single source of truth for where grikim-config lives, used by both
// load-external-env.js (secrets) and config-logger.ts (activity/error logs).
// Previously each had its own copy of this list, and config-logger.ts's
// copy was never updated with the production path -- which is why
// activity.log/error.log stayed empty in production even though logging
// code ran on every request.
const CANDIDATE_DIRS = [
  process.env.GRIKIM_CONFIG_DIR,
  "/opt/lampp/grikim-config", // local (LAMPP)
  "/home/lbecfxub/grikim-config", // production (Truehost)
].filter(Boolean);

function resolveConfigDir() {
  for (const dir of CANDIDATE_DIRS) {
    if (existsSync(dir)) return dir;
  }
  return null;
}

module.exports = { resolveConfigDir, CANDIDATE_DIRS };
