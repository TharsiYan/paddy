-- Database setup script for PaddySense
-- Run this script in your MySQL client to create the database

-- Create the database
CREATE DATABASE IF NOT EXISTS paddysense_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE paddysense_db;

-- Show database info
SHOW DATABASES;
SELECT DATABASE();

-- Note: After running this script, update the database credentials in:
-- PaddySense/settings.py
-- Then run: python manage.py migrate



