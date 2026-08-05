import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../services/supabase';
import { localStore } from '../services/store';

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    let user: any = null;

    if (supabase && userId) {
      const { data } = await supabase.from('users').select('*').eq('id', userId).single();
      if (data) user = data;
    }

    if (!user) {
      user = localStore.users.find(u => u.id === userId);
    }

    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch profile' });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const { name, location, farm_size_acres, soil_type, phone } = req.body;

    if (supabase && userId) {
      const { data, error } = await supabase.from('users').update({
        ...(name && { name }),
        ...(location && { location }),
        ...(farm_size_acres && { farm_size_acres }),
        ...(soil_type && { soil_type }),
        ...(phone && { phone }),
        updated_at: new Date().toISOString()
      }).eq('id', userId).select().single();

      if (!error && data) {
        return res.json({ message: 'Profile updated successfully', user: data });
      }
    }

    let userIndex = localStore.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      localStore.users[userIndex] = {
        ...localStore.users[userIndex],
        ...(name && { name }),
        ...(location && { location }),
        ...(farm_size_acres && { farm_size_acres }),
        ...(soil_type && { soil_type }),
        ...(phone && { phone }),
        updated_at: new Date().toISOString()
      };
    }

    return res.json({ message: 'Profile updated successfully', user: localStore.users[userIndex] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Profile update failed' });
  }
}
