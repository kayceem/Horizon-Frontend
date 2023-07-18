import React from 'react'
import { LuMessageSquare } from "react-icons/lu";
import { BsHeart,BsPerson } from "react-icons/bs";
import './Navbar.scss'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar bg-dark border-bottom border-bottom-dark fixed-top bg-body-tertiary"  data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <a className="navbar-brand" href="#">
                            {/* <img src="static/assests/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> */}
                            Horizon
                        </a>
                    </div>
                    <div className="d-flex">    
                        <form className="d-flex mt-2" role="search">
                            <input className="form-control me-2 search-box" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <LuMessageSquare className="me-5 light-icon"  size={24} />
                        <BsHeart className="me-5 light-icon" size={24} />
                        <BsPerson className="me-5 light-icon" size={30} />
                    </div>  
                </div>
            </nav>
        </div>
    )
}

export default Navbar