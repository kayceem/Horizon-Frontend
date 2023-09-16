import api from './index';

export async function login(credentials) {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
  
      const response = await api.post('/login/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
export async function logout(){
  try {
    await api.post('/logout/');
  } catch (error) {
    throw error;
  }
}