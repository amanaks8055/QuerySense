-- QuerySense Database Initialization Script
-- PostgreSQL

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create queries table
CREATE TABLE IF NOT EXISTS queries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  sql_query TEXT,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create query_results table
CREATE TABLE IF NOT EXISTS query_results (
  id SERIAL PRIMARY KEY,
  query_id INTEGER REFERENCES queries(id) ON DELETE CASCADE,
  result_data JSONB,
  insights TEXT,
  execution_time INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_queries_user_id ON queries(user_id);
CREATE INDEX IF NOT EXISTS idx_queries_created_at ON queries(created_at);
CREATE INDEX IF NOT EXISTS idx_query_results_query_id ON query_results(query_id);

-- Demo tables for testing queries

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  city VARCHAR(100),
  country VARCHAR(100),
  signup_date DATE DEFAULT CURRENT_DATE
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  supplier VARCHAR(255)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);

-- Create indexes for demo tables
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_customers_country ON customers(country);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create a default admin user (password: admin123)
-- Note: In production, change this password immediately
INSERT INTO users (email, password, role) 
VALUES ('admin@querysense.app', '$2b$10$xQJ3lq6yZ9nGZQJXqY9K2eH0kF5xZqY3pGZ9lZqY3pGZ9lZqY3pGZ', 'admin')
ON CONFLICT (email) DO NOTHING;

COMMENT ON TABLE users IS 'Application users with role-based access';
COMMENT ON TABLE queries IS 'User-submitted natural language queries';
COMMENT ON TABLE query_results IS 'Execution results and AI-generated insights';
COMMENT ON TABLE customers IS 'Demo customer data for testing';
COMMENT ON TABLE products IS 'Demo product catalog for testing';
COMMENT ON TABLE orders IS 'Demo order transactions for testing';

-- Grant SELECT permissions for demo tables (for query execution)
-- In production, create a separate read-only user

SELECT 'Database initialized successfully!' as message;
