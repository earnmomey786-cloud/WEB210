/*
  # Quote Requests Table

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key)
      - `full_name` (text) - Client's full name for invoicing
      - `email` (text) - Client's email
      - `phone` (text) - Client's phone number
      - `num_properties` (integer) - Number of properties
      - `num_owners` (integer) - Number of property owners (titulares)
      - `has_garage_storage` (boolean) - If they have garage or storage
      - `additional_notes` (text) - Any additional information
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `quote_requests` table
    - Add policy for inserting quote requests (public can insert)
    - Admin access for reading (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  num_properties integer NOT NULL DEFAULT 1,
  num_owners integer NOT NULL DEFAULT 1,
  has_garage_storage boolean DEFAULT false,
  additional_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);
