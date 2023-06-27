import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './views/Signup/Signup';
import Home from './views/Home/Home';

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