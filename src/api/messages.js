import api from './index';

export async function getInbox() {
    try {
        const response = await api.get(`/messages/inbox/`);
        return response.data;
    } catch (error) {
        console.log('Error fetching inbox: ', error.message);
        throw error;
    }
}
export async function getMessages(username) {
    try {
        const response = await api.get(`/messages/chat/${username}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching chat: ', error.message);
        throw error;
    }
}

export async function sendMessage(messageData){
    try {
        const response = await api.post('/messages/chat/', messageData);
        return response.data;
      } catch (error) {
        console.log('Error sending message: ', error.message);
        throw error;
      }
}
