import { getNotes, getNoteById, deleteNote, createNote, updateNote } from './helpers.js'
import express from 'express';
import cors from 'cors';
import pg from 'pg'

const app = express()
const port = 3000

const { Pool } = pg;
const pool = new Pool(); // Initialise connection to the SQL DB

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const notes = await getNotes(pool);
        res.send(notes);
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

app.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
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
        const note = req.body;
        await createNote(pool, note);
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