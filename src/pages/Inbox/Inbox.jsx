import React from 'react';
import { useEffect, useState } from 'react';
import { getInbox } from '../../api/messages';
import { Link } from 'react-router-dom';
import './Inbox.scss';
import Loader from '../../components/Loader/Loader';
import {useAuth} from '../../context/AuthContext';


const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
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
    .finally(()=>{
      setLoading(false);
    });
  };
  useEffect(() => {
    return () => {
      fetchInbox();
    };
  }, []);
  return (
    <div className='container-fluid'>
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
                <Link
                  key={message.id}
                  to={`/chat/${message.username}`}
                  className= {`list-group-item list-group-item-action mb-3 message-content ${
                    !message.read && message.sender_id !== auth.user.id ? 'unread-message' : ''
                  }`}
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='d-flex align-items-center mb-1'>{message.username} {!message.read && message.sender_id !== auth.user.id && <div className="unread-dot mx-2"></div>} </h5>
                    <small>{new Date(message.created_at).toLocaleDateString()}</small>
                  </div>
                  <p className='mb-1'>
                    {message.content.length > 100
                      ? `${message.content.slice(0, 100)} ...`
                      : message.content}
                  </p>
                </Link>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Inbox;
