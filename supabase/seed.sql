-- Seed Users (Password: "password123" bcrypt hashed: $2a$10$wN9D... standard dummy)
INSERT INTO public.users (id, email, password_hash, name, role, location, farm_size_acres, soil_type, phone)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'farmer@agri.ai', '$2a$10$e7x1vQ5e6QkH9L0o3q6u7.r8y1vQ5e6QkH9L0o3q6u7.r8y1vQ5e6', 'John Deere Farmer', 'farmer', 'Central Valley, CA', 45.5, 'Silty Loam', '+1 555-0199'),
  ('22222222-2222-2222-2222-222222222222', 'admin@agri.ai', '$2a$10$e7x1vQ5e6QkH9L0o3q6u7.r8y1vQ5e6QkH9L0o3q6u7.r8y1vQ5e6', 'Dr. Sarah Agronomist', 'admin', 'University Research Farm', 120.0, 'Clay Loam', '+1 555-0188')
ON CONFLICT (email) DO NOTHING;

-- Seed Crops
INSERT INTO public.crops (id, user_id, name, variety, planting_date, soil_type, area_acres, status)
VALUES
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Tomato', 'Roma Hybrid', '2026-03-15', 'Silty Loam', 12.5, 'active'),
  ('a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Wheat', 'Hard Red Winter', '2025-11-01', 'Loamy', 20.0, 'active'),
  ('a3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Maize (Corn)', 'Sweet Corn Sweetness FX', '2026-04-10', 'Clay Loam', 13.0, 'active')
ON CONFLICT (id) DO NOTHING;

-- Seed Advisories
INSERT INTO public.advisories (id, user_id, crop_name, soil_type, growth_stage, location, symptoms, irrigation_method, title, recommendations, fertilizer, irrigation, prevention, weather_precautions, risk_level)
VALUES
  ('b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Tomato', 'Silty Loam', 'Flowering & Fruiting', 'Central Valley, CA', ARRAY['Yellowing bottom leaves', 'Minor dark spots'], 'Drip Irrigation',
  'Tomato Early Blight & Nitrogen Management Plan',
  ARRAY['Apply copper-based fungicide at 7-day intervals during high humidity.', 'Prune low-hanging foliage to increase ground airflow and prevent soil splash contamination.'],
  'Apply N-P-K 10-10-20 with soluble calcium nitrate at 15 lbs/acre to prevent blossom end rot.',
  'Maintain steady drip irrigation at 1.8 inches/week; avoid overhead sprinklers.',
  ARRAY['Practice 3-year crop rotation with non-solanaceous crops.', 'Use disease-resistant certified seed varieties for future plantings.'],
  ARRAY['Upcoming rain forecast on Friday: apply preventative fungicide 24h prior.'],
  'Medium')
ON CONFLICT (id) DO NOTHING;

-- Seed Diagnoses
INSERT INTO public.diagnoses (id, user_id, crop_name, disease, confidence, recommendations, fertilizer, irrigation, prevention, symptoms_detected, severity)
VALUES
  ('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Tomato', 'Tomato Late Blight (Phytophthora infestans)', 94.5,
  ARRAY['Spray systemic fungicide such as Mafenoxam or Chlorothalonil immediately.', 'Destroy severely infected leaves away from the field to avoid spore spread.'],
  'Foliar spray of Potassium Phosphate and Micronutrients (Zinc & Boron) to enhance plant immune response.',
  'Reduce drip frequency by 20% until moisture levels stabilize below 70%.',
  ARRAY['Keep foliage dry by morning-only drip watering.', 'Ensure proper row spacing (30-36 inches) for ventilation.'],
  ARRAY['Water-soaked dark lesions on leaf tips', 'White mold growth on leaf undersides'],
  'Severe')
ON CONFLICT (id) DO NOTHING;

-- Seed Weather Logs
INSERT INTO public.weather_logs (location, temperature, humidity, condition, wind_speed, precipitation_probability, uv_index, evapotranspiration_mm)
VALUES
  ('Central Valley, CA', 27.5, 62.0, 'Partly Cloudy', 12.4, 15.0, 7.2, 4.8)
ON CONFLICT (id) DO NOTHING;
