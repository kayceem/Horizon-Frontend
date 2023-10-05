import api from './index';

export async function getCategory() {
    try {
        const response = await api.get(`/category`);
        return response.data;
    } catch (error) {
        throw error;
    }
}