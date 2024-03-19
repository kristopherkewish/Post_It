import fs from 'fs';

const dbPath = './notes.json';

function getNotes() {
    const db = fs.readFileSync(dbPath);
    const notes = JSON.parse(db);

    return notes
};

function getNoteByIndex(index) {
    if(typeof index == 'number' && index >= 0) {
        const notes = getNotes();

        if (index < notes.length) {
            return notes[index];
        }

        throw new Error('Index must be less than the number of notes.')
    }
    
    throw new Error('Index must be a positive integer.');
}

function getNoteByTitle(title) {
    const notes = getNotes();

    const foundNote = notes.filter(note => note.title === title);

    if(foundNote.length > 0) {
        return foundNote
    }

    throw new Error('No note with matching title.');
}

function deleteNote(index) {
    if(typeof index == 'number' && index >= 0) {
        const notes = getNotes();

        if(index < notes.length) {
            notes.splice(index, 1);
            fs.writeFileSync(dbPath, JSON.stringify(notes));

            return;
        }

        throw new Error('Index must be less than the number of notes.')
    }

    throw new Error('Index must be a positive integer.');
}

function createNote(note) {
    const notes = getNotes();
    notes.push(note);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    return note;
}

function updateNote(index, note) {
    const notes = getNotes();
    notes[index] = note;
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    return notes[index];
}

export { getNotes, getNoteByIndex, getNoteByTitle, deleteNote, createNote, updateNote }