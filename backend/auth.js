import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import { verify } from './verify.js';
import { pool } from './index.js';

passport.serializeUser(function(user,done) {
    console.log('serialize');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
}, verify));

const router = express.Router();

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {session: true},),
(req, res) => {
    res.redirect(process.env.CLIENT_URL + '/');
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
})

export default router;