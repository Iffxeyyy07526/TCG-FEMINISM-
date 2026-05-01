import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
    if (typeof window !== 'undefined') {
      console.error('Supabase credentials missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
    }
    // Return a dummy client that throws on use to force real setup
    return new Proxy({}, {
      get: () => {
        throw new Error('Supabase credentials not configured. App requires real Supabase setup.');
      }
    });
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase: SupabaseClient = getSupabase() as any;
