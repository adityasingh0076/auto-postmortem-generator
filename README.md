# Software projects workspace

Two standalone projects live in this folder:

## Post-mortem generator

- **`post-mortem-generator.html`** — Single-page app: paste code/logs for automatic failure detection, manual reports, optional **Auto Mode** (polls the server), classifier, downloads (.txt / .json).
- **`post-mortem-server.mjs`** — Optional Node server: serves the HTML, `GET /api/logs`, `POST /api/postmortem`.

```bash
node post-mortem-server.mjs
# Open http://localhost:3847/post-mortem-generator.html
```

You can also open the HTML file directly in a browser (API calls will fall back gracefully).

## Autonomous Car Software System (ACSS)

React + Vite + Tailwind in **`autonomous-car-system/`**.

```bash
cd autonomous-car-system
npm install
npm run dev
```

```bash
npm run build
```

---

## Push this folder to GitHub

1. Create an empty repository on GitHub (no README/license if you want a clean first push), e.g. `sw-project`.
2. In this directory:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Use SSH instead if you prefer: `git@github.com:YOUR_USERNAME/YOUR_REPO.git`.
