"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherQuerySchema = exports.ProfileUpdateSchema = exports.DiagnosisResponseSchema = exports.AdvisoryResponseSchema = exports.DiagnosisRequestSchema = exports.AdvisoryRequestSchema = exports.AuthLoginSchema = exports.AuthRegisterSchema = void 0;
const zod_1 = require("zod");
// Authentication Schemas
exports.AuthRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    role: zod_1.z.enum(['farmer', 'agronomist', 'admin']).default('farmer'),
    location: zod_1.z.string().optional(),
    farm_size_acres: zod_1.z.number().positive().optional(),
    soil_type: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
exports.AuthLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required')
});
// Advisory Request Schema
exports.AdvisoryRequestSchema = zod_1.z.object({
    crop_name: zod_1.z.string().min(2, 'Crop name is required'),
    soil_type: zod_1.z.string().optional().default('Loamy'),
    growth_stage: zod_1.z.string().optional().default('Vegetative'),
    location: zod_1.z.string().optional().default('General Agricultural Region'),
    symptoms: zod_1.z.array(zod_1.z.string()).optional().default([]),
    irrigation_method: zod_1.z.string().optional().default('Drip'),
    field_notes: zod_1.z.string().optional()
});
// Diagnosis Request Schema (Image upload + optional context)
exports.DiagnosisRequestSchema = zod_1.z.object({
    image: zod_1.z.string().min(1, 'Base64 image content or URL is required'),
    crop_name: zod_1.z.string().optional(),
    symptoms: zod_1.z.string().optional(),
    location: zod_1.z.string().optional()
});
// Structured AI Response Schemas
exports.AdvisoryResponseSchema = zod_1.z.object({
    title: zod_1.z.string(),
    recommendations: zod_1.z.array(zod_1.z.string()),
    fertilizer: zod_1.z.string(),
    irrigation: zod_1.z.string(),
    prevention: zod_1.z.array(zod_1.z.string()),
    weather_precautions: zod_1.z.array(zod_1.z.string()).optional(),
    risk_level: zod_1.z.enum(['Low', 'Medium', 'High', 'Severe'])
});
exports.DiagnosisResponseSchema = zod_1.z.object({
    disease: zod_1.z.string(),
    confidence: zod_1.z.number().min(0).max(100),
    recommendations: zod_1.z.array(zod_1.z.string()),
    fertilizer: zod_1.z.string(),
    irrigation: zod_1.z.string(),
    prevention: zod_1.z.array(zod_1.z.string()),
    symptoms_detected: zod_1.z.array(zod_1.z.string()).optional(),
    severity: zod_1.z.enum(['Mild', 'Moderate', 'Severe']).optional()
});
// Profile Update Schema
exports.ProfileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    location: zod_1.z.string().optional(),
    farm_size_acres: zod_1.z.number().positive().optional(),
    soil_type: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
// Weather Query Schema
exports.WeatherQuerySchema = zod_1.z.object({
    location: zod_1.z.string().optional(),
    lat: zod_1.z.number().optional(),
    lon: zod_1.z.number().optional()
});
