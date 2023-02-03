-- Populate the database
USE business_db;
INSERT INTO department(name)
VALUES 
        ("Sales"),
        ("Marketing"),
        ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES 
        ("Sales rep", 50000,1),
        ("Advirtising", 50000, 2),
        ("Financial Advisor", 60000, 3),
        ("Financial Modeling", 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ("John", "Doe", 1, null),
        ("Serene", "Ortiz", 2, null),
        ("Macy", "York", 4, null),
        ("Morgan", "Gordon", 3, 3)
