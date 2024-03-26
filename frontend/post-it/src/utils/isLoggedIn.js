export async function isLoggedIn() {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/isLoggedIn');

        return response.ok;
    } catch(e) {
        console.log('Error', e);
    }
}