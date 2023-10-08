import React, { useState, useEffect } from 'react'
import { getProducts } from '../../api/products';
import ProductsTab from '../ProductsTab/ProductsTab';
import './ProfileTab.scss';
import ReviewsTab from '../ReviewsTab/ReviewsTab';
import Loader from '../Loader/Loader';

const ProfileTab = ({user_id, isProfile}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('product');

    const fetchProducts = () => {
        setLoading(true);
        const offset=0;
        getProducts(offset, 'latest', user_id, true)
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
        fetchProducts();
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
                                    <p className='d-flex justify-content-center align-items-center h-80'>No products available :(</p>
                                ) : (
                                    <ProductsTab products={products} setProducts={setProducts} isProfile={isProfile}/>
                                )
                            )}

                            {activeTab === 'review' && (
                                    <ReviewsTab userId={user_id}/>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProfileTab;