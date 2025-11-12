/*
  # Create orders table for sports nutrition store
  
  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `customer_name` (text) - Customer's full name
      - `phone` (text) - Customer's phone number
      - `email` (text) - Customer's email address
      - `product` (text) - Selected product name
      - `quantity` (integer) - Quantity ordered
      - `total_price` (decimal) - Total order price
      - `notes` (text, nullable) - Additional order notes
      - `created_at` (timestamptz) - Order creation timestamp
      - `status` (text) - Order status (new, processing, completed)
  
  2. Security
    - Enable RLS on `orders` table
    - Add policy for inserting orders (public access for form submissions)
    - Add policy for reading orders (admin access only, placeholder for future auth)
  
  3. Notes
    - Orders are publicly insertable to allow form submissions
    - Read access is restricted by default (future admin implementation)
    - Status field defaults to 'new' for tracking order lifecycle
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  product text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_price decimal(10,2) NOT NULL,
  notes text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);