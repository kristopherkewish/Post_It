async function deleteNote(noteIndex) {
    try {
        const response = await fetch(`http://localhost:3000/${noteIndex}`, {
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