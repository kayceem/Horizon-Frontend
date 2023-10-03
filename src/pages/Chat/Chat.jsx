import React, { useState, useRef } from 'react';
import { getMessages, sendMessage } from '../../api/messages';
import { useParams, Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import { FadeLoader } from 'react-spinners';
import './Chat.scss';

const Chat = ({ }) => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [offset, setOffset] = useState(0);
  const chatContainerRef = useRef(null);

  const fetchChat = () => {
    // Fetch inbox messages when the component mounts
    getMessages(username, offset)
      .then((data) => {
        setMessages((prevMessages) => {
          const newData = data.filter((newMessage) => {
            return !prevMessages.some((existingMessage) => existingMessage.id === newMessage.id);
          });

          return [...prevMessages, ...newData];
        });
        if (data.length !== 20) {
          setIsAvailable(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching chat messages:', error);
      }).finally(() => {
        setOffset(offset + 20);
      });
  };


  const handleSendMessage = (e) => {
    e.preventDefault();
    // Send a new message
    const trimmedMessage = newMessage.trim();

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
        setMessages([]);
        setIsAvailable(true);
        setOffset(0);
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      })
      .catch((error) => {
        console.error(error);
      })
    fetchChat();
  };

  return (
    <div className='container-fluid'>
      <div className='chat-header'>
        <Link to="/inbox" className='btn btn-secondary mb-3'>Inbox</Link>
        <h2>{username}'s Chat</h2>
      </div>
      <div className='chat-box'>
        <div className='chat-messages list-group'>
          <div className='scrollable-content vh-95' ref={chatContainerRef}>
            <InfiniteScroll
              loadMore={fetchChat}
              hasMore={isAvailable}
              loader={
                <div className="loader d-flex justify-content-center">
                  <FadeLoader color="#000000" size={50} />
                </div>
              }
              isReverse={true}
              useWindow={false}
            >
              {[...messages].reverse().map((message) => (
                <div
                  key={message.id}
                  className='message list-group-item'
                >
                  <div className={`${message.sent ? 'sent' : 'received'}`}>
                    <div className="message-data">
                      <p>{message.content}</p>
                      <p className='time'>{`${new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} `}</p>
                      <p className='time'>{`${new Date(message.created_at).toLocaleDateString()} `}</p>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
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

    </div >
  );
};
export default Chat;
