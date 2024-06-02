const express = require("express");
const mysql = require('mysql2/promise')
const app = express();
const port = process.env.PORT || 3000;

MYSQL_HOST = 'localhost'
MYSQL_PORT = port
MYSQL_USER = 'root'
MYSQL_PASSWARD = 'OnTime'
MYSQL_DATABASE = 'ontime'

app.get('/', async (req, res) => {
    //try {
        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PASSWARD,
            database: MYSQL_DATABASE,
        });

        //const [row, fields] = await connection.execute('SELECT 1 + 1 AS solution');
            //res.send(`La solucion es: ${rows[0].solution}`)
            //await connection.end();
    //}catch (error) {
        //res.status(500).send('Database connection failed')
    //}
});

app.listen(port, () => {
    console.log(`Server running at ${MYSQL_HOST}`);
})