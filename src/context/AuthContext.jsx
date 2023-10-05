import React, {createContext, useContext, useState, useEffect} from 'react'
import Cookies from 'js-cookie';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState();
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    
    const login = (userInfo) => {
        setUser(userInfo)
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userInfo));
    }
    const logout = () => {
        setUser(null)
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        Cookies.remove('access_token');
    }
    
    useEffect( () => {
        const accessToken = Cookies.get('access_token');   
        const storedUser = localStorage.getItem('user');
        if (storedUser && accessToken) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
    },[]);
    
    return (
        <AuthContext.Provider value ={{user, isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ( )=> {
    return useContext(AuthContext);
}