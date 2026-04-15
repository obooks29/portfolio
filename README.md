# Portfolio — Cloud Engineer

A personal portfolio site built with **React + Vite**, deployed on **AWS S3 + CloudFront** with automated CI/CD via **GitHub Actions**.

## 🚀 Quick Start

```bash
npm install
npm run dev        # localhost:5173
npm run build      # outputs to /dist
npm run preview    # preview the build locally
```

## 🛠 Personalise It

Before deploying, update these placeholders in `src/App.jsx`:

| Placeholder | Where | Replace with |
|---|---|---|
| `YOUR NAME` | Nav, Hero, Footer | Your actual name |
| `you@example.com` | Contact section | Your email |
| `yourusername` | GitHub link | Your GitHub username |
| `yourprofile` | LinkedIn link | Your LinkedIn slug |
| `YOUR_API_GATEWAY_URL` | handleSubmit function | Project 2 API endpoint |

## ☁️ Deploy to AWS

This repo is wired for automated deploys. See the GitHub Actions workflow at `.github/workflows/deploy.yml` (added in Project 1).

Every push to `main` → builds → syncs to S3 → invalidates CloudFront cache.

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← all components and data
│   ├── App.css        ← all styles
│   ├── index.css      ← CSS variables and reset
│   └── main.jsx       ← entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design

- **Display font**: Bebas Neue
- **UI font**: Syne
- **Mono font**: DM Mono
- **Accent**: #D4FF47 (electric lime)
- **Theme**: Dark editorial

## 📦 Built With

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- Hosted on AWS S3 + CloudFront
