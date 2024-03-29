import api from './index';

export async function getProducts(offset,sortBy=null, user_id=null, all=false) {
    try {
        let query = `/products/?skip=${offset}`
        if (sortBy){
          query+='&sortby=latest'
        }
        if (user_id){
          query+=`&user_id=${user_id}`
        }
        if (all){
          query+=`&all=${all}`
        }
        const response = await api.get(query);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getProductById(id) {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createProduct(productData){
    try {
        const response = await api.post('/products/', productData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export async function updateProduct(productData, id) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  