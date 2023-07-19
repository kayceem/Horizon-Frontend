import api from './index';

export async function getProducts(offset) {
    try {
        const response = await api.get(`/products/?skip=${offset}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching users: ', error.message);
        throw error;
    }
}
export async function getProductById(id) {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching users: ', error.message);
        throw error;
    }
}

export async function createProduct(productData){
    try {
        const response = await api.post('/products/', productData);
        return response.data;
      } catch (error) {
        console.log('Error creating user: ', error.message);
        throw error;
      }
}

export async function updateProduct(productData, id) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.log('Error updating user: ', error.message);
      throw error;
    }
  }

export async function deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error updating user: ', error.message);
      throw error;
    }
  }
  