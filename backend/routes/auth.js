import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(username === "testSuccess") {
        res.send('Login successful');
    } else if(username === "testUser") {
        res.status(404).send('User not found.');
    } else if(username === "testPassword") {
        res.status(401).send('Invalid password.');
    }
})

router.post('/signUp', (req, res) => {
    const {username, password} = req.body;
    if(username === "testSameUser") {
        res.status(409).send('Username already exists.');
    } else {
        res.send('Sign Up Successful');
    }
})

export default router;