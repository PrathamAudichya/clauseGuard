# ClauseGuard — Setup Guide

## Prerequisites

| Requirement | Minimum | Notes |
|-------------|---------|-------|
| Docker Desktop | Latest | [Windows](https://docs.docker.com/desktop/install/windows-install/) / [macOS](https://docs.docker.com/desktop/install/mac-install/) / [Linux](https://docs.docker.com/desktop/install/linux-install/) |
| Node.js | v18+ | Only needed for manual (non-Docker) setup |
| Python | 3.10+ | Only needed for manual (non-Docker) setup |
| Gemini API Key | — | [Get a free key](https://aistudio.google.com/apikey) |

> **Windows users:** Make sure Docker Desktop has WSL 2 backend enabled (Settings → General → Use WSL 2 based engine).

---

## Option 1: Docker (Recommended — works the same on all platforms)

### Step 1 — Create your `.env` file

**Windows (Command Prompt):**
```cmd
copy .env.example .env
```

**Windows (PowerShell) / macOS / Linux:**
```bash
cp .env.example .env
```

Open `.env` and set your key:
```
GEMINI_API_KEY=your_key_here
```

### Step 2 — Build and run

```bash
docker compose up --build -d
```

### Step 3 — Open the app

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API docs | http://localhost:8000/docs |

> ⏳ **First run takes 2–5 minutes.** The backend downloads two ML models on startup:
> - `facebook/bart-large-mnli` (~1.6 GB) — contract type classifier
> - `all-MiniLM-L6-v2` (~90 MB) — semantic comparison embeddings
>
> Monitor progress: `docker compose logs backend -f`

### Stopping the app

```bash
docker compose down
```

---

## Option 2: Manual Setup (No Docker)

Open **two terminal windows**.

### Terminal 1 — Backend

```bash
cd backend
```

**Create and activate a virtual environment:**

| OS | Command |
|----|---------|
| macOS / Linux | `python3 -m venv .venv && source .venv/bin/activate` |
| Windows (CMD) | `python -m venv .venv && .venv\Scripts\activate.bat` |
| Windows (PowerShell) | `python -m venv .venv && .venv\Scripts\Activate.ps1` |

**Set the API key:**

| OS | Command |
|----|---------|
| macOS / Linux | `export GEMINI_API_KEY="your_key_here"` |
| Windows (CMD) | `set GEMINI_API_KEY=your_key_here` |
| Windows (PowerShell) | `$env:GEMINI_API_KEY="your_key_here"` |

**Install dependencies and start:**

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python main.py
```

Backend runs at `http://localhost:8000`.

---

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **"Backend not reachable"** in the UI | Backend didn't start or crashed. Check `docker compose logs backend` or the terminal running `python main.py`. The UI will offer **Demo Mode** as a fallback. |
| **First-run very slow** | Normal — `facebook/bart-large-mnli` is ~1.6 GB. Wait for `Application startup complete` in logs. |
| **`GEMINI_API_KEY` not found** | The env var must be set in the **same terminal** as the backend. Or add it directly to your `.env` file and restart Docker. |
| **Docker permission error on Linux** | Run `sudo usermod -aG docker $USER` then log out and back in. |
| **PowerShell execution policy error** | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` then retry. |
| **Port already in use (5173 or 8000)** | Stop whatever is using the port, or edit `docker-compose.yml` to map different host ports. |
| **spaCy model not found** | Run `python -m spacy download en_core_web_sm` inside your active virtual environment. |
