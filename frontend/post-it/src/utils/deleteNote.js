async function deleteNote(noteId) {
    try {
        const response = await fetch(`/api/${noteId}`, {
            method: 'DELETE',
            credentials: 'include',
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