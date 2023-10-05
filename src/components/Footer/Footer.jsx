import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='navbar-container'>
    <nav className="navbar footer bg-light border-bottom border-bottom-dark bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center m-1">
            <div className="d-flex">
                <Link to='/' className='navbar-brand'>
                    {/* <img src="static/assests/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> */}
                    Horizon
                </Link>
            </div>
        </div>
    </nav>
</div>
  )
}

export default Footer;