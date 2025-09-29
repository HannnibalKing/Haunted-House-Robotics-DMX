# Docs Build & Audit Workflow

Run the landing page locally and audit it before deploying to GitHub Pages.

```powershell
cd docs
npm install
npm run dev       # Hot-reload Vite server
npm run build     # Generate dist/ for Pages
npm run audit     # HTML validation + Lighthouse CI
```

Lighthouse scores are asserted against the `lighthouse:recommended` preset. Results upload to temporary storage so you can inspect the latest report from CI.
