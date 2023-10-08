import React from 'react';
import { useEffect, useState } from 'react';
import { getInbox } from '../../api/messages';
import './Inbox.scss';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import Chat from '../Chat/Chat';
import { useParams } from 'react-router-dom';
import { getUser } from '../../api/user';
import { BsFillInboxFill } from 'react-icons/bs';
import { Helmet } from 'react-helmet';


const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatUsername, setChatUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [chatMessages, setChatMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const { username } = useParams();



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

  const openConversation = (username, firstName, lastName) => {
    if (username !== chatUsername) {
      refreshInbox();
      setOffset(0);
      setChatMessages([]);
      setChatUsername(username);
      setFirstName(firstName);
      setLastName(lastName);
      setInitialLoad(true);
      setIsAvailable(true);
    }
  }
  const refreshInbox = () => {
    fetchInbox();
  }
  const fetchUserInfo = () => {
    getUser(username)
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
      })
      .catch((error) => {
        console.error('Error fetching Info', error);
      })

  }
  useEffect(() => {
    return () => {
      fetchInbox();
      {
        username &&
          fetchUserInfo();
        setChatUsername(username);
      }
    };
  }, []);

  return (
    <div className='container-fluid row'>
      <Helmet>
        <title>Inbox</title>
      </Helmet>
      <div className='col-md-4 divider'>
        <div className='mb-4 d-flex justify-content-between inbox-heading ms-2 me-4 align-items-center'>
          <p>Inbox</p>
          <div>
            <BsFillInboxFill size={30}/>
          </div>
        </div>
        <div className='list-group'>
          {
            loading ? (
              <Loader />
            ) : messages.length === 0 ? (
              <p className='d-flex justify-content-center align-items-center h-80'>Inbox is empty :(</p>
            ) : (
              <div className='scrollable-content'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`list-group-item list-group-item-action mb-3 message-content ${!message.read && message.sender_id !== auth.user.id ? 'unread-message' : ''
                      }`}
                    onClick={() => openConversation(message.username, message.first_name, message.last_name)}
                  >
                    <div className='d-flex w-100 justify-content-between'>
                      <div className='d-flex flex-column'>
                      {/* {message.read && message.sender_id !== auth.user.id && <div className="unread-dot"></div>}  */}
                      <h6 className='d-flex align-items-center mb-1 '>{`${message.first_name} ${message.last_name}`}</h6>
                      <p className='d-flex align-items-center mb-1 message-username'>@{message.username}</p >
                      </div>
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
          <Chat refreshInbox={refreshInbox} username={chatUsername} firstName={firstName} lastName={lastName} setUsername={setChatUsername} messages={chatMessages} setMessages={setChatMessages} initialLoad={initialLoad} setInitialLoad={setInitialLoad} setIsAvailable={setIsAvailable} isAvailable={isAvailable} />
        ) : (
          <p className='d-flex align-items-center justify-content-center w-100 h-80'>No conversation selected</p>
        )
        }
      </div>
    </div>
  );
};

export default Inbox;
