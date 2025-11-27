import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hm0192233@G',
    database: 'todo_app'
})

export default db;