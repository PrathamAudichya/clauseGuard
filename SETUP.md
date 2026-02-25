# ClauseGuard Setup & Quickstart

Welcome to ClauseGuard! This guide will help you get the project up and running on your local machine.

## Prerequisites

- **Docker** and **Docker Compose** (Recommended)
- **Node.js** (v18+) and **npm** (If running without Docker)
- **Python** 3.10+ (If running without Docker)
- A valid **Google Gemini API Key**

---

## Option 1: Running with Docker (Recommended)

The easiest way to run the application is using Docker. It handles all backend dependencies (including heavy machine learning libraries) and frontend builds automatically.

1. **Set your API Key:**
   Export your Gemini API key in your terminal before running Docker Compose:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```

2. **Start the Application:**
   Run the following command from the root directory of the project:
   ```bash
   docker compose up --build -d
   ```

3. **Access the App:**
   - Frontend (Web UI): Once the containers are built, open **`http://localhost:5173`** in your browser.
   - Backend API: Available at `http://localhost:8000`

4. **Stopping the App:**
   To stop the containers, run:
   ```bash
   docker compose down
   ```

---

## Option 2: Running Locally (Manual Setup)

If you prefer to run the frontend and backend manually without Docker, follow these steps using two separate terminal windows.

### Terminal 1: Backend Setup
1. Navigate into the `backend` directory:
   ```bash
   cd backend
   ```
2. Set your Gemini API key:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```
3. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows, use: .venv\Scripts\activate
   ```
4. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   # Download the required spaCy language model
   python -m spacy download en_core_web_sm
   ```
5. Run the FastAPI server:
   ```bash
   python main.py
   ```
   *The backend should now be running on `http://localhost:8000`.*

### Terminal 2: Frontend Setup
1. Open a new terminal and navigate into the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running on `http://localhost:5173`.*

---

## Troubleshooting

- **"Backend not reachable" in Web UI:** This usually means the FastAPI frontend didn't start properly, or you are running the frontend but forgot to start the backend. The UI will gracefully fallback and offer a **Demo Mode**.
- **Missing Gemini API Key Error:** If your `.env` or exported variables aren't picked up, ensure you export the variable *in the exact same terminal window* where you start the backend (or run `docker compose`).
