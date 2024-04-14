async function isLoggedIn() {
    try {
        const response = await fetch('/auth/isLoggedIn', {
            credentials: 'include',
        });

        return response.ok
    } catch(e) {
        console.log('Error', e);
        return false
    }
}

export { isLoggedIn }