async function login(username, password) {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Convert the data object to a JSON string
        });

        const data = await response.text();

        if(!response.ok) {
            throw new Error(data);
        }

        console.log('login function response');
        console.log(data);

        return {success: true, message: data};
    } catch(e) {
        console.log('Error', e);
        return {success: false, message: e.message};
    }
}

export { login }