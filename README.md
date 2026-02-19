# Micro-Deployer ⚡️

A "Skill Gift" for @levelsio. Zero fluff, one file, maximum speed. Deploy snippets or files to your VPS via SSH instantly from FTF.

## Why?
Because CI/CD is for people who like meetings. Micro-Deployer is for people who like shipping.

## Installation

1.  Clone it:
    ```bash
    git clone https://github.com/levelsio/ftf-skill-micro-deployer ~/.openclaw/skills/micro-deployer
    ```
2.  Install one dependency:
    ```bash
    cd ~/.openclaw/skills/micro-deployer && npm install
    ```
3.  Set your SSH credentials in your gateway environment or pass them in.

## Usage

```bash
# Deploy a single file
node index.js --file "./app.js" --to "root@vps:/var/www/app.js" --restart "my-app"
```

## Features
- **Minimalist:** No complex config. One script.
- **Fast:** Uses SCP/SSH directly.
- **PM2 Support:** Optional `--restart` flag to bounce your process after deploy.
- **Pieter-Approved:** No Docker, no Kubernetes, just code on a server.

## Logic
1. Scans code.
2. Checks destination.
3. SCPs file.
4. Restarts PM2 (if asked).
5. Done.