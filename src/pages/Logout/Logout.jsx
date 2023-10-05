import { useEffect } from 'react';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        Cookies.remove('access_token');
      })
      .catch((error) => {
        console.error('Error during logout: ', error);
      })
      .finally(() => {
        navigate('/login');
      });
  }, [navigate]);
  return null;
};

export default Logout;