async function isLoggedIn() {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/isLoggedIn', {
            credentials: 'include',
        });

        return response.ok
    } catch(e) {
        console.log('Error', e);
        return false
    }
}

export { isLoggedIn }