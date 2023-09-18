import React from 'react'
import { LuMessageSquare } from "react-icons/lu";
import { BsHeart, BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='fixed-top navbar-container'>
            <nav className="navbar bg-dark border-bottom border-bottom-dark bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <Link to='/' className='navbar-brand'>
                            {/* <img src="static/assests/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> */}
                            Horizon
                        </Link>
                    </div>
                    <div className="d-flex">
                        <form className="d-flex mt-2" role="search">
                            <input className="form-control me-2 search-box" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to='/inbox' className='me-5 light-icon'>
                            <LuMessageSquare size={24} />
                        </Link>
                        <Link to='/wishlist' className='me-5 light-icon'>
                            <BsHeart size={24} />
                        </Link>
                        <Link to='/profile' className='me-5 light-icon'>
                            <BsPerson size={30} />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar