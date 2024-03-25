async function fetchNotes() {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/');
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