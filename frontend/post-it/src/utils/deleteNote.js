async function deleteNote(noteId) {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/${noteId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response not ok');
        }

        return;
    } catch(e) {
        console.log('Error', e);
    }
}

export { deleteNote }