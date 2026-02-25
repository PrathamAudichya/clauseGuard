# 🛡️ ClauseGuard — AI-Powered Smart Contract Risk Analyzer

> Upload any contract. Get instant risk scores, red flags, safer alternatives, and a negotiation brief — powered by AI, built for humans.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Docker Setup (Recommended)](#docker-setup-recommended)
  - [Manual Setup](#manual-setup)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ClauseGuard is a full-stack web application that analyzes legal contracts using AI. It parses PDF and DOCX files, segments them into individual clauses, classifies the contract type, and scores each clause for risk — all within seconds.

Built as a hackathon project to demonstrate how AI can make legal documents accessible to non-lawyers.

---

## Features

| Feature | Description |
|---------|-------------|
| 📄 **Contract Upload** | Drag-and-drop PDF/DOCX upload with real-time progress |
| 🔍 **Clause Extraction** | NLP-powered sentence boundary detection using spaCy |
| 🏷️ **Contract Classification** | Zero-shot classification to detect contract type (NDA, SaaS, Employment, etc.) |
| ⚠️ **Risk Scoring** | Each clause scored 0–100 across 5 risk categories using Gemini AI |
| 📊 **5-Dimension Dashboard** | Radar chart visualization of risk distribution |
| ✅ **Safer Alternatives** | AI-generated equitable clause rewrites with side-by-side diff view |
| 🤝 **Negotiation Brief** | Ready-to-use talking points for high-risk clauses |
| 🚩 **Red Flag Alerts** | Instant highlight of critical and compliance issues |
| 📝 **PDF Export** | One-click downloadable analysis report via jsPDF |
| 🔄 **Contract Comparison** | Upload two versions and compare risk deltas |
| 🔎 **Search & Filter** | Full-text clause search with risk-level filtering |
| 💾 **Local History** | Previous analyses stored in localStorage for quick access |
| 🎭 **Demo Mode** | Works without a backend — built-in demo data for presentations |

---

## Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** — Fast dev server and build tool
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Radar and bar chart visualizations
- **Framer Motion** — Smooth UI animations
- **jsPDF** — Client-side PDF report generation
- **Lucide React** — Icon library

### Backend
- **FastAPI** (Python) — High-performance async API
- **PyMuPDF (fitz)** — PDF text extraction
- **python-docx** — DOCX text extraction
- **spaCy** (`en_core_web_sm`) — NLP clause segmentation
- **HuggingFace Transformers** — Zero-shot contract type classification
- **Google Generative AI (Gemini)** — AI-powered clause analysis
- **sentence-transformers** — Semantic similarity for contract comparison

---

## Project Structure

```
clauseGuard/
├── backend/
│   ├── main.py              # FastAPI app, routes, CORS
│   ├── parser.py             # PDF/DOCX text extraction + clause segmentation
│   ├── classifier.py         # Contract type detection (zero-shot)
│   ├── analyzer.py           # Gemini AI clause risk analysis
│   ├── comparator.py         # Contract comparison engine
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Backend container config
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Routing + floating pill navbar
│   │   ├── pages/
│   │   │   ├── HomePage.tsx      # Landing page with upload zone
│   │   │   ├── AnalysisPage.tsx  # Tabbed analysis dashboard
│   │   │   └── ComparePage.tsx   # Contract comparison UI
│   │   └── components/
│   │       ├── UploadZone.tsx    # Drag & drop file upload
│   │       ├── RiskDashboard.tsx # Radar chart + risk bars
│   │       ├── ClauseList.tsx    # Expandable clause cards
│   │       ├── DiffView.tsx     # Original vs safer alternative
│   │       ├── RedFlagPanel.tsx  # Critical risk alerts
│   │       ├── NegoBrief.tsx    # Negotiation talking points
│   │       └── ReportExport.tsx # PDF export button
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml        # Multi-container orchestration
├── .env.example              # Environment variable template
├── SETUP.md                  # Detailed setup instructions
└── PRD.md                    # Product Requirements Document
```

---

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** (recommended)
- A free **[Google Gemini API Key](https://aistudio.google.com/apikey)**

### Docker Setup (Recommended)

```bash
# 1. Clone the repo
git clone https://github.com/rj9884/clauseGuard.git
cd clauseGuard

# 2. Create your .env file
cp .env.example .env
# Edit .env and add your Gemini API key

# 3. Build and run
docker compose up --build -d

# 4. Open in browser
# Frontend: http://localhost:5173
# Backend:  http://localhost:8000
```

> **Note:** The backend takes ~60 seconds on first start to download the HuggingFace classification model. Check readiness with `docker compose logs backend --tail 5`.

### Manual Setup

See [SETUP.md](SETUP.md) for detailed step-by-step instructions for running without Docker.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — returns API status |
| `GET` | `/health` | Health check — returns `{"status": "healthy"}` |
| `POST` | `/upload` | Upload a contract (PDF/DOCX) for analysis |
| `POST` | `/compare` | Upload two contracts for comparison |

---

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌────────────────┐
│  Upload      │────▶│  Parse Text  │────▶│  Classify     │────▶│  AI Analysis   │
│  PDF / DOCX  │     │  (spaCy NLP) │     │  (HuggingFace)│     │  (Gemini API)  │
└─────────────┘     └──────────────┘     └───────────────┘     └────────────────┘
                                                                       │
                    ┌──────────────┐     ┌───────────────┐            │
                    │  PDF Report  │◀────│  Dashboard    │◀───────────┘
                    │  (jsPDF)     │     │  (React UI)   │
                    └──────────────┘     └───────────────┘
```

1. **Upload** — User uploads a PDF or DOCX contract
2. **Parse** — Text is extracted and segmented into clauses using spaCy
3. **Classify** — Contract type is detected via zero-shot classification
4. **Analyze** — Each clause is scored by Gemini AI across 5 risk dimensions
5. **Display** — Results shown in a tabbed dashboard with charts, diffs, and briefs
6. **Export** — User can download a full PDF report

---

## Screenshots

> Run the app in **Demo Mode** (click "Try Demo" on the homepage) to see sample analysis without needing a backend or API key.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ | Google Gemini API key for clause analysis |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---
