async function updateNote(id, note) {
    try {
        const response = await fetch(`http://localhost:3000/${id}`, {
            method: 'PUT',
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

export { updateNote }