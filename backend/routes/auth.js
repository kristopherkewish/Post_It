import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import LocalStrategy from 'passport-local';
import { pool } from '../index.js';

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    console.log('Inside the verify function');
    console.log('Username', username, 'Password', password);
    try {
        console.log('Querying the database');
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const { rows } = res;

        if (!rows) {
            console.log('No user found');
            return cb(null, false, { message: 'Incorrect username or password.' });
        }

        const user = rows[0];

        console.log('User found');
        console.log(user);

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { 
                console.log('Error hashing password');
                return cb(err); 
            }
            console.log('Password successfully hashed');

            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                console.log('Hashed password does not match password in database');
                return cb(null, false, { message: 'Incorrect username or password.' });
            }

            console.log('User succesfully verified');
            return cb(null, user);
        });
    } catch (err) {
        console.log('Error querying the database');
        console.log(err);
        return cb(err);
    }
}));

passport.serializeUser(function (user, cb) {
    console.log('Serializing user', user);
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    console.log('Deserializing user', user);
    process.nextTick(function () {
        return cb(null, user);
    });
});

const router = express.Router();

router.get('/isLoggedIn', (req, res) => {
    console.log('Checking if user is logged in');
    if(!req.user) {
        console.log('User is not logged in');
        res.status(401).send('Not logged in');
    } else {
        console.log('User is logged in');
        res.send('Logged in');
    }
});

router.post('/login', (req, res, next) => { 
    console.log('Login request received');
    next();
}, passport.authenticate('local', { successMessage: true, failureMessage: true }), (req, res) => {
    console.log('Login succeeded, sending response');
    res.send('Login success!');
})

router.post('/logout', function (req, res, next) {
    req.logout();
});

router.post('/signUp', (req, res) => {
    const { username, password } = req.body;
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
        if (err) { return next(err); }

        await pool.query('INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)', [
            username,
            hashedPassword,
            salt
        ]);

        res.send('Sign Up Successful');
    });
})

export default router;