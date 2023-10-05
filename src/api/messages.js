import api from './index';

export async function getInbox() {
    try {
        const response = await api.get(`/messages/inbox/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getMessages(username, offset=0) {
    try {
        const response = await api.get(`/messages/chat/${username}?skip=${offset}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function sendMessage(messageData){
    try {
        const response = await api.post('/messages/chat/', messageData);
        return response.data;
      } catch (error) {
        throw error;
      }
}
