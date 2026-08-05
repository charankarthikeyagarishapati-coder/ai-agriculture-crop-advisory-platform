import { Response } from 'express';
import { randomUUID as uuidv4 } from 'crypto';
import { AuthRequest } from '../middleware/auth';
import { diagnoseCropDiseaseImageAI } from '../services/gemini';
import { supabase } from '../services/supabase';
import { Diagnosis } from '../shared/types';

export async function createDiagnosis(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id || '11111111-1111-1111-1111-111111111111';
    const { image, crop_name, symptoms, location } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image base64 payload is required' });
    }

    const aiResult = await diagnoseCropDiseaseImageAI(image, crop_name, symptoms, location);

    const newDiagnosis: Diagnosis = {
      id: uuidv4(),
      user_id: userId,
      crop_name: crop_name || 'Crop',
      disease: aiResult.disease || 'Undetermined Leaf Lesion',
      confidence: typeof aiResult.confidence === 'number' ? aiResult.confidence : 90.0,
      recommendations: aiResult.recommendations || ['Inspect plant leaves daily'],
      fertilizer: aiResult.fertilizer || 'Foliar micronutrient spray',
      irrigation: aiResult.irrigation || 'Regulated drip irrigation',
      prevention: aiResult.prevention || ['Crop rotation'],
      symptoms_detected: aiResult.symptoms_detected || [],
      severity: aiResult.severity || 'Moderate',
      created_at: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('diagnoses').insert(newDiagnosis).select().single();
      if (!error && data) {
        return res.status(201).json(data);
      }
    }

    return res.status(201).json(newDiagnosis);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Image diagnosis failed' });
  }
}
