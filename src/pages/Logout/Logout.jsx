import { useEffect } from 'react';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error during logout: ', error);
      });
  }, [navigate]);

  return null;
};

export default Logout;