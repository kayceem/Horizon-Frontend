import React, { useEffect, useState } from 'react';
import { searchProducts } from '../../api/search';
import { getCategory } from '../../api/category';
import { useLocation } from 'react-router-dom';
import './Search.scss';

const Search = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const [keyword, setKeyword] = useState(queryParams.get('kwd') || null);
    const [minPrice, setMinPrice] = useState(queryParams.get('min_price') || '');
    const [maxPrice, setMaxPrice] = useState(queryParams.get('max_price') || '');
    const [offset, setOffset] = useState(queryParams.get('offset') || null);
    const [sortBy, setSortBy] = useState(queryParams.get('sortby') || '');
    const [categoryId, setCategoryId] = useState(queryParams.get('c_id') || '');
    const [limit, setLimit] = useState(queryParams.get('limit') || 40);


    const fetchCategories = () => {
        getCategory()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    // Function to fetch products based on search parameters
    const fetchProducts = () => {
        setProducts([]);
        searchProducts(keyword, minPrice, maxPrice, offset, sortBy, categoryId, limit)
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
    const handleApplyFilters = () => {
        // Call the applyFilters function with the selected filters
        fetchProducts();
    };

    useEffect(() => {
        return () => fetchCategories();
    }, []);

    useEffect(() => {
        setKeyword(queryParams.get('kwd'));
    }, [location.search]);

    useEffect(() => {
        if (keyword !== null) {
            fetchProducts();
        }
    }, [keyword]);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar for Filters */}
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Filters</h5>
                            <div className="form-group mb-2">
                                <label>Sort By:</label>
                                <select
                                    className="form-control"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option>Select</option>
                                    <option value="price_asc">
                                        Price ↑
                                    </option>
                                    <option value="price_desc">
                                        Price ↓
                                    </option>
                                    <option value="date_asc">
                                        Date ↑
                                    </option>
                                    <option value="date_desc">
                                        Date ↓
                                    </option>
                                    <option value="views">Views</option>
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label>Min Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label>Max Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label>Category:</label>
                                <select
                                    className="form-control"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleApplyFilters}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Section for Products */}
                <div className="products col-md-9">
                <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 90px)' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length === 0 ? (
                        <p>Product not available.</p>
                    ) : (
                        <div className="row">
                            {products.map((product) => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <div className="card" style={{ width: '15rem', height: '30rem' }}>
                                        <img
                                            src={product.image_url}
                                            className="card-img-top"
                                            alt="..."
                                            style={{ width: '15rem', height: '200px' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text">Rs. {product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    )
};

export default Search;