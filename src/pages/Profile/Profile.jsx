import React from 'react';
import './Profile.scss';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const auth = useAuth();


  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 h-100 divider">
            <h3>{auth.user.first_name} {auth.user.last_name}</h3>
            <h6>@{auth.user.username}</h6>
            <h6>Member since: {new Date(auth.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</h6>
          </div>
          <div className="col-md-9">
            {
              auth.user.id ? (
                <ProfileTab user_id={auth.user.id}/>
              ) : (
                <Loader/>
              )
            }
          </div>
        </div>
    </div>
  );

};

export default Profile;