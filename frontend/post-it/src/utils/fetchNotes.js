async function fetchNotes() {
    try {
        const response = await fetch('http://localhost:3000');
        const notes = await response.json();

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        return notes;
    } catch (e) {
        console.log('Error', e);
    }
}

export { fetchNotes }