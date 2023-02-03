// Query the database
const mysql = require("mysql2");
require("console.table")

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
                        console.log(`

                        `)
                        console.table(results);
                })
        }

        // view all roles
        roles(){
                db.query("SELECT * FROM role", (err, results) => {
                        console.log(`
                        
                        `)
                        console.table(results);
                })
        }
        
        // view all employees
        employees(){
                db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department AS department ON role.department_id = department.id", (err, results) => {
                        const toRemove = ["(index)", "department_id", "role_id"]
                        for (let y = 0; y < results.length; y ++) {
                                for (let i = 0; i < toRemove.length; i ++) {
                                        delete results[y][toRemove[i]]
                                }

                                results[y]["department"] = results[y]["name"]
                                delete results[y]["name"]

                                if (results[y]["manager_id"] === null){
                                        delete results[y]["manager_id"]
                                }
                                
                                if (results[y]["manager_id"] != null) {
                                        getEmployees().then((managers) => {
                                                for (let j = 0; j < managers.length; j ++) {
                                                        if (managers[j].id === results[y]["manager_id"]) {
                                                                delete results[y]["manager_id"]
                                                                results[y]["manager"] = managers[j].first_name + " " + managers[j].last_name
                                                                console.log(`
                        
                                                                `)
                                                                console.table(results)
                                                        }
                                                }
                                        })
                                }
                        }
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

function updateEmployee (employee, role) {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [role,employee], (err, data) => {
                if (err){
                        throw err
                }
        })
}

module.exports = {View, Add, getDepartmentNames, getRoleTitles, getEmployees, updateEmployee}
