-- PostgreSQL SQL Dump

-- Database: `techpath`

-- Table structure for table `users`
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  career_interest VARCHAR(255) NOT NULL,
  skill_level VARCHAR(255) NOT NULL,
  time_commitment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dumping data for table `users`
INSERT INTO users (name, email, password, career_interest, skill_level, time_commitment, created_at) VALUES
('kevin Jones Lamptey', 'superadmin@gmail.com', '$2b$10$9Lc7pu.UkZF8nNYTYmvTPOgwOJszLoPVE17a.XWDb4A25ffbf1UD.', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 17:53:12'),
('kevin Jones Lamptey', 'superadmin@gmail.comm', '$2b$10$aQxH3ZnI9aQJmQF5wWAdCuq2u4toXdOzpWjaKb4PO78SWF4RGVxR6', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 17:53:51'),
('kevin Jones Lamptey', 'knl@super.com', '$2b$10$qcfy3v7KQHdQkFNukOgP0.wqDhfRJQUousu8Z255wnWaiRfB1spIO', 'Web Development', 'Intermediate', 'Full-time', '2024-12-05 18:02:35'),
('kevin Jones Lamptey', 'knl@super.comnn', '$2b$10$WZe.MIo2J.GDxhoP1mFwbO1DOBJqF1UJTuuiSp2sV7K1skIy3IAA.', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 18:11:58'),
('kevin Jones Lamptey', 'www@t.c', '$2b$10$KScqQA9sEoDksMJkBjEgj.POttNRjzf9oILBSwPoMj.PmYMNmeSbe', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 18:45:16'),
('kevin Jones Lamptey', 'kelly@me.com', '$2b$10$wNtqKm/uNLXOjbdAt7jyCefxyT61LLripVFvmb51WcjsHGVPB41Eq', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 19:34:34'),
('Junior', 'junior@junior.com', '$2b$10$Xi/bJV8qOm7VAuMe4tOhSezgzvutsdfNljiI95GmyhmtrBCG.8r4C', 'Cybersecurity', 'Intermediate', 'Full-time', '2024-12-05 19:49:46'),
('Ron Killings', 'ron@ron.com', '$2b$10$.vFfXbgsfAJbJifW2BgcNueHJ4JglZqH65suWI5zhvXk45tHo0jPu', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 20:04:39'),
('James Lawson', 'j.man@g.com', '$2b$10$aZ/JiIbVCdY/eGIW2ZhMSuMh484OsM5GoQac4rNlw5yWR4tvdVm5q', 'Web Development', 'Beginner', 'Full-time', '2024-12-05 21:56:59'),
('kevin Jones Lamptey', 'j@me.com', '$2b$10$/jYEJbAz9rmFh/YAALa0i.NizVjek6J/2mA2qpaGAPJVoJkh5XMVi', 'Web Development', 'Intermediate', 'Full-time', '2024-12-06 09:04:38'),
('Christina', 'castrillochristina662@gmail.com', '$2b$10$h5EhOyREqaa3r0EyxftWluQ0SBpGDer/B3SKgtrmTHX8CbfWGF7W2', 'Cloud Engineering', 'Beginner', 'Full-time', '2024-12-14 22:56:40');

-- Indexes for table `users`
CREATE UNIQUE INDEX email ON users (email);