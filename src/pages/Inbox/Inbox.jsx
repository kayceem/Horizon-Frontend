import React from 'react';
import { useEffect, useState } from 'react';
import { getInbox } from '../../api/messages';
import { Link } from 'react-router-dom';
import './Inbox.scss';


const Inbox = () => {
  const [messages, setMessages] = useState([]);

  const fetchInbox = () => {
    // Fetch inbox messages when the component mounts
    getInbox()
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error('Error fetching inbox messages:', error);
      });
  };
  useEffect(() => {
    return () => {
      fetchInbox();
    };
  }, []);
  return (
    <div className='container-fluid'>
      <h2 className='mb-4'>Inbox</h2>
      <div className='list-group'>
        <div className='scrollable-content'>
          {messages.map((message) => (
            <Link
              key={message.id}
              to={`/chat/${message.username}`}
              className='list-group-item list-group-item-action mb-3'
            >
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>{message.username}</h5>
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
      </div>
    </div>
  );
};

export default Inbox;
