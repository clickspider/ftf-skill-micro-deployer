# SKILL.md

# Micro-Deployer

Minimalist VPS deployment via SSH.

## Description
Deploy code snippets or files directly to a VPS and optionally restart PM2 processes. Designed for speed and simplicity.

## Tools
- `micro_deploy(content?: string, file?: string, to: string, restart?: string)`: Deploys content or a local file to a remote destination via SCP/SSH.