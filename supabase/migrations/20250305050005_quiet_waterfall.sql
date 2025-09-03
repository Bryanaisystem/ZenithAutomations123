/*
  # Create Consultation Requests Table

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `contact_method` (text, required)
      - `service` (text, required)
      - `company_name` (text, required)
      - `challenges` (text, required)
      - `additional_info` (text)
      - `created_at` (timestamptz)
      - `status` (text, default: 'pending')

  2. Security
    - Enable RLS on `consultation_requests` table
    - Add policy for authenticated users to read their own requests
    - Add policy for unauthenticated users to create requests
*/

-- Create consultation requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  contact_method text NOT NULL,
  service text NOT NULL,
  company_name text NOT NULL,
  challenges text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow unauthenticated users to create consultation requests
CREATE POLICY "Anyone can create consultation requests"
  ON consultation_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read their own requests
CREATE POLICY "Users can read own consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.email());