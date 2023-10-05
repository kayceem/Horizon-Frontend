import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/user';
import './Profile.scss';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import Loader from '../../components/Loader/Loader';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = () => {
    setLoadingUser(true);
    getUser(1)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  };


  useEffect(() => {
    return () => {
      fetchUser();

    };
  }, []);


  return (
    <div className="container-fluid">
      {loadingUser ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-3 h-100 divider">
            <h2>{user?.username}</h2>
          </div>
          {/* HERE */}
          <div className="col-md-9">
            <ProfileTab />
          </div>
        </div>
      )
      }
    </div>
  );

};

export default Profile;