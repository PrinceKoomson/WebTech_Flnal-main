CREATE TABLE roadmap_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  current_roadmap VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roadmaps (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  career_path VARCHAR(255) NOT NULL,
  roadmap_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES roadmap_users(id) ON DELETE CASCADE
);

CREATE TABLE skill_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  skill_name VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES roadmap_users(id) ON DELETE CASCADE,
  UNIQUE (user_id, skill_name)
);