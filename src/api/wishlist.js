import api from './index';

export async function getWishList() {
    try {
        const response = await api.get(`/wishlist/`);
        return response.data;
    } catch (error) {
        console.log('Error fetching wishlist: ', error.message);
        throw error;
    }
}

export async function addToWishList(productData){
    try {
        const response = await api.post('/wishlist/', productData);
        return response.data;
      } catch (error) {
        console.log('Error adding item: ', error.message);
        throw error;
      }
}

export async function deleteFromWishList(productData){
    try {
        const response = await api.delete('/wishlist/', {data:{"product_id": productData.product_id}});
        return response.data;
      } catch (error) {
        console.log('Error removing item: ', error.message);
        throw error;
      }
}

