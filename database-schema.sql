-- Skymates Database Schema
-- Run this in your Supabase SQL editor

-- Create passenger_requests table
CREATE TABLE passenger_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  passenger_name TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  airline TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TIME,
  needs TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companion_signups table
CREATE TABLE companion_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  airline TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TIME,
  notes TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_passenger_requests_flight ON passenger_requests(airline, flight_date, from_location, to_location);
CREATE INDEX idx_companion_signups_flight ON companion_signups(airline, flight_date, from_location, to_location);
CREATE INDEX idx_passenger_requests_status ON passenger_requests(status);
CREATE INDEX idx_companion_signups_status ON companion_signups(status);

-- Enable Row Level Security (RLS)
ALTER TABLE passenger_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous read/write access (since this is a no-login app)
CREATE POLICY "Allow anonymous insert on passenger_requests" ON passenger_requests
  FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on companion_signups" ON companion_signups
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Also allow anonymous users to read data
CREATE POLICY "Allow anonymous read on passenger_requests" ON passenger_requests
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous read on companion_signups" ON companion_signups
  FOR SELECT 
  TO anon
  USING (true);

-- Optional: Create a view for matching passengers and companions
CREATE VIEW potential_matches AS
SELECT 
  pr.id as passenger_request_id,
  pr.passenger_name,
  pr.from_location,
  pr.to_location,
  pr.airline,
  pr.flight_date,
  pr.name as requester_name,
  pr.email as requester_email,
  cs.id as companion_signup_id,
  cs.name as companion_name,
  cs.email as companion_email
FROM passenger_requests pr
JOIN companion_signups cs ON 
  pr.airline = cs.airline AND
  pr.flight_date = cs.flight_date AND
  pr.from_location = cs.from_location AND
  pr.to_location = cs.to_location
WHERE pr.status = 'pending' AND cs.status = 'available'; 