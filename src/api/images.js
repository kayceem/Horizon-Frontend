import api from './index';

export async function uploadImage(image) {
  try {
    const imageData = new FormData();
    imageData.append('image', image);

    const response = await api.post('/images/', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
