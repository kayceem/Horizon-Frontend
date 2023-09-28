import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../../api/messages';
import { useParams, Link } from 'react-router-dom';
import './Chat.scss';

const Chat = ({ }) => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchChat = () => {
    // Fetch inbox messages when the component mounts
    getMessages(username)
      .then((data) => {
        setMessages(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching chat messages:', error);
      });
  };

  useEffect(() => {
    // Fetch chat messages when the component mounts
    return () => {
      fetchChat();
    };
  }, [username]); // Re-fetch messages when the username changes

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Send a new message
    const trimmedMessage= newMessage.trim();

    if (trimmedMessage === '') {
      return;
    }

    const messageData = {
      receiver_username: username,
      content: trimmedMessage,
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
    <div className='container-fluid'>
      <div className='chat-header'>
        <Link to="/inbox" className='btn btn-secondary mb-3'>Inbox</Link>
        <h2>{username}'s Chat</h2>
      </div>
      <div className='chat-box'>
        <div className='chat-messages list-group'>
          <div className='scrollable-content-chat'>
            {messages.map((message) => (
              <div
                key={message.id}
                className='message list-group-item'
              >
                <div className={`${message.sent ? 'sent' : 'received'}`}>
                <div className="message-data">
                  <p>{message.content}</p>
                  {/* <p>{`${new Date(message.created_at).toLocaleDateString()} ${new Date(message.created_at).toLocaleTimeString()}`}</p> */}
                  <p className='time'>{`${new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} `}</p>
                  <p className='time'>{`${new Date(message.created_at).toLocaleDateString()} `}</p>

                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSendMessage}>
          <div className='input-box'>
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
                type='submit'
              >
                Send
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
export default Chat;
