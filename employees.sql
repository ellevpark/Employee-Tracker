DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INTEGER (10),
  manager_id INTEGER (10) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (30.2),
  department_id INTEGER (10),
  PRIMARY KEY (id)
);
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
