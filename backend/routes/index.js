import express from 'express';
import { pool } from '../index.js';
import { getNotes, getNoteById, deleteNote, createNote, updateNote } from '../helpers.js'

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Attempting to get notes');
    req.cookies ? console.log('Cookies found on request: ', req.cookies) : console.log('Uh oh, cookies are not being sent from the client');
    next();
}, async (req, res) => {
    try {
        const { id } = req.user;
        const notes = await getNotes(pool, id);
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
        const { id } = req.user
        const note = req.body;
        await createNote(pool, note, id);
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