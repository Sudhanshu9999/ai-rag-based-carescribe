-- Create the "users" table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the "notes" table with a foreign key referencing "users"
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT NOT NULL,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userid INTEGER,
  CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
