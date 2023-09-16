import api from './index';

export async function getReceivedReviews() {
    try {
        const response = await api.get(`/reviews/received/`);
        return response.data;
    } catch (error) {
        console.log('Error fetching reviews: ', error.message);
        throw error;
    }
}
export async function getGivenReviews() {
    try {
        const response = await api.get(`/reviews/given/`);
        return response.data;
    } catch (error) {
        console.log('Error fetching reviews: ', error.message);
        throw error;
    }
}

export async function createReview(reviewData){
    try {
        const response = await api.post('/reviews/', reviewData);
        return response.data;
      } catch (error) {
        console.log('Error creating review: ', error.message);
        throw error;
      }
}

export async function getReceivedReviewsById(id) {
    try {
        const response = await api.get(`/reviews/received/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching users reviews: ', error.message);
      throw error;
    }
  }
