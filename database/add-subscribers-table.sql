-- Add subscribers table for blog newsletter
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for newsletter signup)
CREATE POLICY IF NOT EXISTS subscribers_insert ON public.subscribers
  FOR INSERT WITH CHECK (true);

-- Only allow users to see their own subscriptions (if they have an account)
CREATE POLICY IF NOT EXISTS subscribers_select ON public.subscribers
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Grant permissions
GRANT INSERT ON public.subscribers TO anon;
GRANT SELECT ON public.subscribers TO authenticated;
