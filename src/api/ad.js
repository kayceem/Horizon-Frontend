import api from './index';

export async function getAds() {
    try {
        const response = await api.get(`/ad/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createAd(adData){
    try {
        const response = await api.post('/ad/', adData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export async function deleteAd(id) {
    try {
      const response = await api.delete(`/ad/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }