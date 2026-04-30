import { createClient, SupabaseClient } from '@supabase/supabase-js';

function createMockSupabase(): any {
  if (typeof window !== 'undefined') {
    console.warn('Supabase credentials missing. Utilizing Local Persistence Mode (localStorage).');
  }
  
  const mockStorage = typeof window !== 'undefined' ? window.localStorage : { 
    getItem: () => null, 
    setItem: () => null, 
    removeItem: () => null 
  };

  const getFromLS = (key: string) => {
    try {
      const data = mockStorage.getItem(`tcg_mock_${key}`);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  };

  const saveToLS = (key: string, data: any) => {
    try { mockStorage.setItem(`tcg_mock_${key}`, JSON.stringify(data)); } catch {}
  };

  return {
    auth: {
      getSession: async () => ({ 
        data: { session: JSON.parse(mockStorage.getItem('tcg_session') || 'null') }, 
        error: null 
      }),
      onAuthStateChange: (cb: any) => {
        const session = JSON.parse(mockStorage.getItem('tcg_session') || 'null');
        setTimeout(() => cb('SIGNED_IN', session), 0);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signInWithPassword: async ({ email }: any) => {
        const session = { user: { id: 'mock-user-id', email, user_metadata: { full_name: 'Admin User' } } };
        mockStorage.setItem('tcg_session', JSON.stringify(session));
        return { data: session, error: null };
      },
      signUp: async ({ email, options }: any) => {
        const user = { id: 'mock-user-id-' + Math.random().toString(36).substr(2, 9), email, user_metadata: options?.data };
        mockStorage.setItem('tcg_session', JSON.stringify({ user }));
        return { data: { user }, error: null };
      },
      signOut: async () => {
        mockStorage.removeItem('tcg_session');
        return { error: null };
      },
    },
    from: (table: string) => ({
      select: () => ({
        order: () => ({
          single: async () => ({ data: getFromLS(table)[0] || null, error: null }),
          then: (cb: any) => cb({ data: getFromLS(table), error: null }),
          data: getFromLS(table),
          error: null
        }),
        eq: () => ({
          single: async () => ({ data: getFromLS(table)[0] || null, error: null }),
          then: (cb: any) => cb({ data: getFromLS(table), error: null }),
        }),
        single: async () => ({ data: getFromLS(table)[0] || null, error: null }),
        then: (cb: any) => cb({ data: getFromLS(table), error: null }),
        data: getFromLS(table),
        error: null
      }),
      insert: (items: any[]) => ({
        select: async () => {
          const current = getFromLS(table);
          const newItems = items.map(i => ({ 
            ...i, 
            id: i.id || Math.random().toString(36).substr(2, 9), 
            created_at: new Date().toISOString() 
          }));
          saveToLS(table, [...newItems, ...current]);
          return { data: newItems, error: null };
        }
      }),
      upsert: async (item: any | any[]) => {
        const current = getFromLS(table);
        const items = Array.isArray(item) ? item : [item];
        items.forEach(it => {
          const index = current.findIndex((i: any) => i.id === it.id);
          if (index > -1) current[index] = { ...current[index], ...it };
          else current.push({ ...it, id: it.id || Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() });
        });
        saveToLS(table, current);
        return { data: item, error: null };
      },
      update: (updates: any) => ({
        eq: async (key: string, val: any) => {
          const current = getFromLS(table);
          const index = current.findIndex((i: any) => i[key] === val);
          if (index > -1) current[index] = { ...current[index], ...updates };
          saveToLS(table, current);
          return { error: null };
        }
      }),
      delete: () => ({
        eq: async (key: string, val: any) => {
          const current = getFromLS(table);
          const filtered = current.filter((i: any) => i[key] !== val);
          saveToLS(table, filtered);
          return { error: null };
        }
      })
    })
  };
}

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
    return createMockSupabase();
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase: SupabaseClient = getSupabase() as any; 
