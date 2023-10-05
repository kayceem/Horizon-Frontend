import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Navbar from './components/Navbar/Navbar';
import Inbox from './pages/Inbox/Inbox';
import Chat from './pages/Chat/Chat';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Error404 from './pages/Error404/Error404';

const App = () => {
    return (<
        div className='main' >
        <Router>
            <Navbar />
            <Routes >   
                <Route path="/" element={<Home />} />
                <Route path="/chat/:username" element={<Chat />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    </div>
    );
};

export default App;