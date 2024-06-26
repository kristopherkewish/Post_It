async function signUp(username, password) {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Convert the data object to a JSON string
        });

        const data = await response.text();

        if(!response.ok) {
            throw new Error(data);
        }

        return {success: true, message: data};
    } catch(e) {
        console.log('Error', e);
        return {success: false, message: e.message};
    }
}

export { signUp }