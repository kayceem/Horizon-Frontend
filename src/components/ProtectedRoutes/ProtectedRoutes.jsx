import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
  const auth = useAuth();
  const location = useLocation();
  
  return (
    auth.isLoggedIn ? <Outlet/> : <Navigate to="/login" state={{path:location.pathname}}/>
  )
}

export default ProtectedRoutes