-- Migration script to update Skymates database schema
-- Run this in your Supabase SQL editor

-- First, let's see the current table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'passenger_requests' 
ORDER BY ordinal_position;

-- Drop the existing view first (since it references the needs column)
DROP VIEW IF EXISTS potential_matches;

-- Remove the needs column from passenger_requests table
ALTER TABLE passenger_requests DROP COLUMN IF EXISTS needs;

-- Make email column nullable (optional)
ALTER TABLE passenger_requests ALTER COLUMN email DROP NOT NULL;

-- Remove languages and skills columns from companion_signups table
ALTER TABLE companion_signups DROP COLUMN IF EXISTS languages;
ALTER TABLE companion_signups DROP COLUMN IF EXISTS skills;

-- Recreate the potential_matches view without the needs column
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

-- Verify the updated table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'passenger_requests' 
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'companion_signups' 
ORDER BY ordinal_position; 