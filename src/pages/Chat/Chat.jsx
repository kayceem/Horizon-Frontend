import React, { useState, useRef, useEffect } from 'react';
import { getMessages, sendMessage } from '../../api/messages';
import InfiniteScroll from "react-infinite-scroller";
import './Chat.scss';
import Loader from '../../components/Loader/Loader';
import { RxCross1 } from 'react-icons/rx';
import { TbSend } from 'react-icons/tb';

const Chat = ({refreshInbox, username, setUsername, offset, setOffset, messages, setMessages, isAvailable, setIsAvailable, initialLoad, setInitialLoad}) => {
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  const fetchChat = () => {
    getMessages(username, offset)
    .then((data) => {
      setMessages((prevMessages) => {
        const newData = data.filter((newMessage) => {
          return !prevMessages.some((existingMessage) => existingMessage.id === newMessage.id);
        });
        if(data.length!==20){
          setIsAvailable(false)
        }
        return [...prevMessages, ...newData];
      });
    })
    .catch((error) => {
      console.error('Error fetching chat messages:', error);
      })
      .finally(() => {
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
        refreshInbox();
  
      })
      .catch((error) => {
        console.error(error);
      })
      return (()=>{
        fetchChat();
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      });
  };

  const convertToNepalTime = (utcTimestamp) => {
    const nepalTime = new Date(utcTimestamp);
    nepalTime.setHours(nepalTime.getHours() + 5);
    nepalTime.setMinutes(nepalTime.getMinutes() + 45);
    return nepalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }


  useEffect(() => {
    fetchChat();
  },[username])

  useEffect(() => {
    return (()=>{
        if (chatContainerRef.current && initialLoad) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          setInitialLoad(false);
        }
    })
  },[messages])

  

  return (
          <div className='container-fluid'>
            <div className='chat-header bottom-divider'>
              <h5>@{username}</h5>
              <RxCross1 size={22} onClick={()=>{
                setUsername(null)
              }}/>
            </div>
            <div className='chat-box'>
              <div className='chat-messages list-group'>
                <div className='scrollable-content vh-95' ref={chatContainerRef}>
                  <InfiniteScroll
                    loadMore={fetchChat}
                    hasMore={isAvailable}
                    loader={
                      <Loader />
                    }
                    initialLoad={false}
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
                            <p className='time'>{convertToNepalTime(message.created_at)}</p>
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
                    className='btn btn-dark'
                    type='submit'
                  >
                    <TbSend style={{margin:0, padding:0}} size={22}/>
                  </button>
                </div>
              </div>
            </form>
          </div >
  );
};
export default Chat;
