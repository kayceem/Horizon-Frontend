import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AddProductModal from '../AddProduct/AddProductModal';
import './Navbar.scss'

const Navbar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Trim the query to remove leading and trailing whitespace
        const trimmedQuery = query.trim();

        if (trimmedQuery !== '') {
            console.log(`Navigation ${trimmedQuery}`);
            navigate(`/search?kwd=${encodeURIComponent(trimmedQuery)}`);
        } else {
            // Optionally, you can display an error message or prevent the submission
            console.log('Empty search query. Please enter a search term.');
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
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
                        <form className="d-flex mt-2" role="search" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2 search-box"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={query}
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-dark" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className=' me-5'>
                        <button className="btn btn-dark" onClick={toggleModal}>Add Product</button>
                        <AddProductModal isModalOpen={isModalOpen} closeModal={closeModal} />
                        </div>
                        <Link to='/inbox' className='light-icon me-4'>
                            <BiMessageSquareDetail size={24} />
                        </Link>
                        <Link to='/wishlist' className='light-icon me-4'>
                            <AiOutlineHeart size={24} />
                        </Link>
                        <Dropdown className="profile-dropdown">
                            <Dropdown.Toggle variant='dark' className='p-0 me-4' id='profile-dropdown'>
                                <IoMdPerson size={24} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to='/profile'>
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to='/logout'>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;