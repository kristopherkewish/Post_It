async function updateNote(id, note) {
    try {
        const response = await fetch(`https://post-it-sqgp.onrender.com/${id}`, {
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