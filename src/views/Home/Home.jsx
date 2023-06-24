import React from 'react'
import { getUsers } from '../api/user';

const Home = () => {
      useEffect(() => {
        fetchUsers();
      }, []);
    
      async function fetchUsers() {
        try {
          const users = await getUsers();
          console.log(users);
        } catch (error) {
          console.log('Error fetching users: ', error.message);
        }
      }
    
      return (
        <div>
            {users}
        </div>
      );
    
}

export default Home