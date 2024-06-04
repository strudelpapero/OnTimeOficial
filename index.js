const express = require("express");
const mysql = require('mysql2/promise')
const app = express();
const port = process.env.PORT || 9000;

POSTGRES_URL="postgres://default:rZAb68xzXTNI@ep-tight-sea-a4v1n2xf-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:rZAb68xzXTNI@ep-tight-sea-a4v1n2xf-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:rZAb68xzXTNI@ep-tight-sea-a4v1n2xf-pooler.us-east-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:rZAb68xzXTNI@ep-tight-sea-a4v1n2xf.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-tight-sea-a4v1n2xf-pooler.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="rZAb68xzXTNI"
POSTGRES_DATABASE="verceldb"
app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: POSTGRES_HOST,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DATABASE,
        });
        const [row, fields] = await connection.execute('SELECT 1 + 1 AS solution');
            res.send(`La solucion es: ${rows[0].solution}`)
            await connection.end();
    }catch (error) {
        res.status(500).send('Database connection failed')
    }
});

app.listen(port, () => {
    console.log(`Server running at `);
})