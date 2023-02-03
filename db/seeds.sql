-- Populate the database
USE business_db;
INSERT INTO department(name)
VALUES ("The Department");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Departmentuer", 50000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Snickerdoodle", "Cat", 1, null)