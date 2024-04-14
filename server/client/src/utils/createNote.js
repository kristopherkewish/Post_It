async function createNote(note) {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note) // Convert the data object to a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response not ok');
        }

        return;
    } catch(e) {
        console.log('Error', e);
    }
}

export { createNote }