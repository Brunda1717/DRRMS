CREATE DATABASE drrms;
USE drrms;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'ngo', 'donor') NOT NULL,
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE victims (
  victim_id INT AUTO_INCREMENT PRIMARY KEY,
  ngo_id INT,
  name VARCHAR(100) NOT NULL,
  proof_id VARCHAR(50),
  phone VARCHAR(15),
  address TEXT,
  disaster_area VARCHAR(100),
  family_size INT,
  priority_level ENUM('low', 'medium', 'high', 'critical') NOT NULL,
  FOREIGN KEY (ngo_id) REFERENCES users(user_id)
);

CREATE TABLE donations (
  donation_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  resource_type VARCHAR(100),
  quantity INT,
  location VARCHAR(100),
  status ENUM('available', 'assigned', 'delivered') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(user_id)
);

CREATE TABLE resource_requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  victim_id INT,
  resource_type VARCHAR(100),
  quantity_needed INT,
  priority_level ENUM('low', 'medium', 'high', 'critical') NOT NULL,
  status ENUM('pending', 'matched', 'delivered') DEFAULT 'pending',
  FOREIGN KEY (victim_id) REFERENCES victims(victim_id)
);

CREATE TABLE matches (
  match_id INT AUTO_INCREMENT PRIMARY KEY,
  donation_id INT,
  request_id INT,
  matched_quantity INT,
  delivery_status ENUM('pending', 'in_transit', 'delivered') DEFAULT 'pending',
  matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donation_id) REFERENCES donations(donation_id),
  FOREIGN KEY (request_id) REFERENCES resource_requests(request_id)
);