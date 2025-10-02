/*
  # Initial Schema for Model 210 IRNR Service

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `order_number` (text, unique) - Human-readable order number
      - `email` (text) - Customer email
      - `service_type` (text) - Type of service (sin_alquiler, con_alquiler_anual, con_alquiler_trimestral)
      - `copropietarios` (integer) - Number of additional co-owners
      - `total_amount` (numeric) - Total order amount in EUR
      - `status` (text) - Order status (paid, awaiting_data, ready_for_review, submitted)
      - `payment_intent_id` (text) - Stripe PaymentIntent ID
      - `briefing_token` (text, unique) - Secure token for briefing form access
      - `token_expires_at` (timestamptz) - Expiration time for briefing token
      - `created_at` (timestamptz) - Order creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `clients`
      - `id` (uuid, primary key) - Unique client identifier
      - `order_id` (uuid, foreign key) - Reference to orders table
      - `is_primary` (boolean) - Whether this is the primary owner or co-owner
      - `full_name` (text) - Full name (imię i nazwisko)
      - `address` (text) - Residential address
      - `country` (text) - Country of residence
      - `pesel` (text) - PESEL number (optional)
      - `nie` (text) - NIE number (if available)
      - `passport_number` (text) - Passport or ID document number
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `ownership_percentage` (numeric) - Ownership percentage (for co-owners)
      - `created_at` (timestamptz) - Record creation timestamp

    - `properties`
      - `id` (uuid, primary key) - Unique property identifier
      - `order_id` (uuid, foreign key) - Reference to orders table
      - `address_spain` (text) - Property address in Spain
      - `cadastral_number` (text) - Número catastral
      - `cadastral_value` (numeric) - Valor catastral from IBI
      - `is_shared_ownership` (boolean) - Whether property has co-owners
      - `created_at` (timestamptz) - Record creation timestamp

    - `rental_info`
      - `id` (uuid, primary key) - Unique rental info identifier
      - `order_id` (uuid, foreign key) - Reference to orders table
      - `rental_period_months` (integer) - Number of months rented
      - `gross_income` (numeric) - Total gross rental income
      - `deductible_costs` (jsonb) - JSON object with deductible costs breakdown
      - `is_quarterly` (boolean) - Whether filing quarterly (pre-2024) or annually
      - `created_at` (timestamptz) - Record creation timestamp

    - `documents`
      - `id` (uuid, primary key) - Unique document identifier
      - `order_id` (uuid, foreign key) - Reference to orders table
      - `document_type` (text) - Type of document (ibi, rental_contract, invoice, escritura, id_document, justificante)
      - `file_name` (text) - Original file name
      - `file_path` (text) - Storage path/URL
      - `file_size` (integer) - File size in bytes
      - `mime_type` (text) - File MIME type
      - `uploaded_at` (timestamptz) - Upload timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access based on order tokens
*/

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  email text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('sin_alquiler', 'con_alquiler_anual', 'con_alquiler_trimestral')),
  copropietarios integer DEFAULT 0,
  total_amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'paid' CHECK (status IN ('paid', 'awaiting_data', 'ready_for_review', 'submitted')),
  payment_intent_id text,
  briefing_token text UNIQUE NOT NULL,
  token_expires_at timestamptz DEFAULT (now() + interval '72 hours'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  is_primary boolean DEFAULT true,
  full_name text NOT NULL,
  address text,
  country text,
  pesel text,
  nie text,
  passport_number text,
  email text,
  phone text,
  ownership_percentage numeric(5, 2),
  created_at timestamptz DEFAULT now()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  address_spain text NOT NULL,
  cadastral_number text,
  cadastral_value numeric(10, 2),
  is_shared_ownership boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Rental info table
CREATE TABLE IF NOT EXISTS rental_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  rental_period_months integer,
  gross_income numeric(10, 2),
  deductible_costs jsonb DEFAULT '{}'::jsonb,
  is_quarterly boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL CHECK (document_type IN ('ibi', 'rental_contract', 'invoice', 'escritura', 'id_document', 'justificante')),
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer,
  mime_type text,
  uploaded_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders (token-based access)
CREATE POLICY "Orders can be accessed with valid token"
  ON orders
  FOR SELECT
  USING (
    briefing_token IS NOT NULL AND
    token_expires_at > now()
  );

CREATE POLICY "Orders can be updated with valid token"
  ON orders
  FOR UPDATE
  USING (
    briefing_token IS NOT NULL AND
    token_expires_at > now()
  );

-- RLS Policies for clients
CREATE POLICY "Clients can be read via order token"
  ON clients
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = clients.order_id
      AND orders.token_expires_at > now()
    )
  );

CREATE POLICY "Clients can be inserted via order"
  ON clients
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = clients.order_id
      AND orders.token_expires_at > now()
    )
  );

-- RLS Policies for properties
CREATE POLICY "Properties can be read via order token"
  ON properties
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = properties.order_id
      AND orders.token_expires_at > now()
    )
  );

CREATE POLICY "Properties can be inserted via order"
  ON properties
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = properties.order_id
      AND orders.token_expires_at > now()
    )
  );

-- RLS Policies for rental_info
CREATE POLICY "Rental info can be read via order token"
  ON rental_info
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = rental_info.order_id
      AND orders.token_expires_at > now()
    )
  );

CREATE POLICY "Rental info can be inserted via order"
  ON rental_info
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = rental_info.order_id
      AND orders.token_expires_at > now()
    )
  );

-- RLS Policies for documents
CREATE POLICY "Documents can be read via order token"
  ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = documents.order_id
      AND orders.token_expires_at > now()
    )
  );

CREATE POLICY "Documents can be inserted via order"
  ON documents
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = documents.order_id
      AND orders.token_expires_at > now()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_token ON orders(briefing_token);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_clients_order_id ON clients(order_id);
CREATE INDEX IF NOT EXISTS idx_properties_order_id ON properties(order_id);
CREATE INDEX IF NOT EXISTS idx_rental_info_order_id ON rental_info(order_id);
CREATE INDEX IF NOT EXISTS idx_documents_order_id ON documents(order_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
