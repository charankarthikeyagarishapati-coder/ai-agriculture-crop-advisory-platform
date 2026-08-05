# 🌱 AgriVision AI - AI-Powered Agriculture Crop Advisory Assistant

> **Production-ready SaaS Platform for Google Antigravity Ideate Hackathon 2026**

AgriVision AI is an enterprise-grade precision agriculture web application designed to empower farmers and agronomists. Using **Google Gemini (@google/genai)** multimodal AI, the platform diagnoses crop leaf diseases from photos, generates personalized fertilizer and irrigation schedules, integrates real-time agricultural weather forecasts, and provides full field advisory tracking with Row Level Security (RLS).

---

## 🌟 Key Features

1. **AI Crop Health & Disease Analysis (Image Upload)**
   - Drag-and-drop crop leaf photo upload.
   - Powered by Google Gemini Multimodal Vision API.
   - Structured JSON response returning disease name, confidence score (0-100%), curative treatment steps, N-P-K fertilizer adjustment, and long-term prevention protocols.

2. **Smart AI Advisory Generator**
   - Personalizes farming advice based on crop species, soil texture (Loamy, Silty, Clay, Sandy), growth stage, irrigation method, and observed symptoms.
   - Formulates climate-aware irrigation and nutrient management recommendations.

3. **Live Agricultural Weather Integration**
   - Integrated with **Open-Meteo REST API** (no API key required).
   - Computes live temperature, humidity, wind speed, rain probability, and FAO evapotranspiration ($ET_0$) indices.

4. **Farmer Dashboard & Historical Repository**
   - Searchable and filterable history of past crop advisories and health diagnoses.
   - Modal detail viewer and downloadable protocol reports.

5. **Platform Admin Portal**
   - Telemetry analytics, top diagnosed plant diseases, user role breakdown (Farmer, Agronomist, Admin), and real-time audit logs.

6. **Instant One-Click Demo Access**
   - Out-of-the-box demo login buttons for **Farmer** and **Admin** profiles with instant data population.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + Lucide Icons
- **Backend:** Node.js + Express.js + TypeScript
- **AI System:** Google Gemini 3.6 / 1.5 Pro via `@google/genai` SDK
- **Database & Auth:** Supabase (PostgreSQL + Auth + Row Level Security)
- **Validation:** Zod Schema Validation for all API requests and responses
- **Weather:** Open-Meteo Weather API (FAO Evapotranspiration)

---

## 📁 Repository Structure

```
hackathon/
├── client/                     # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, WeatherCard, AdvisoryCard, DiagnosisCard, Modal
│   │   ├── context/            # AuthContext (JWT & Demo Shortcuts)
│   │   ├── pages/              # Landing, Auth, Dashboard, NewAdvisory, History, Profile, Admin
│   │   ├── services/           # REST API Client & Weather fetcher
│   │   ├── index.css           # Glassmorphic Tailwind Design Tokens
│   │   ├── App.tsx             # React Router & Route Guards
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # Environment setup
│   │   ├── controllers/        # Auth, Advisory, Diagnosis, Weather, History, Profile, Admin
│   │   ├── middleware/         # JWT Auth, Zod Validation, Rate Limiter, Error Handler
│   │   ├── routes/             # Express API Endpoints
│   │   ├── services/           # Gemini AI (@google/genai), Supabase client, Weather, LocalStore
│   │   └── index.ts            # Server Entrypoint
│   ├── package.json
│   └── tsconfig.json
├── shared/                     # Shared Data Models & Zod Validation Schemas
│   ├── types.ts
│   └── schemas.ts
├── supabase/                   # Database DDL & Row Level Security (RLS)
│   ├── schema.sql              # Table DDL, Indexes, RLS Policies, Triggers
│   └── seed.sql                # Sample mock data
└── docs/                       # Specifications
    ├── API_DOCUMENTATION.md    # API REST Specs
    └── ARCHITECTURE.md         # System Architecture & AI System Prompt Design
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Environment Variables Setup
Create `.env` inside `server/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=super-secret-jwt-key-change-in-production-12345
PORT=5000
```

*Note: If `GEMINI_API_KEY` or `SUPABASE_URL` are not set, the platform operates seamlessly using an agronomic fallback generator and local store so the app is instantly testable without external service requirements!*

### 3. Server Installation & Execution

```bash
cd server
npm install
npm run dev
```
The server starts at `http://localhost:5000/api`.

### 4. Client Installation & Execution

```bash
cd client
npm install
npm run dev
```
The React frontend opens at `http://localhost:3000`.

---

## 🔐 Database & Supabase Row Level Security (RLS)

To deploy the schema to your Supabase PostgreSQL instance:
1. Open the Supabase SQL Editor.
2. Run `supabase/schema.sql` to generate tables (`users`, `crops`, `advisories`, `diagnoses`, `weather_logs`), triggers, indexes, and RLS policies.
3. Run `supabase/seed.sql` to populate sample data.

---

## 🧪 Verification & Demo Testing

1. **Landing Page:** Explore features, live metrics, and interactive ROI profit calculator.
2. **Instant Demo Login:** On `/login`, click **Demo Farmer** or **Demo Admin**.
3. **Crop Health Analysis (Image Upload):** Go to `/advisory/new`, upload a crop photo, and click **Run AI Disease Diagnosis** to inspect Gemini Vision output.
4. **Smart Advisory:** Fill in crop parameters and generate N-P-K fertilizer and irrigation plans.
5. **Admin Portal:** Log in as Admin to review platform telemetry and disease outbreaks.
