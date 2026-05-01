import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Create a dummy client if URL is missing to prevent immediate crash on module load
export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get: (target, prop) => {
        if (prop === 'auth') {
          return new Proxy({}, {
            get: () => () => {
              console.error('Supabase URL or Key is missing. Please check your environment variables.');
              return Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured') });
            }
          });
        }
        return () => {
          console.error('Supabase URL or Key is missing. Please check your environment variables.');
          return {
            select: () => ({ order: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }),
            insert: () => ({ select: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
            upsert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
            update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
            delete: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
            eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
            single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          };
        };
      }
    });
