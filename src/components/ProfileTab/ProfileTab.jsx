import React, { useState, useEffect } from 'react'
import { getProducts } from '../../api/products';
import ProductsTab from '../ProductsTab/ProductsTab';
import { getReceivedReviews } from '../../api/reviews';
import './ProfileTab.scss';
import ReviewsTab from '../ReviewsTab/ReviewsTab';
import Loader from '../Loader/Loader';

const ProfileTab = () => {
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('product');

    const fetchReviews = () => {
        setLoading(true);
        getReceivedReviews()
            .then((data) => {
                setReviews([...data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    const fetchProducts = () => {
        setLoading(true);
        getProducts(offset, 'latest', 1, true)
            .then((data) => {
                setProducts([...data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);

            });
    };

    const handleTabClick = (tabValue) => {
        setActiveTab(tabValue);
    }

    useEffect(() => {
        return () => {
            fetchProducts();
            fetchReviews();
        };
    }, []);

    return (
        <div className='profile-tab'>

            <ul className="nav nav-tabs justify-content-center profile-tab-item">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'product' ? 'active' : ''}`}
                        onClick={() => handleTabClick('product')}
                    >
                        Products
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}
                        onClick={() => handleTabClick('review')}
                    >
                        Reviews
                    </button>
                </li>
            </ul>
            <div className="tab-content mb-4">
                {
                    loading ? (
                        <Loader/>
                    ) : (
                        <div>
                            {activeTab === 'product' && (
                                products.length === 0 ? (
                                    <p className='d-flex justify-content-center align-items-center'>No products available :(</p>
                                ) : (
                                    <ProductsTab products={products} setProducts={setProducts} />
                                )
                            )}

                            {activeTab === 'review' && (
                                reviews.length === 0 ? (
                                    <p className='d-flex align-items-center'>No reviews yet.</p>
                                ) : (
                                    <ReviewsTab reviews={reviews} setReviews={setReviews} />
                                )
                            )}
                        </div>
                    )
                }


            </div>
        </div>
    );
};

export default ProfileTab;