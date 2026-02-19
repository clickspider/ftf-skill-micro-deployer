#!/usr/bin/env node

/**
 * FTF Skill: Micro-Deployer
 * Target: Pieter Levels (@levelsio)
 * Concept: Minimalist SSH-based deployment.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

async function deploy({ content, file, to, restart }) {
  if (!to) {
    console.error("Error: Destination (to) is required (e.g., user@host:/path/to/file).");
    process.exit(1);
  }

  let localPath = file;

  // If raw content is provided instead of a file path, create a temp file
  if (content && !file) {
    localPath = path.join(__dirname, "temp_deploy_snippet.txt");
    fs.writeFileSync(localPath, content);
  }

  if (!localPath || !fs.existsSync(localPath)) {
    console.error("Error: Local file or content missing.");
    process.exit(1);
  }

  console.log(`🚀 Shipping to ${to}...`);

  try {
    // 1. SCP the file
    execSync(`scp ${localPath} ${to}`, { stdio: "inherit" });

    // 2. Optional PM2 Restart
    if (restart) {
      const [hostPart] = to.split(":");
      console.log(`🔄 Restarting PM2 process: ${restart}...`);
      execSync(`ssh ${hostPart} "pm2 restart ${restart}"`, { stdio: "inherit" });
    }

    console.log("✅ Deployed. Go ship something else.");

    // Cleanup temp file if created
    if (content && !file) fs.unlinkSync(localPath);

  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

// Simple CLI Parsing
const args = require("minimist")(process.argv.slice(2));
deploy({
  content: args.content,
  file: args.file,
  to: args.to,
  restart: args.restart
});