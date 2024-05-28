const express = require("express");
const mysql = require('mysql2/promise')
const app = express();
const port = process.env.PORT || 3000;

MYSQL_HOST = 'https://on-time-oficial-git-main-jeronimos-proyects-dcccfe57.vercel.app/'
MYSQL_PORT = 3306
MYSQL_USER = 'root'
MYSQL_PASSWARD = 'OnTime'
MYSQL_DATABASE = 'ontime'

app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWARD,
            database: process.env.MYSQL_DATABASE,
        });

        const [row, fields] = await connection.execute('SELECT 1 + 1 AS solution');
            res.send(`La solucion es: ${rows[0].solution}`)
            await connection.end();
    }catch (error) {
        res.status(500).send('Database connection failed')
    }
});

app.listen(port, () => {
    console.log(`Server running at ${MYSQL_HOST}`);
})