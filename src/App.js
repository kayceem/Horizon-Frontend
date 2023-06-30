import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';

const App = () => {
    return (<
        div className='main' >
        <Router >
        <Routes >
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes> 
        </Router>
       </div>
                );
};

export default App;