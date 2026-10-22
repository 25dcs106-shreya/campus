CREATE DATABASE IF NOT EXISTS campushub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE campushub;

CREATE TABLE IF NOT EXISTS students (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  enrollment VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  branch VARCHAR(120) NOT NULL DEFAULT 'Computer Science',
  semester TINYINT UNSIGNED NOT NULL DEFAULT 1,
  role ENUM('student','admin') NOT NULL DEFAULT 'student',
  remember_token_hash CHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_students_name(name), INDEX idx_students_branch(branch)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  category VARCHAR(80) NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  poster_path VARCHAR(255) NULL,
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_events_date(event_date), INDEX idx_events_category(category),
  CONSTRAINT fk_events_creator FOREIGN KEY(created_by) REFERENCES students(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  actor_id BIGINT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(60) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  details JSON NULL,
  ip_address VARCHAR(45) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_created(created_at),
  CONSTRAINT fk_audit_actor FOREIGN KEY(actor_id) REFERENCES students(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- After registering your own account, promote it manually in phpMyAdmin:
-- UPDATE students SET role='admin' WHERE email='your-email@example.com';
