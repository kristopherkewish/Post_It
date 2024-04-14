import express from 'express';
import cors from 'cors';
import pg from 'pg';
import authRouter from './routes/auth.js';
import indexRouter from './routes/index.js';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000

const { Pool } = pg;
const pool = new Pool(); // Initialise connection to the SQL DB
const pgSessionStore = pgSession(session);

app.use(cors({
    origin: true, 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new pgSessionStore({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true
    }),
    cookie: { 
        sameSite: process.env.COOKIE_SAME_SITE,
        secure: process.env.COOKIE_SECURE,
     },
}));
app.use(passport.authenticate('session'));

app.use('/auth', authRouter);
app.use('/api', indexRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
    pool.end()
        .then(() => process.exit())
}); // shut the connection pool when the server is shut down

export { pool };