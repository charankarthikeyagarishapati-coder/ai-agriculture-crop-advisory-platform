import { Response } from 'express';
import { randomUUID as uuidv4 } from 'crypto';
import { AuthRequest } from '../middleware/auth';
import { generateCropAdvisoryAI } from '../services/gemini';
import { fetchLiveWeatherData } from '../services/weather';
import { supabase } from '../services/supabase';
import { Advisory } from '../shared/types';

export async function createAdvisory(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id || '11111111-1111-1111-1111-111111111111';
    const { crop_name, soil_type, growth_stage, location, symptoms, irrigation_method, field_notes } = req.body;

    const weather = await fetchLiveWeatherData(location);
    const weatherSummary = `Temp: ${weather.temperature}°C, Humidity: ${weather.humidity}%, Condition: ${weather.condition}, Rain Risk: ${weather.precipitation_probability}%`;

    const aiResult = await generateCropAdvisoryAI({
      crop_name,
      soil_type,
      growth_stage,
      location,
      symptoms,
      irrigation_method,
      field_notes,
      weather_summary: weatherSummary
    });

    const newAdvisory: Advisory = {
      id: uuidv4(),
      user_id: userId,
      crop_name,
      soil_type: soil_type || 'Loamy',
      growth_stage: growth_stage || 'Vegetative',
      location: location || weather.location,
      symptoms: symptoms || [],
      irrigation_method: irrigation_method || 'Drip',
      title: aiResult.title || `${crop_name} Agricultural Advisory`,
      recommendations: aiResult.recommendations || [],
      fertilizer: aiResult.fertilizer || 'Standard balanced fertilizer application.',
      irrigation: aiResult.irrigation || 'Regular morning irrigation.',
      prevention: aiResult.prevention || [],
      weather_precautions: aiResult.weather_precautions || [],
      risk_level: aiResult.risk_level || 'Low',
      created_at: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('advisories').insert(newAdvisory).select().single();
      if (!error && data) {
        return res.status(201).json(data);
      }
    }

    return res.status(201).json(newAdvisory);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to generate advisory' });
  }
}
