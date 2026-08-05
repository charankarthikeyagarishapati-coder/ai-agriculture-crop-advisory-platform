import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from '../config/env';

let supabaseClient: SupabaseClient | null = null;

if (ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully.');
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
  }
} else {
  console.log('Supabase credentials not set. Operating in high-performance local store mode.');
}

export const supabase = supabaseClient;
