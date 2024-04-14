async function signOut() {
    try {
        const response = await fetch('/auth/logout', {
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