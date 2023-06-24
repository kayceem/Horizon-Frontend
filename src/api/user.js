import api from './index';

export async function getUsers() {
    try {
        const response = await api.get('/users/');
        return response.data;
    } catch (error) {
        console.log('Error fetching users: ', error.message);
        throw error;
    }
}
