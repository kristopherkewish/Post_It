import express from 'express';
import { pool } from '../index.js';
import { getNotes, getNoteById, deleteNote, createNote, updateNote } from '../helpers.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await getNotes(pool);
        res.send(notes);
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await getNoteById(pool, id);
        res.send(note);
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database!');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteNote(pool, id);
        res.status(204).send('Note deleted!');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

router.post('/', async (req, res) => {
    try {
        const note = req.body;
        await createNote(pool, note);
        res.status(201).send('Note created!');
    } catch(e) {
        console.log(e);
        res.status(400).send('Error reading the database');
    }
})

router.put('/:id', async (req, res) => {
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

export default router;