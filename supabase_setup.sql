-- SUPABASE PROJECT SCHEMA
-- Run this in your Supabase SQL Editor

-- 1. PROFILES TABLE
-- This stores additional user data linked to Supabase Auth users.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'elite')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    plan_activated_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SIGNALS TABLE
-- This stores the trading signals displayed on the dashboard.
CREATE TABLE IF NOT EXISTS public.signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('BUY', 'SELL')),
    ticker TEXT NOT NULL,
    price TEXT NOT NULL,
    target TEXT NOT NULL,
    sl TEXT NOT NULL,
    rr_ratio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    gain TEXT, -- e.g., 'HIT', '+45%', 'PENDING'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SETTINGS TABLE
-- Global app settings for admin control (UPI, Maintenance, etc.)
CREATE TABLE IF NOT EXISTS public.settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    upi_id TEXT,
    qr_url TEXT,
    maintenance BOOLEAN DEFAULT FALSE,
    whatsapp_number TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO public.settings (id, upi_id, qr_url, maintenance, whatsapp_number)
VALUES (1, '9426961086@ptsbi', 'https://i.ibb.co/...', FALSE, '919426961086')
ON CONFLICT (id) DO NOTHING;

-- ENABLE RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES

-- Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Profiles: Users can update their own profile (limited fields commonly)
-- For this app, admin updates plan/status, but user might update name
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Signals: Anyone can read signals (we filter in code based on plan/status)
CREATE POLICY "Anyone can view signals" 
ON public.signals FOR SELECT 
USING (TRUE);

-- Settings: Anyone can read settings
CREATE POLICY "Anyone can view settings" 
ON public.settings FOR SELECT 
USING (TRUE);

-- ADMIN POLICIES (Example: If you have an admin role or specific email)
-- For now, allowing all writes if service role is used, or you can add specific admin UID policies
-- CREATE POLICY "Admins can do everything" ON public.signals FOR ALL USING (auth.jwt()->>'email' = 'mahir@thecapitalguru.net');

-- 5. FUNCTION TO HANDLE NEW USER SIGNUPS
-- Automatically creates a profile entry when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for handle_new_user
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    is_active BOOLEAN DEFAULT TRUE,
    max_uses INTEGER DEFAULT 100,
    used_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Anyone can read active coupons (to validate during checkout)
CREATE POLICY "Anyone can view coupons" 
ON public.coupons FOR SELECT 
USING (is_active = TRUE);

-- RPC TO INCREMENT COUPON USAGE
CREATE OR REPLACE FUNCTION public.increment_coupon_usage(coupon_code TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.coupons 
    SET used_count = used_count + 1 
    WHERE code = coupon_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
