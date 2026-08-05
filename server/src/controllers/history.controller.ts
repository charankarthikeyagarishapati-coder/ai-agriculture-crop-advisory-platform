import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../services/supabase';
import { localStore } from '../services/store';

export async function getHistory(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const type = (req.query.type as string) || 'all';
    const search = (req.query.search as string || '').toLowerCase();

    let userAdvisories: any[] = [];
    let userDiagnoses: any[] = [];

    if (supabase && userId) {
      if (req.user?.role === 'admin') {
        const { data: adv } = await supabase.from('advisories').select('*').order('created_at', { ascending: false });
        const { data: diag } = await supabase.from('diagnoses').select('*').order('created_at', { ascending: false });
        if (adv) userAdvisories = adv;
        if (diag) userDiagnoses = diag;
      } else {
        const { data: adv } = await supabase.from('advisories').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        const { data: diag } = await supabase.from('diagnoses').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        if (adv) userAdvisories = adv;
        if (diag) userDiagnoses = diag;
      }
    }

    if (userAdvisories.length === 0 && userDiagnoses.length === 0) {
      userAdvisories = localStore.advisories;
      userDiagnoses = localStore.diagnoses;
      if (userId && req.user?.role !== 'admin') {
        userAdvisories = userAdvisories.filter(a => a.user_id === userId);
        userDiagnoses = userDiagnoses.filter(d => d.user_id === userId);
      }
    }

    if (search) {
      userAdvisories = userAdvisories.filter(
        a => (a.crop_name || '').toLowerCase().includes(search) || (a.title || '').toLowerCase().includes(search)
      );
      userDiagnoses = userDiagnoses.filter(
        d => (d.crop_name || '').toLowerCase().includes(search) || (d.disease || '').toLowerCase().includes(search)
      );
    }

    return res.json({
      advisories: type === 'diagnosis' ? [] : userAdvisories,
      diagnoses: type === 'advisory' ? [] : userDiagnoses
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch history' });
  }
}
