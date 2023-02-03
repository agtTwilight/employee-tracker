// Query the database
const mysql = require("mysql2");
const db = mysql.createConnection(
        {
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'business_db'
        },
              console.log(`Connected to the books_db database.`)
)

class View {
        // view all departments
        departments(){
                db.query("SELECT * FROM department", (err, results) => {
                        console.table(results);
                })
        }

        // view all roles
        roles(){
                db.query("SELECT * FROM role", (err, results) => {
                        console.table(results);
                })
        }
        
        // view all employees
        employees(){
                db.query("SELECT * FROM employee", (err, results) => {
                        console.table(results);
                })
        }
}

class Add {
        department(name) {
                db.query("INSERT INTO department(name) VALUES(?)", name,  (err, data) => {
                        if (err){
                                throw err
                        }
                })
        }

        role(title, salary, department) {
                db.query("INSERT INTO role (title, salary, department_id) VALUES(?,?,?)", [title, salary, department],  (err, data) => {
                        if (err){
                                throw err
                        }
                })
        }

        employee(first_name, last_name, role, manager) {
                db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)", [first_name, last_name, role, manager],  (err, data) => {
                        if (err){
                                throw err
                        }
                })
        }
}

function getDepartmentNames () {
        return db
                .promise()
                .query("SELECT * FROM department")
                .then(([row]) => {
                        return row
                })
}

function getRoleTitles () {
        return db
                .promise()
                .query("SELECT * FROM role")
                .then(([row]) => {
                        return row
                })
}
 
function getEmployees () {
        return db
                .promise()
                .query("SELECT * FROM employee")
                .then(([row]) => {
                        return row
                })
}

module.exports = {View, Add, getDepartmentNames, getRoleTitles, getEmployees}
