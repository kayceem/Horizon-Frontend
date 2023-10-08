import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Inbox from './pages/Inbox/Inbox';
import Product from './pages/Product/Product';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Error404 from './pages/Error404/Error404';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import User from './pages/User/User';
import { Toaster } from 'react-hot-toast';
import Ad from './pages/Ad/Ad';

const App = () => {
    return (<
        div className='main' >
        <Toaster
            position="top-center"
            containerStyle={{marginTop:'55px'}}
            reverseOrder={false} />
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/admin/ad" element={<Ad />} />
                        <Route path="/inbox/:username" element={<Inbox />} />
                        <Route path="/inbox" element={<Inbox />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/user/:username" element={<User />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Router>
        </AuthProvider>
    </div>
    );
};

export default App;