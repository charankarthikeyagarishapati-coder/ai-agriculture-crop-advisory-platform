import { User, Crop, Advisory, Diagnosis, WeatherData } from '../shared/types';
import bcrypt from 'bcryptjs';

// Pre-hashed password "password123"
const defaultPasswordHash = bcrypt.hashSync('password123', 10);

export class LocalStore {
  private static instance: LocalStore;

  public users: User[] = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'farmer@agri.ai',
      name: 'John Deere Farmer',
      role: 'farmer',
      location: 'Central Valley, CA',
      farm_size_acres: 45.5,
      soil_type: 'Silty Loam',
      phone: '+1 555-0199',
      created_at: new Date('2026-01-10').toISOString()
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      email: 'admin@agri.ai',
      name: 'Dr. Sarah Agronomist',
      role: 'admin',
      location: 'University Research Station',
      farm_size_acres: 120.0,
      soil_type: 'Clay Loam',
      phone: '+1 555-0188',
      created_at: new Date('2026-01-01').toISOString()
    }
  ];

  public passwordHashes: Record<string, string> = {
    'farmer@agri.ai': defaultPasswordHash,
    'admin@agri.ai': defaultPasswordHash
  };

  public crops: Crop[] = [
    {
      id: 'a1111111-1111-1111-1111-111111111111',
      user_id: '11111111-1111-1111-1111-111111111111',
      name: 'Tomato',
      variety: 'Roma Hybrid',
      planting_date: '2026-03-15',
      soil_type: 'Silty Loam',
      area_acres: 12.5,
      status: 'active',
      created_at: new Date('2026-03-15').toISOString()
    },
    {
      id: 'a2222222-2222-2222-2222-222222222222',
      user_id: '11111111-1111-1111-1111-111111111111',
      name: 'Wheat',
      variety: 'Hard Red Winter',
      planting_date: '2025-11-01',
      soil_type: 'Loamy',
      area_acres: 20.0,
      status: 'active',
      created_at: new Date('2025-11-01').toISOString()
    },
    {
      id: 'a3333333-3333-3333-3333-333333333333',
      user_id: '11111111-1111-1111-1111-111111111111',
      name: 'Corn (Maize)',
      variety: 'Sweet Corn FX',
      planting_date: '2026-04-10',
      soil_type: 'Clay Loam',
      area_acres: 13.0,
      status: 'active',
      created_at: new Date('2026-04-10').toISOString()
    }
  ];

  public advisories: Advisory[] = [
    {
      id: 'b1111111-1111-1111-1111-111111111111',
      user_id: '11111111-1111-1111-1111-111111111111',
      crop_name: 'Tomato',
      soil_type: 'Silty Loam',
      growth_stage: 'Flowering & Fruiting',
      location: 'Central Valley, CA',
      symptoms: ['Yellowing bottom leaves', 'Minor dark spots'],
      irrigation_method: 'Drip Irrigation',
      title: 'Tomato Early Blight & Nitrogen Management Plan',
      recommendations: [
        'Apply copper-based fungicide at 7-day intervals during high humidity.',
        'Prune low-hanging foliage to increase ground airflow and prevent soil splash contamination.'
      ],
      fertilizer: 'Apply N-P-K 10-10-20 with soluble calcium nitrate at 15 lbs/acre to prevent blossom end rot.',
      irrigation: 'Maintain steady drip irrigation at 1.8 inches/week; avoid overhead sprinklers.',
      prevention: [
        'Practice 3-year crop rotation with non-solanaceous crops.',
        'Use disease-resistant certified seed varieties for future plantings.'
      ],
      weather_precautions: [
        'Upcoming rain forecast on Friday: apply preventative fungicide 24h prior.'
      ],
      risk_level: 'Medium',
      created_at: new Date('2026-07-28').toISOString()
    }
  ];

  public diagnoses: Diagnosis[] = [
    {
      id: 'c1111111-1111-1111-1111-111111111111',
      user_id: '11111111-1111-1111-1111-111111111111',
      crop_name: 'Tomato',
      disease: 'Tomato Early Blight (Alternaria solani)',
      confidence: 94.5,
      recommendations: [
        'Spray systemic fungicide such as Chlorothalonil or Mancozeb immediately.',
        'Destroy severely infected leaves away from field to stop airborne spore spread.'
      ],
      fertilizer: 'Foliar spray of Potassium Phosphate and Zinc/Boron micronutrients to boost plant immune defense.',
      irrigation: 'Reduce drip irrigation frequency by 20% until canopy dries out.',
      prevention: [
        'Maintain wide row spacing (36 inches) for maximal solar ventilation.',
        'Mulch soil bed with straw or plastic film to block soil fungal spores.'
      ],
      symptoms_detected: ['Concentric bullseye rings on lower leaves', 'Yellow chlorotic margins'],
      severity: 'Moderate',
      created_at: new Date('2026-08-01').toISOString()
    }
  ];

  public systemLogs: Array<{ id: string; user_email: string; action: string; timestamp: string }> = [
    {
      id: 'log-1',
      user_email: 'farmer@agri.ai',
      action: 'Generated New Advisory for Tomato',
      timestamp: new Date('2026-07-28T14:20:00Z').toISOString()
    },
    {
      id: 'log-2',
      user_email: 'farmer@agri.ai',
      action: 'Uploaded Crop Image for Health Diagnosis',
      timestamp: new Date('2026-08-01T09:45:00Z').toISOString()
    }
  ];

  private constructor() {}

  public static getInstance(): LocalStore {
    if (!LocalStore.instance) {
      LocalStore.instance = new LocalStore();
    }
    return LocalStore.instance;
  }
}

export const localStore = LocalStore.getInstance();
