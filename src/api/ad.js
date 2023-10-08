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
        const response = await api.post('/ad/create/', adData);
        return response.data;
      } catch (error) {
        throw error;
      }
}