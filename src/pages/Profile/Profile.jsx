import React, { useState } from 'react';
import './Profile.scss';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import Stars from '../../components/Stars/Stars';
import EditUser from '../../components/EditUser/EditUser';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

const Profile = () => {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const toggleEdit = () =>{
    setIsEditing(!isEditing);
  };
  const toggleChangePassword = () =>{
    setIsChangingPassword(!isChangingPassword);
  };
  const handleMail = (email) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 divider">
          {
            !isEditing && !isChangingPassword? (
              <div>
                <div className='user-name mt-5 mb-4'>
                  <h4>{auth.user.first_name} {auth.user.last_name}</h4>
                  <h6>@{auth.user.username}</h6>
                <p className='m-0 p-0 mt-3 mb-4 email-link' onClick={()=>handleMail(auth.user.email)}>{auth.user.email}</p>
                </div>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                  <Stars rating={auth.user.rating} size={26} half={true} />
                  <p className='my-0 me-4'>{auth.user.rating}(5)</p>
                </div>
                <p className='m-0 p-0 mb-4'>Member since: {new Date(auth.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                <div className='interact-buttons d-flex align-items-center justify-content-between me-4'>
                  <button className='btn btn-dark' onClick={toggleEdit}>Edit Profile</button>
                  <button className='btn btn-dark' onClick={toggleChangePassword}>Change Password</button>
                </div>
              </div>
            ) : isEditing ? (
              <EditUser toggleEdit={toggleEdit}/>
              ) : isChangingPassword ? (
                <ChangePassword toggleChangePassword={toggleChangePassword}/>
              ) : (
                <div></div>
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