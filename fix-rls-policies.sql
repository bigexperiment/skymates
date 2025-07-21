-- Fix RLS Policies for Skymates
-- Run this in your Supabase SQL editor

-- First, let's see what policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('passenger_requests', 'companion_signups');

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert on passenger_requests" ON passenger_requests;
DROP POLICY IF EXISTS "Allow public insert on companion_signups" ON companion_signups;

-- Create new policies that allow anonymous inserts
CREATE POLICY "Allow anonymous insert on passenger_requests" ON passenger_requests
  FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on companion_signups" ON companion_signups
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Also allow anonymous users to read their own data (optional)
CREATE POLICY "Allow anonymous read on passenger_requests" ON passenger_requests
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous read on companion_signups" ON companion_signups
  FOR SELECT 
  TO anon
  USING (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('passenger_requests', 'companion_signups'); 