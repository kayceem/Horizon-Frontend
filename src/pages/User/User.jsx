import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Error404 from '../Error404/Error404';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../api/user';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import Stars from '../../components/Stars/Stars';
import ReviewUserModal from '../../components/ReviewUser/ReviewUserModal';

const User = () => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchUser = () => {
        setLoading(true);
        getUser(id)
            .then((data) => {
                setUserInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching user', error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        parseInt(auth.user.id) === parseInt(id) && navigate('/profile');
        return () => {
            fetchUser();
        }
    }, []);


    return (
            <div className="container-fluid">
            {
                loading ? (
                    <Loader />
                ) : userInfo ? (
                    <div className="row">
                            <div className="col-md-3 h-100 divider">
                                <div className='user-name mt-5 mb-4'>
                                <h4>{userInfo.first_name} {userInfo.last_name}</h4>
                                <h6>@{userInfo.username}</h6>
                                </div>
                                <div className='d-flex align-items-center justify-content-between mb-5'>
                                    <Stars rating={userInfo.rating} size={26} half={true} /> 
                                    <p className='my-0 me-4'>{userInfo.rating}(5)</p>
                                </div>
                                <p className='m-0 p-0 mb-4'>Member since: {new Date(userInfo.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                                <div className='interact-buttons d-flex justify-content-evenly me-4 align-items-center'>
                                <button className='btn btn-dark btn-sm' onClick={toggleModal}>Review User</button>
                                <ReviewUserModal isModalOpen={isModalOpen} closeModal={closeModal} revieweeId={userInfo.id}/>
                                <button className='btn btn-dark btn-sm' onClick={()=>{navigate(`/chat/${userInfo.username}`)}}>Contact User</button>
                                </div>
                            </div>
                            <div className="col-md-9">
                                {
                                    userInfo.id ? (
                                        <ProfileTab user_id={userInfo.id} isProfile={false} />
                                    ) : (
                                        <Loader />
                                    )
                                }
                        </div>
                    </div>
                ) : (
                    <Error404 element={'User'} />
                )
            }
        </div>
    );
};

export default User;