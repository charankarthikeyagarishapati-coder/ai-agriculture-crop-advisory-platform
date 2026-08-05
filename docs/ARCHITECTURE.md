# System Architecture & AI Design - AI Agriculture Platform

## 1. Overview Architecture

```
                               ┌─────────────────────────┐
                               │   React + Vite + TS     │
                               │   Tailwind CSS Client   │
                               └────────────┬────────────┘
                                            │ HTTP / JSON (JWT Auth)
                                            ▼
                               ┌─────────────────────────┐
                               │   Express.js Backend    │
                               │   TypeScript API Server │
                               └─────┬──────────────┬────┘
                                     │              │
                    ┌────────────────┘              └─────────────────┐
                    ▼                                                 ▼
     ┌─────────────────────────────┐                   ┌─────────────────────────────┐
     │      Google Gemini API      │                   │     Supabase / PostgreSQL   │
     │     (@google/genai SDK)     │                   │  Auth + DB + Storage + RLS  │
     └─────────────────────────────┘                   └─────────────────────────────┘
```

## 2. Security Model & Data Isolation

1. **Row Level Security (RLS):**
   - Tables (`users`, `crops`, `advisories`, `diagnoses`) enforce RLS policies matching `auth.uid() = user_id`.
   - Admin users with `role = 'admin'` bypass isolation using custom `is_admin()` SQL security definer helper function for analytics aggregation.

2. **Zod Input & Output Validation:**
   - All server requests pass through Zod middleware (`validate.ts`) guaranteeing strict runtime type assertions.

3. **Gemini API Safety:**
   - Gemini API calls are strictly server-side, keeping `GEMINI_API_KEY` private and unexposed to browser bundles.

## 3. Gemini System Prompt Engineering

The system prompt for crop advisory and image-based disease diagnosis strictly enforces:
- **Role:** Senior Agronomist & Agricultural Scientist.
- **Output:** Validated JSON structure without markdown wrapping backticks.
- **Safety Guidelines:** No unsafe pesticide recommendations, explicit dosage constraints, IPM (Integrated Pest Management) priority.
