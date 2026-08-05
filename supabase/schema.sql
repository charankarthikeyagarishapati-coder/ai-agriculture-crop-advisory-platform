-- ====================================================================
-- AI-POWERED AGRICULTURE CROP ADVISORY ASSISTANT - SUPABASE DATABASE SCHEMA
-- PostgreSQL DDL with Row Level Security (RLS), Triggers, and Indexes
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'farmer' CHECK (role IN ('farmer', 'agronomist', 'admin')),
  location TEXT DEFAULT 'California, USA',
  farm_size_acres NUMERIC(10, 2) DEFAULT 25.0,
  soil_type TEXT DEFAULT 'Loamy',
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CROPS TABLE
CREATE TABLE IF NOT EXISTS public.crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  variety TEXT,
  planting_date DATE,
  soil_type TEXT DEFAULT 'Loamy',
  area_acres NUMERIC(10, 2) DEFAULT 5.0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'harvested', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ADVISORIES TABLE
CREATE TABLE IF NOT EXISTS public.advisories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  soil_type TEXT,
  growth_stage TEXT,
  location TEXT,
  symptoms TEXT[],
  irrigation_method TEXT,
  title TEXT NOT NULL,
  recommendations TEXT[] NOT NULL,
  fertilizer TEXT NOT NULL,
  irrigation TEXT NOT NULL,
  prevention TEXT[] NOT NULL,
  weather_precautions TEXT[],
  risk_level TEXT DEFAULT 'Low' CHECK (risk_level IN ('Low', 'Medium', 'High', 'Severe')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. DIAGNOSES TABLE (Crop Health Analysis via Image Upload)
CREATE TABLE IF NOT EXISTS public.diagnoses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  crop_name TEXT,
  image_url TEXT,
  disease TEXT NOT NULL,
  confidence NUMERIC(5, 2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  recommendations TEXT[] NOT NULL,
  fertilizer TEXT NOT NULL,
  irrigation TEXT NOT NULL,
  prevention TEXT[] NOT NULL,
  symptoms_detected TEXT[],
  severity TEXT DEFAULT 'Mild' CHECK (severity IN ('Mild', 'Moderate', 'Severe')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. WEATHER LOGS TABLE
CREATE TABLE IF NOT EXISTS public.weather_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location TEXT NOT NULL,
  temperature NUMERIC(5, 2) NOT NULL,
  humidity NUMERIC(5, 2) NOT NULL,
  condition TEXT NOT NULL,
  wind_speed NUMERIC(5, 2) NOT NULL,
  precipitation_probability NUMERIC(5, 2) NOT NULL,
  uv_index NUMERIC(4, 2) DEFAULT 5.0,
  evapotranspiration_mm NUMERIC(5, 2) DEFAULT 4.2,
  retrieved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. INDEXES FOR HIGH-PERFORMANCE QUERYING
CREATE INDEX IF NOT EXISTS idx_crops_user_id ON public.crops(user_id);
CREATE INDEX IF NOT EXISTS idx_advisories_user_id ON public.advisories(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnoses_user_id ON public.diagnoses(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_weather_logs_location ON public.weather_logs(location);

-- 8. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_logs ENABLE ROW LEVEL SECURITY;

-- Helper check for Admin user
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users RLS Policies
CREATE POLICY "Users can read own record or admins read all"
  ON public.users FOR SELECT
  USING (auth.uid() = id OR is_admin());

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Crops RLS Policies
CREATE POLICY "Farmers access own crops or admin reads all"
  ON public.crops FOR ALL
  USING (auth.uid() = user_id OR is_admin());

-- Advisories RLS Policies
CREATE POLICY "Farmers access own advisories or admin reads all"
  ON public.advisories FOR ALL
  USING (auth.uid() = user_id OR is_admin());

-- Diagnoses RLS Policies
CREATE POLICY "Farmers access own diagnoses or admin reads all"
  ON public.diagnoses FOR ALL
  USING (auth.uid() = user_id OR is_admin());

-- Weather Logs RLS Policies (Publicly readable for authenticated users)
CREATE POLICY "Weather logs readable by authenticated users"
  ON public.weather_logs FOR SELECT
  TO authenticated
  USING (true);
