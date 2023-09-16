import api from './index';

export async function getInbox() {
    try {
        const response = await api.get(`/messages/inbox`);
        return response.data;
    } catch (error) {
        console.log('Error fetching inbox: ', error.message);
        throw error;
    }
}
export async function getMessages(id) {
    try {
        const response = await api.get(`/messages/chat/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching chat: ', error.message);
        throw error;
    }
}

export async function sendMessage(messageData){
    try {
        const response = await api.post('/messages/chat', messageData);
        return response.data;
      } catch (error) {
        console.log('Error sending message: ', error.message);
        throw error;
      }
}
