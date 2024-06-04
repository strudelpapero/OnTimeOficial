const express = require("express");
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 9000;

const POSTGRES_URL = "postgres://default:rZAb68xzXTNI@ep-tight-sea-a4v1n2xf-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";
const POSTGRES_USER = "default";
const POSTGRES_HOST = "ep-tight-sea-a4v1n2xf-pooler.us-east-1.aws.neon.tech";
const POSTGRES_PASSWORD = "rZAb68xzXTNI";
const POSTGRES_DATABASE = "verceldb";

app.get('/', async (req, res) => {
    try {
        const client = new Client({
            connectionString: POSTGRES_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        await client.connect();
        const result = await client.query('SELECT 1 + 1 AS solution');
        res.send(`La solución es: ${result.rows[0].solution}`);
        await client.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Database connection failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
