# Velocity-HR — AI-Powered Recruitment & Workforce Management

[![Live](https://img.shields.io/badge/demo-velocity--h.vercel.app-blue)](https://velocity-h.vercel.app)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

Velocity-H is an AI-powered Human Resource Management system that combines intelligent recruitment with smart workforce scheduling. It automates the most time-consuming HR processes — resume screening, skill gap analysis, shift planning, and workload optimization — helping organisations save time and improve workforce efficiency.

---

## Features

### Recruitment Management

| Feature | Description |
|---|---|
| **AI Resume Screening** | Upload resumes and get instant AI-generated scores, summaries, and missing keyword analysis |
| **Job Posting** | Create, edit, and manage job listings with descriptions, tags, and skill requirements |
| **Applicant Tracking** | Full pipeline view — pending, reviewed, scheduled, hired, rejected |
| **AI Job Summaries** | Auto-generate concise job summaries using LLMs |
| **Duplicate Detection** | Prevents duplicate applications per job (email-unique) |

### Smart Scheduling

| Feature | Description |
|---|---|
| **Interview Scheduling** | Schedule interviews with time-slot management |
| **Google Calendar Sync** | Bi-directional calendar integration using OAuth |
| **Invite Management** | Track interview status — scheduled, completed, cancelled |
| **Meeting Links** | Auto-generated or custom meet links per interview |

### Dashboard & Analytics

- Real-time recruitment and scheduling KPIs
- Job-wise applicant breakdown
- Status distribution charts
- Upcoming interviews view

### Authentication & Access Control

- JWT-based authentication (7-day sessions)
- PBKDF2 password hashing (Vercel Edge-compatible)
- Google OAuth integration for calendar access
- Role-based access: HR accounts only

---

## Tech Stack

### Frontend
- **Next.js 16** — React framework with App Router and server components
- **React 19** — UI components with Hooks
- **DaisyUI** — Tailwind CSS component library
- **TailwindCSS** — Utility-first styling
- **Framer Motion** — Page transitions and animations
- **Lucide React** — Icon library
- **Lottie React** — Animated illustrations

### Backend (Next.js API Routes)
- **Neon (Serverless Postgres)** — Database
- **Jose** — JWT token handling (Edge-compatible)
- **Vercel Blob** — Resume file storage
- **Resend** — Email notifications
- **Google APIs** — Calendar integration

### AI Microservice (Python)
- **FastAPI** — REST API server
- **OpenRouter API** — LLM access (GPT-4o-mini, Llama 3.1, Claude 3, Gemini Flash)
- **PyPDF** — Resume text extraction
- **Streamlit** — Standalone evaluation UI
- **Uvicorn** — ASGI server

### DevOps
- **pnpm** — Package manager
- **Vercel** — Deployment platform
- **Docker-ready** — Microservice containerisation

---

## Architecture

```
Velocity-HR/
├── web-app/                    # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/         # Sign-in & sign-up pages
│   │   │   ├── api/            # Next.js API routes
│   │   │   ├── dashboard/      # Dashboard pages
│   │   │   │   ├── recruitment/  # Job & applicant management
│   │   │   │   ├── scheduling/   # Interview scheduling
│   │   │   │   └── settings/     # Account settings
│   │   │   └── jobs/           # Public job listings page
│   │   ├── components/         # Reusable UI components
│   │   ├── lib/                # Utilities & API clients
│   │   └── scripts/            # DB init & seed scripts
│   └── package.json
└── llm_microservice/           # Python AI microservice
    ├── api.py                  # FastAPI endpoints
    ├── app_streamlit_page.py   # Streamlit standalone UI
    └── requirements.txt
```

### Data Flow

1. **HR creates a job** → stored in Neon (Postgres) with AI-generated summary
2. **Candidates apply** → resume uploaded to Vercel Blob, applicant record created
3. **AI evaluates resume** → FastAPI microservice calls OpenRouter → returns score, summary, missing keywords
4. **HR reviews** → dashboard shows all applicants with AI scores
5. **Scheduling** → interviews created with optional Google Calendar sync
6. **Notification** → Resend API sends email updates

---

## Database Schema

The system uses four core Postgres tables on Neon:

- **`hrs`** — HR user accounts (password/Google OAuth)
- **`jobs`** — Job postings with AI summaries
- **`applicants`** — Applications with AI evaluation results
- **`scheduling`** — Interview schedules linked to applicants

Optimised with indexes on `hr_id`, `job_id`, and `applicant_id` for performance.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- PostgreSQL (Neon serverless recommended)
- OpenRouter API key (for AI features)

### 1. Clone & Install

```bash
git clone https://github.com/irohit373/Velocity-HR.git
cd Velocity-HR

# Install web app dependencies
cd web-app
pnpm install
```

### 2. Environment Variables

Create `web-app/.env`:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
RESEND_API_KEY=re_...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FASTAPI_URL=http://localhost:8000
```

### 3. Initialise Database

```bash
pnpm db:init
```

### 4. Run the AI Microservice

```bash
cd ../llm_microservice
pip install -r requirements.txt

# Create .env with OpenRouter key
echo "OPENROUTER_API_KEY=sk-or-v1-..." > .env

# Start FastAPI server
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

### 5. Start the Web App

```bash
cd ../web-app
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Resume Evaluation (FastAPI)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/evaluate` | Upload resume PDF and get AI evaluation |
| POST | `/evaluate-json` | Alternative structured evaluation |
| POST | `/api/generate-job-summary` | Generate AI job summary |
| POST | `/api/analyze-resume` | Analyse resume by URL |
| GET | `/health` | Health check |

### Web App API Routes (Next.js)

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register HR account |
| POST | `/api/auth/signin` | Authenticate HR |
| POST | `/api/auth/google` | Google OAuth callback |
| GET/POST | `/api/jobs` | List / create jobs |
| GET/POST | `/api/applicants` | List / create applicants |
| GET/POST | `/api/scheduling` | List / create schedules |

---

## Deployment

### Web App (Vercel)

```bash
cd web-app
vercel --prod
```

Set all environment variables in Vercel dashboard.

### AI Microservice (Railway / Render / Docker)

```bash
cd llm_microservice
docker build -t velocity-hr-ai .
docker run -p 8000:8000 velocity-hr-ai
```

---

## License

This project is licensed under the **GNU General Public License v3.0**. See [LICENSE](LICENSE).

---

## Author

**Rohit Deshmukh** — [GitHub](https://github.com/irohit373) · [LinkedIn](https://linkedin.com/in/irohit373)
