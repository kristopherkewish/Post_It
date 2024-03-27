import { pool } from './index.js';

export async function verify(issuer, profile, cb) {
    console.log('in the verify function');
    try {
        console.log('finding credentials');
        const credentials = await findCredentials(issuer, profile.id);
        if (!credentials) {
            console.log('no credentials found');
            console.log('adding user and credentials');
            const user_id = await addUser(profile.displayName); // Add credentials, and keep user_id for adding new user
            await addCredentials(user_id, issuer, profile.id);
            const user = {
                id: user_id.toString(),
                name: profile.displayName
            }
            console.log('user and credentials added');
            console.log('user object');
            console.log(user);
            return cb(null, user);
        }

        console.log('credentials found, finding user');
        const user = await findUser(credentials.user_id);
        if (!user) {
            console.log('no user found, authentication failed');
            return cb(null, false);
        }
        
        console.log('user found');
        console.log(user);
        return cb(null, user);
    } catch(err) {
        return cb(err)
    }
};

async function findCredentials(issuer, profileId) {
    const response = await pool.query(`SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2`, [issuer, profileId]);
    const credentials = response.rows[0];
    return credentials 
};

async function addUser(name) {
    const response = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING id', [name]);
    const id = response.rows[0].id;
    return id;
};

async function addCredentials(userId, issuer, profileId) {
    const response = await pool.query(`INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)`, [userId, issuer, profileId]);
    return
};

async function findUser(userId) {
    const response = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    const user = response.rows[0];
    return user;
};