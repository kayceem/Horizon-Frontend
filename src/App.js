import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Products from './pages/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Inbox from './pages/Inbox/Inbox';
import Chat from './pages/Chat/Chat';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';

const App = () => {
    return (<
        div className='main' >
        <Router >
            <Navbar/>
            <Routes >
                <Route path="/" element={<Home/>} />
                <Route path="/chat/:username" element={<Chat/>} />
                <Route path="/inbox" element={<Inbox/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/wishlist" element={<Wishlist/>} />
            </Routes> 
        </Router>
       </div>
                );
};

export default App;