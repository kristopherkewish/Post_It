import { getNotes, getNoteByIndex, deleteNote, createNote, updateNote } from './helpers.js'
import express from 'express';
import cors from 'cors';

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        const notes = getNotes();
        res.send(notes);
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

app.get('/:index', (req, res) => {
    try {
        const index = Number(req.params.index);
        const note = getNoteByIndex(index);
        res.send(note);
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

app.delete('/:index', (req, res) => {
    try {
        const index = Number(req.params.index);
        deleteNote(index);
        res.status(204).send('Note deleted!');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

app.post('/', (req, res) => {
    try {
        const note = req.body;
        createNote(note);
        res.status(201).send('Note created!');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

app.put('/:index', (req, res) => {
    try {
        const note = req.body;
        const index = Number(req.params.index);
        updateNote(index, note);
        res.status(200).send('Note updated.');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})