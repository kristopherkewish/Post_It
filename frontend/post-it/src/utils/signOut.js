async function signOut() {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/logout', {
            credentials: 'include',
            method: 'POST',
        });

        if(!response.ok) {
            throw new Error('Network response not ok');
        }

        return;
    } catch(e) {
        console.log('Error', e);
    }
}

export { signOut }