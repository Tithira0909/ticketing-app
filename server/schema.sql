CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20) UNIQUE NOT NULL,
  price INT NOT NULL,
  available INT NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  ticket_type VARCHAR(20),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO tickets (type, price, available) VALUES
  ('VIP', 7500, 0),
  ('GENERAL', 5000, 0)
ON DUPLICATE KEY UPDATE price=VALUES(price);
