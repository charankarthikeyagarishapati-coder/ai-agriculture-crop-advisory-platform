import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../services/supabase';
import { localStore } from '../services/store';
import { AdminStats, UserRole } from '../shared/types';

export async function getAdminStats(req: AuthRequest, res: Response) {
  try {
    let users: any[] = [];
    let advisories: any[] = [];
    let diagnoses: any[] = [];

    if (supabase) {
      const { data: u } = await supabase.from('users').select('*');
      const { data: a } = await supabase.from('advisories').select('*');
      const { data: d } = await supabase.from('diagnoses').select('*');
      if (u) users = u;
      if (a) advisories = a;
      if (d) diagnoses = d;
    }

    if (users.length === 0) {
      users = localStore.users;
      advisories = localStore.advisories;
      diagnoses = localStore.diagnoses;
    }

    const usersByRole: Record<UserRole, number> = {
      farmer: users.filter(u => u.role === 'farmer').length,
      agronomist: users.filter(u => u.role === 'agronomist').length,
      admin: users.filter(u => u.role === 'admin').length
    };

    const diseaseMap: Record<string, number> = {};
    diagnoses.forEach(diag => {
      diseaseMap[diag.disease] = (diseaseMap[diag.disease] || 0) + 1;
    });

    const topDiagnosedDiseases = Object.entries(diseaseMap)
      .map(([disease, count]) => ({ disease, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const cropMap: Record<string, number> = {};
    advisories.forEach(adv => {
      cropMap[adv.crop_name] = (cropMap[adv.crop_name] || 0) + 1;
    });
    diagnoses.forEach(diag => {
      if (diag.crop_name) {
        cropMap[diag.crop_name] = (cropMap[diag.crop_name] || 0) + 1;
      }
    });

    const topCropsSearched = Object.entries(cropMap)
      .map(([crop, count]) => ({ crop, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const stats: AdminStats = {
      total_users: users.length,
      users_by_role: usersByRole,
      total_advisories: advisories.length,
      total_diagnoses: diagnoses.length,
      top_diagnosed_diseases: topDiagnosedDiseases,
      top_crops_searched: topCropsSearched,
      recent_system_activities: localStore.systemLogs.slice(0, 10)
    };

    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch admin stats' });
  }
}
