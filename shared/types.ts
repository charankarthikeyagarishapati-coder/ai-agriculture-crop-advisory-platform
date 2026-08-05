import { z } from 'zod';

// User Roles
export type UserRole = 'farmer' | 'agronomist' | 'admin';

// User Entity
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  location?: string;
  farm_size_acres?: number;
  soil_type?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
}

// Crop Entity
export interface Crop {
  id: string;
  user_id: string;
  name: string;
  variety?: string;
  planting_date?: string;
  soil_type?: string;
  area_acres?: number;
  status: 'active' | 'harvested' | 'failed';
  created_at: string;
}

// Advisory Request & Response Entity
export interface Advisory {
  id: string;
  user_id: string;
  crop_name: string;
  soil_type?: string;
  growth_stage?: string;
  location?: string;
  symptoms?: string[];
  irrigation_method?: string;
  
  // AI Generated Results
  title: string;
  recommendations: string[];
  fertilizer: string;
  irrigation: string;
  prevention: string[];
  weather_precautions?: string[];
  risk_level: 'Low' | 'Medium' | 'High' | 'Severe';
  created_at: string;
}

// Disease Diagnosis Entity
export interface Diagnosis {
  id: string;
  user_id: string;
  crop_name?: string;
  image_url?: string;
  disease: string;
  confidence: number;
  recommendations: string[];
  fertilizer: string;
  irrigation: string;
  prevention: string[];
  symptoms_detected?: string[];
  severity?: 'Mild' | 'Moderate' | 'Severe';
  created_at: string;
}

// Weather Log Entity
export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
  wind_speed: number;
  precipitation_probability: number;
  uv_index: number;
  evapotranspiration_mm: number;
  forecast: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    condition: string;
    rain_probability: number;
  }>;
  retrieved_at: string;
}

// Dashboard Summary Stats
export interface DashboardStats {
  total_advisories: number;
  total_diagnoses: number;
  active_crops: number;
  healthy_crops_percentage: number;
  recent_advisories: Advisory[];
  recent_diagnoses: Diagnosis[];
  weather_summary: WeatherData | null;
}

// Admin Dashboard Analytics
export interface AdminStats {
  total_users: number;
  users_by_role: Record<UserRole, number>;
  total_advisories: number;
  total_diagnoses: number;
  top_diagnosed_diseases: Array<{ disease: string; count: number }>;
  top_crops_searched: Array<{ crop: string; count: number }>;
  recent_system_activities: Array<{
    id: string;
    user_email: string;
    action: string;
    timestamp: string;
  }>;
}
