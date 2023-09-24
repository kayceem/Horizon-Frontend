import { useEffect } from 'react';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        // Optional: You can add some code here if you want to perform actions
        // after successful logout.
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