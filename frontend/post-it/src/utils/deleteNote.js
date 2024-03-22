async function deleteNote(noteId) {
    try {
        const response = await fetch(`https://post-it-sqgp.onrender.com/${noteId}`, {
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