import { v4 as uuidv4 } from 'uuid';

async function getNotes(pool, user) {
    const user_id = user.id;
    const res = await pool.query('SELECT id, title, content FROM notes WHERE user_id = $1 ORDER BY created_at ASC', [user_id]);
    const { rows } = res;

    return rows
};

async function getNoteById(pool, id) {
    const res = await pool.query('SELECT id, title, content FROM notes WHERE id = $1',[id]);
    const { rows } = res;

    return rows[0]
}

async function deleteNote(pool, id) {
    await pool.query('DELETE FROM notes WHERE id = $1', [id]);
}

async function createNote(pool, note, user) {
    const id = uuidv4();
    const user_id = user.id;
    const { title, content } = note;

    await pool.query(`
        INSERT INTO notes (id, user_id, title, content)
        VALUES ($1, $4, $2, $3)
    `,[id, title, content, user_id]);
}

async function updateNote(pool, id, note) {
    const { title, content } = note;

    await pool.query(`
        UPDATE notes
        SET title = $1, content = $2
        WHERE id = $3;
    `, [title, content, id]);
}

export { getNotes, getNoteById, deleteNote, createNote, updateNote }