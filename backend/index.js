import 'dotenv/config';
import { getNotes, getNoteById, deleteNote, createNote, updateNote } from './helpers.js'
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import authRouter from './auth.js';
import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express()
const port = 3000

const { Pool } = pg;
const pool = new Pool(); // Initialise connection to the SQL DB
const PgSession = connectPgSimple(session);

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.COOKIE_SECURE === "false" ? false : true, 
        httpOnly: false
    }
})); //  Configure authenticated session

app.use(passport.initialize());
app.use(passport.session()); // Authenticate session with each request

app.use('/', authRouter); // Login routes

app.get('/', async (req, res) => {
    console.log('fetching notes');
    console.log('user object');
    console.log(req.user);
    try {
        const { user } = req;
        const notes = await getNotes(pool, user);
        res.send(notes);
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

app.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id == "mockServiceWorker.js") { return };
        const note = await getNoteById(pool, id);
        res.send(note); 
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteNote(pool, id);
        res.status(204).send('Note deleted!');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

app.post('/', async (req, res) => {
    try {
        const { user } = req;
        const note = req.body;
        await createNote(pool, note, user);
        res.status(201).send('Note created!');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

app.put('/:id', async (req, res) => {
    try {
        const note = req.body;
        const id = req.params.id;
        await updateNote(pool, id, note);
        res.status(200).send('Note updated.');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
    pool.end()
        .then(() => process.exit())
}); // shut the connection pool when the server is shut down

export { pool }