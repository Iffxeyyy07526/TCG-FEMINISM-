
-- Create a table for public profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  whatsapp_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  plan TEXT CHECK (plan IN ('starter', 'pro', 'elite')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a table for trading signals
CREATE TABLE signals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('BUY', 'SELL')),
  ticker TEXT NOT NULL,
  price TEXT NOT NULL,
  target TEXT NOT NULL,
  sl TEXT NOT NULL,
  rr_ratio TEXT NOT NULL,
  gain TEXT DEFAULT 'ACTIVE',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Profiles: Users can update their own profile (for initial setup)
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Signals: All authenticated users can view signals
-- Note: You might want to restrict this further based on user status
CREATE POLICY "Authenticated users can view signals" ON signals
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin policies (can be expanded based on specific admin auth)
-- For now, we assume admin is managed via service role or specific UID checks
