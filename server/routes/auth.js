import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import LocalStrategy from 'passport-local';
import { pool } from '../index.js';

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const { rows } = res;

        if (!rows) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }

        const user = rows[0];

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { 
                return cb(err); 
            }

            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }

            return cb(null, user);
        });
    } catch (err) {
        return cb(err);
    }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

const router = express.Router();

router.get('/isLoggedIn', (req, res) => {
    if(!req.user) {
        res.status(401).send('Not logged in');
    } else {
        res.send('Logged in');
    }
});

router.post('/login', passport.authenticate('local', { successMessage: true, failureMessage: true }), (req, res) => {
    res.send('Login success!');
})

router.post('/logout', function (req, res, next) {
    req.logout((err) => {
        if(!err) {
            res.send('User logged out.')
        }
        next(err)
    });
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