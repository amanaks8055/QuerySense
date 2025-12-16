-- QuerySense Database Seed Data
-- Demo data for testing natural language queries

-- Insert demo customers
INSERT INTO customers (name, email, city, country, signup_date) VALUES
('John Smith', 'john.smith@email.com', 'New York', 'USA', '2024-01-15'),
('Emma Johnson', 'emma.j@email.com', 'London', 'UK', '2024-02-20'),
('Michael Chen', 'michael.chen@email.com', 'Singapore', 'Singapore', '2024-01-10'),
('Sarah Williams', 'sarah.w@email.com', 'Toronto', 'Canada', '2024-03-05'),
('David Brown', 'david.b@email.com', 'Sydney', 'Australia', '2024-02-14'),
('Lisa Garcia', 'lisa.garcia@email.com', 'Madrid', 'Spain', '2024-01-25'),
('James Wilson', 'james.w@email.com', 'Los Angeles', 'USA', '2024-02-01'),
('Maria Rodriguez', 'maria.r@email.com', 'Mexico City', 'Mexico', '2024-03-10'),
('Robert Taylor', 'robert.t@email.com', 'Chicago', 'USA', '2024-01-30'),
('Anna Schmidt', 'anna.s@email.com', 'Berlin', 'Germany', '2024-02-18'),
('Tom Anderson', 'tom.a@email.com', 'Seattle', 'USA', '2024-01-12'),
('Sophie Martin', 'sophie.m@email.com', 'Paris', 'France', '2024-02-25'),
('Chris Lee', 'chris.lee@email.com', 'Seoul', 'South Korea', '2024-03-01'),
('Jessica White', 'jessica.w@email.com', 'Miami', 'USA', '2024-01-22'),
('Daniel Kim', 'daniel.k@email.com', 'Tokyo', 'Japan', '2024-02-08')
ON CONFLICT (email) DO NOTHING;

-- Insert demo products
INSERT INTO products (name, category, price, stock_quantity, supplier) VALUES
('Laptop Pro 15', 'Electronics', 1299.99, 45, 'TechSupply Co'),
('Wireless Mouse', 'Electronics', 29.99, 150, 'TechSupply Co'),
('Office Chair Deluxe', 'Furniture', 349.99, 30, 'Office Plus'),
('Standing Desk', 'Furniture', 599.99, 20, 'Office Plus'),
('USB-C Hub', 'Electronics', 49.99, 80, 'TechSupply Co'),
('Webcam HD', 'Electronics', 79.99, 60, 'MediaTech Inc'),
('Headphones Pro', 'Electronics', 199.99, 55, 'AudioMax'),
('Mechanical Keyboard', 'Electronics', 129.99, 70, 'TechSupply Co'),
('Monitor 27inch', 'Electronics', 399.99, 35, 'DisplayCorp'),
('Desk Lamp LED', 'Furniture', 45.99, 90, 'Office Plus'),
('Ergonomic Mousepad', 'Office Supplies', 19.99, 120, 'Office Plus'),
('Cable Organizer', 'Office Supplies', 14.99, 150, 'Office Plus'),
('Laptop Stand', 'Electronics', 39.99, 65, 'TechSupply Co'),
('USB Flash Drive 128GB', 'Electronics', 24.99, 200, 'DataStore Inc'),
('Portable SSD 1TB', 'Electronics', 149.99, 40, 'DataStore Inc')
ON CONFLICT DO NOTHING;

-- Insert demo orders
INSERT INTO orders (customer_id, product_id, quantity, total_amount, order_date, status) VALUES
(1, 1, 1, 1299.99, '2024-03-01 10:30:00', 'delivered'),
(1, 2, 2, 59.98, '2024-03-01 10:30:00', 'delivered'),
(2, 3, 1, 349.99, '2024-03-02 14:20:00', 'delivered'),
(3, 7, 1, 199.99, '2024-03-03 09:15:00', 'shipped'),
(4, 4, 1, 599.99, '2024-03-04 16:45:00', 'processing'),
(5, 9, 1, 399.99, '2024-03-05 11:00:00', 'delivered'),
(6, 8, 1, 129.99, '2024-03-06 13:30:00', 'delivered'),
(7, 1, 1, 1299.99, '2024-03-07 10:00:00', 'shipped'),
(8, 5, 3, 149.97, '2024-03-08 15:20:00', 'delivered'),
(9, 6, 2, 159.98, '2024-03-09 12:10:00', 'processing'),
(10, 10, 2, 91.98, '2024-03-10 14:00:00', 'delivered'),
(11, 2, 1, 29.99, '2024-03-11 09:45:00', 'delivered'),
(11, 11, 1, 19.99, '2024-03-11 09:45:00', 'delivered'),
(12, 13, 1, 39.99, '2024-03-12 16:30:00', 'shipped'),
(13, 14, 5, 124.95, '2024-03-13 10:20:00', 'delivered'),
(14, 15, 1, 149.99, '2024-03-14 11:50:00', 'processing'),
(15, 7, 1, 199.99, '2024-03-15 13:15:00', 'pending'),
(1, 12, 3, 44.97, '2024-03-16 10:00:00', 'delivered'),
(2, 8, 1, 129.99, '2024-03-17 14:30:00', 'shipped'),
(3, 1, 1, 1299.99, '2024-03-18 09:00:00', 'processing'),
(4, 9, 1, 399.99, '2024-03-19 15:45:00', 'pending'),
(5, 3, 1, 349.99, '2024-03-20 11:20:00', 'delivered'),
(6, 6, 1, 79.99, '2024-03-21 13:00:00', 'shipped'),
(7, 5, 2, 99.98, '2024-03-22 10:30:00', 'delivered'),
(8, 10, 1, 45.99, '2024-03-23 16:15:00', 'processing'),
(9, 14, 10, 249.90, '2024-03-24 09:30:00', 'pending'),
(10, 2, 3, 89.97, '2024-03-25 12:00:00', 'delivered'),
(11, 7, 1, 199.99, '2024-03-26 14:20:00', 'shipped'),
(12, 1, 1, 1299.99, '2024-03-27 10:45:00', 'processing'),
(13, 4, 1, 599.99, '2024-03-28 15:00:00', 'pending')
ON CONFLICT DO NOTHING;

-- Create a test demo user (password: demo123)
INSERT INTO users (email, password, role) 
VALUES ('demo@querysense.app', '$2b$10$YqZ9lZqY3pGZ9lZqY3pGZ9lZqY3pGZ9lZqY3pGZ9lZqY3pGZ9lZq', 'user')
ON CONFLICT (email) DO NOTHING;

SELECT 'Seed data inserted successfully!' as message;
SELECT 'Customers: ' || COUNT(*) FROM customers;
SELECT 'Products: ' || COUNT(*) FROM products;
SELECT 'Orders: ' || COUNT(*) FROM orders;
