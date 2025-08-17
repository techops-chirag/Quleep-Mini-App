CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  model_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);