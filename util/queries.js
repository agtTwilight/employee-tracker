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