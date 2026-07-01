# AI Resume Analyzer

A full-stack MERN application that analyzes resumes with Google's Gemini API and returns
a scored, actionable review — overall score, ATS match score, strengths, weaknesses,
missing keywords, and suggestions tailored to a target role.

## Stack

- **Frontend:** React 18 + Vite + React Router + Tailwind CSS
- **Backend:** Node.js + Express (modular MVC) + MongoDB (Mongoose) + JWT auth
- **AI:** Google Gemini API (`gemini-1.5-flash`) for fast resume analysis
- **File handling:** Multer (in-memory) + `pdf-parse` for PDF text extraction

## Project structure

```
resume-analyzer/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # User, Resume schemas
│   ├── middleware/                # JWT auth guard, error handler
│   ├── controllers/               # auth + resume business logic
│   ├── routes/                    # /api/auth, /api/resume
│   ├── services/geminiService.js  # Gemini API integration
│   ├── utils/pdfParser.js         # PDF -> text extraction
│   └── server.js
└── frontend/
    └── src/
        ├── api/axios.js           # Axios instance with JWT interceptor
        ├── context/AuthContext.jsx
        ├── components/            # Navbar, ScoreRing, MarginNote, ProtectedRoute
        ├── pages/                 # Login, Register, Upload, History
        └── App.jsx
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

Get a free Gemini API key at https://aistudio.google.com/app/apikey.

Run it:

```bash
npm run dev      # nodemon, or:
npm start
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env    # defaults to http://localhost:5000/api, adjust if needed
npm run dev
```

The app runs at `http://localhost:5173`.

## API reference

| Method | Route                | Auth | Description                          |
|--------|-----------------------|------|--------------------------------------|
| POST   | `/api/auth/register`  | No   | Create an account, returns JWT       |
| POST   | `/api/auth/login`     | No   | Log in, returns JWT                  |
| GET    | `/api/auth/me`        | Yes  | Current user profile                 |
| POST   | `/api/resume/analyze` | Yes  | Upload a PDF (`resume` field, multipart) + optional `targetRole`, returns AI analysis |
| GET    | `/api/resume/history` | Yes  | List past analyses for the user      |
| GET    | `/api/resume/:id`     | Yes  | Full detail of one analysis          |

## Notes

- Passwords are hashed with bcrypt; auth uses stateless JWTs (7-day expiry).
- File uploads are handled in memory (never written to disk) and capped at 5MB, PDF only.
- The MongoDB connection pool (`maxPoolSize: 20`) plus Express's async, non-blocking model
  let the backend serve concurrent multi-user analysis requests without queuing.
- If the Gemini response isn't valid JSON, the request fails cleanly with a 500 rather than
  returning malformed data.
