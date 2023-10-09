import api from './index';

export async function getCategory() {
    try {
        const response = await api.get(`/category`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function createCategory(categoryData){
    try {
        const response = await api.post('/category/', categoryData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export async function deleteCategory(id) {
    try {
      const response = await api.delete(`/category/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  