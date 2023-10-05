import api from './index';

export async function getReceivedReviews() {
    try {
        const response = await api.get(`/reviews/received/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getGivenReviews() {
    try {
        const response = await api.get(`/reviews/given/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createReview(reviewData){
    try {
        const response = await api.post('/reviews/', reviewData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export async function getReceivedReviewsById(id) {
    try {
        const response = await api.get(`/reviews/received/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
