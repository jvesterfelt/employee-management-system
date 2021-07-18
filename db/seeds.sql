DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

USE employee_management_system;

SOURCE db/schema.sql;

INSERT INTO departments (name) 
VALUES
('Accounting'),
('Executive'),
('IT'),
('Operations'),
('Professional Services'),
('Project Management'),
('R&D'),
('Sales'),
('Support');


INSERT INTO roles (title, salary, department_id)
VALUES
('Chief Executive Officer', 200000.00, 2),
('Executive Vice President', 160000.00, 2),
('Senior Manager', 125000.00, 3),
('Finance Advisor', 80000.00, 1),
('Consultant', 80000.00, 5),
('Project Manager', 70000.00, 6),
('Support Manager', 75000.00, 9),
('Support Representative', 60000.00, 9),
('Senior Engineer', 95000.00, 7),
('Systems Administrator', 80000.00, 3),
('Sales Engineer', 85000.00, 8),
('Sales Manager', 95000.00, 8),
('Manager', 90000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('James', 'Fraser', 2, 2),
  ('Jack', 'London', 1, NULL),
  ('Robert', 'Bruce', 3, 1),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 3, 1),
  ('Paolo', 'Pasolini', 4, 3),
  ('Heathcote', 'Williams', 12, NULL),
  ('Sandy', 'Powell', 11, 15),
  ('Emil', 'Zola', 6, 3),
  ('Sissy', 'Coalpits', 7, 21),
  ('Antoinette', 'Capet', 10, 21),
  ('Samuel', 'Delany', 6, 3),
  ('Tony', 'Duvert', 10, 21),
  ('Dennis', 'Cooper', 11, 15),
  ('Monica', 'Bellucci', 12, NULL),
  ('Samuel', 'Johnson', 5, 5),
  ('John', 'Dryden', 8, 10),
  ('Alexander', 'Pope', 8, 10),
  ('Lionel', 'Johnson', 9, 21),
  ('Aubrey', 'Beardsley', 3, 1),
  ('Tulse', 'Luper', 13, NULL),
  ('William', 'Morris', 11, 15),
  ('George', 'Shaw', 5, 5),
  ('Arnold', 'Bennett', 4, 3),
  ('Algernon', 'Blackwood', 11, 15),
  ('Rhoda', 'Broughton', 8, 10);