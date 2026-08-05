import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID as uuidv4 } from 'crypto';
import { ENV } from '../config/env';
import { supabase } from '../services/supabase';
import { AuthRequest } from '../middleware/auth';
import { localStore } from '../services/store';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name, role, location, farm_size_acres, soil_type, phone } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const newUser = {
      id: userId,
      email: cleanEmail,
      password_hash: passwordHash,
      name,
      role: role || 'farmer',
      location: location || 'Central Valley, CA',
      farm_size_acres: farm_size_acres || 25,
      soil_type: soil_type || 'Loamy',
      phone: phone || '',
      created_at: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('users').insert(newUser).select().single();
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const token = jwt.sign(
        { id: data.id, email: data.email, role: data.role, name: data.name },
        ENV.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        token,
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          location: data.location,
          farm_size_acres: data.farm_size_acres,
          soil_type: data.soil_type,
          phone: data.phone
        }
      });
    }

    // Fallback store
    localStore.users.push(newUser as any);
    localStore.passwordHashes[newUser.email] = passwordHash;
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.status(201).json({ token, user: newUser });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    let user: any = null;
    let hash: string = '';

    if (supabase) {
      const { data, error } = await supabase.from('users').select('*').eq('email', cleanEmail).single();
      if (data && !error) {
        user = data;
        hash = data.password_hash;
      }
    }

    if (!user) {
      user = localStore.users.find(u => u.email === cleanEmail);
      hash = localStore.passwordHashes[cleanEmail] || '';
    }

    if (!user || !hash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        location: user.location,
        farm_size_acres: user.farm_size_acres,
        soil_type: user.soil_type,
        phone: user.phone
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  let user: any = null;
  if (supabase) {
    const { data } = await supabase.from('users').select('*').eq('id', req.user.id).single();
    if (data) user = data;
  }

  if (!user) {
    user = localStore.users.find(u => u.id === req.user?.id);
  }

  if (!user) {
    return res.status(404).json({ error: 'User profile not found' });
  }

  return res.json({ user });
}
