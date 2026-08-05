import { z } from 'zod';

// Authentication Schemas
export const AuthRegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['farmer', 'agronomist', 'admin']).default('farmer'),
  location: z.string().optional(),
  farm_size_acres: z.number().positive().optional(),
  soil_type: z.string().optional(),
  phone: z.string().optional()
});

export const AuthLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Advisory Request Schema
export const AdvisoryRequestSchema = z.object({
  crop_name: z.string().min(2, 'Crop name is required'),
  soil_type: z.string().optional().default('Loamy'),
  growth_stage: z.string().optional().default('Vegetative'),
  location: z.string().optional().default('General Agricultural Region'),
  symptoms: z.array(z.string()).optional().default([]),
  irrigation_method: z.string().optional().default('Drip'),
  field_notes: z.string().optional()
});

// Diagnosis Request Schema (Image upload + optional context)
export const DiagnosisRequestSchema = z.object({
  image: z.string().min(1, 'Base64 image content or URL is required'),
  crop_name: z.string().optional(),
  symptoms: z.string().optional(),
  location: z.string().optional()
});

// Structured AI Response Schemas
export const AdvisoryResponseSchema = z.object({
  title: z.string(),
  recommendations: z.array(z.string()),
  fertilizer: z.string(),
  irrigation: z.string(),
  prevention: z.array(z.string()),
  weather_precautions: z.array(z.string()).optional(),
  risk_level: z.enum(['Low', 'Medium', 'High', 'Severe'])
});

export const DiagnosisResponseSchema = z.object({
  disease: z.string(),
  confidence: z.number().min(0).max(100),
  recommendations: z.array(z.string()),
  fertilizer: z.string(),
  irrigation: z.string(),
  prevention: z.array(z.string()),
  symptoms_detected: z.array(z.string()).optional(),
  severity: z.enum(['Mild', 'Moderate', 'Severe']).optional()
});

// Profile Update Schema
export const ProfileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  location: z.string().optional(),
  farm_size_acres: z.number().positive().optional(),
  soil_type: z.string().optional(),
  phone: z.string().optional()
});

// Weather Query Schema
export const WeatherQuerySchema = z.object({
  location: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional()
});
