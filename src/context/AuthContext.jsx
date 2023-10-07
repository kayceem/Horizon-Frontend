import React, {createContext, useContext, useState, useEffect} from 'react'
import Cookies from 'js-cookie';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    
    const login = (userInfo) => {
        setUser(userInfo);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userInfo));
    }
    const logout = () => {
        setUser({})
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
        setLoading(false);
    },[]);
    
    return (
        <AuthContext.Provider value ={{user,setUser, isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}