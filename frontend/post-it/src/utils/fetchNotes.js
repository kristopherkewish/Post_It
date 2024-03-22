async function fetchNotes() {
    try {
        const response = await fetch('https://post-it-sqgp.onrender.com');
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