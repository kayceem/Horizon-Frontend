import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized request. Please login.');
        } else if (error.response.status === 403) {
          console.log('Requested resource is forbidden.');
        } else if (error.response.status === 404) {
          console.log('Requested resource not found.');
        } else {
          console.log('An error occurred. Please try again.');
        }
      } else {
        console.log('An error occurred. Please try again.');
      }
      // Always reject the Promise so your calling functions can handle the error as well
      return Promise.reject(error);
    }
  );

export default api;
