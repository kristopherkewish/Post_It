import express from 'express';
import cors from 'cors';
import pg from 'pg';
import authRouter from './routes/auth.js';
import indexRouter from './routes/index.js';

const app = express()
const port = 3000

const { Pool } = pg;
const pool = new Pool(); // Initialise connection to the SQL DB

app.use(cors());
app.use(express.json());

app.use('/', authRouter);
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
    pool.end()
        .then(() => process.exit())
}); // shut the connection pool when the server is shut down

export { pool };