-- Populate the database
USE business_db;
INSERT INTO department(name)
VALUES ("The Department");

INSERT INTO role (title, department_id)
VALUES ("Lead Departmentuer", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Snickerdoodle", "Cat", 1)