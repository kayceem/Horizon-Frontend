import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Products from './pages/Products/Products';
import Navbar from './components/Navbar/Navbar';

const App = () => {
    return (<
        div className='main' >
        <Router >
            <Navbar/>
            <Routes >
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
            </Routes> 
        </Router>
       </div>
                );
};

export default App;