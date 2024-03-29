import api from './index';

export async function getUsers() {
    try {
        const response = await api.get('/users/');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getUser(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createUser(userData){
    try {
        const response = await api.post('/users/', userData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export async function updateUser(userData) {
    try {
      const response = await api.put('/users/', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function changePassword(userData) {
    try {
      const response = await api.put('/users/password', userData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function deleteUser() {
    try {
      const response = await api.delete('/users/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  