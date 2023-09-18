import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../../api/messages';
import { useParams,Link } from 'react-router-dom';
import './Chat.scss';

const Chat = ({}) => {
    const { username } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch chat messages when the component mounts
        getMessages(username)
          .then((data) => {
            setMessages(data);
          })
          .catch((error) => {
            console.error('Error fetching chat messages:', error);
          });
      }, [username]); // Re-fetch messages when the username changes
    
      const handleSendMessage = () => {
        // Send a new message
        const messageData = {
          receiver_username: username,
          content: newMessage,
        };
    
        sendMessage(messageData)
          .then(() => {
            // Clear the input field and fetch updated messages
            setNewMessage('');
            getMessages(username)
              .then((data) => {
                setMessages(data);
              })
              .catch((error) => {
                console.error('Error fetching chat messages:', error);
              });
          })
          .catch((error) => {
            console.error('Error sending message:', error);
          });
      };
    
      return (
        <div className='container mt-4 chat-container'>
          <div className='chat-header'>
            <Link to="/inbox" className='btn btn-secondary mb-3'>Back to Inbox</Link>
            <h2>{username}'s Chat</h2>
          </div>
          <div className='chat-box'>
            <div className='chat-messages'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message.sender_id === username ? 'received' : 'sent'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            <div className='input-box'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Type a message...'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className='input-group-append'>
                  <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default Chat;
