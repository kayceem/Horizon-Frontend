import React, { useState } from 'react';
import './Profile.scss';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import Stars from '../../components/Stars/Stars';
import EditUser from '../../components/EditUser/EditUser';

const Profile = () => {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () =>{
    setIsEditing(!isEditing);
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 h-100 divider">
          {
            !isEditing ? (
              <div>
                <div className='user-name mt-5 mb-4'>
                  <h4>{auth.user.first_name} {auth.user.last_name}</h4>
                  <h6>@{auth.user.username}</h6>
                <p className='m-0 p-0 mt-3 mb-4' style={{fontSize:12}}>{auth.user.email}</p>
                </div>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                  <Stars rating={auth.user.rating} size={26} half={true} />
                  <p className='my-0 me-4'>{auth.user.rating}(5)</p>
                </div>
                <p className='m-0 p-0 mb-4'>Member since: {new Date(auth.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                <div className='interact-buttons d-flex align-items-center'>
                  <button className='btn btn-dark' onClick={toggleEdit}>Edit Profile</button>
                </div>
              </div>
            ) : (
              <EditUser toggleEdit={toggleEdit}/>
              )
          }

        </div>
        <div className="col-md-9">
          {
            auth.user.id ? (
              <ProfileTab user_id={auth.user.id} isProfile={true} />
            ) : (
              <Loader />
            )
          }
        </div>
      </div>
    </div>
  );

};

export default Profile;