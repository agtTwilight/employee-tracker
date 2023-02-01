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
                db.query("SELECT * FROM department")
        }

        // view all roles
        roles(){
                db.query("SELECT * FROM role")
        }
        
        // view all employees
        employees(){
                db.query("SELECT * FROM employee")
        }
}

class Add {
        department(name) {
                db.query("INSERT INTO department(name) VALUES(?)", name,  (err, data) => {
                        if (err){
                                throw err
                        } else {
                                console.log(data)
                        }
                })
        }

        role(title, department) {
                db.query("INSERT INTO role(title, department_id) VALUES(?)", [title, department],  (err, data) => {
                        if (err){
                                throw err
                        } else {
                                console.log(data)
                        }
                })
        }

        employee(first_name, last_name, role) {
                db.query("INSERT INTO employee(first_name, last_name, role_id) VALUES(?)", [first_name, last_name, role],  (err, data) => {
                        if (err){
                                throw err
                        } else {
                                console.log(data)
                        }
                })
        }
}

module.exports = {View, Add}
