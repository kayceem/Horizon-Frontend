import React from 'react';
import { useEffect, useState } from 'react';
import { getInbox } from '../../api/messages';
import './Inbox.scss';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import Chat from '../Chat/Chat';


const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatUsername, setChatUsername] = useState();
  const [chatMessages, setChatMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);



  const auth = useAuth();

  const fetchInbox = () => {
    // Fetch inbox messages when the component mounts
    setLoading(true);
    getInbox()
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error('Error fetching inbox messages:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openConversation = (username) => {
    if ( username !== chatUsername){
       refreshInbox();
       setOffset(0);
       setChatMessages([]);
       setChatUsername(username);
       setInitialLoad(true);
       setIsAvailable(true);
    }
  }
  const refreshInbox = ()=>{
    fetchInbox();
  }
  useEffect(() => {
    return () => {
      fetchInbox();
    };
  }, []);

  return (
    <div className='container-fluid row'>
      <div className='col-md-4'>
        <h1 className='mb-4'>Inbox</h1>
        <div className='list-group'>
          {
            loading ? (
              <Loader />
            ) : messages.length === 0 ? (
              <p className='d-flex justify-content-center'>Your Inbox is empty :(</p>
            ) : (
              <div className='scrollable-content'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`list-group-item list-group-item-action mb-3 message-content ${!message.read && message.sender_id !== auth.user.id ? 'unread-message' : ''
                      }`}
                    onClick={() => openConversation(message.username)}
                  >
                    <div className='d-flex w-100 justify-content-between'>
                      <h6 className='d-flex align-items-center mb-1'>{message.username} {!message.read && message.sender_id !== auth.user.id && <div className="unread-dot mx-2"></div>} </h6 >
                      <p className='message-string p-0 m-0'>{new Date(message.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className='mb-1 message-string'>
                      {message.content.length > 100
                        ? `${message.content.slice(0, 100)} ...`
                        : message.content}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
      <div className='col-md-8'>
          {chatUsername ? (
            <Chat refreshInbox={refreshInbox} username={chatUsername} setUsername={setChatUsername} offset={offset} setOffset={setOffset} messages={chatMessages} setMessages={setChatMessages} initialLoad={initialLoad} setInitialLoad={setInitialLoad} setIsAvailable={setIsAvailable} isAvailable={isAvailable}/>
          )  : (
            <p className='d-flex align-items-center justify-content-center w-100 h-100'>No conversation selected</p>
          ) 
          }
      </div>
    </div>
  );
};

export default Inbox;
