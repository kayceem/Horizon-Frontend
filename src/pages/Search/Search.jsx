import React, { useEffect, useState } from 'react';
import { searchProducts } from '../../api/search';
import { getCategory } from '../../api/category';
import { useLocation } from 'react-router-dom';
import './Search.scss';
import Products from '../Products/Products';
import { FadeLoader } from 'react-spinners';

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
    const [condition, setCondition] = useState(queryParams.get('condition') || '');
    const [limit, setLimit] = useState(queryParams.get('limit') || 40);

    const conditions = [
        { id: 1, name: 'Brand new' },
        { id: 2, name: 'Like new' },
        { id: 3, name: 'Used' },
        { id: 4, name: 'Not Working' },
        { id: 5, name: 'Digital Product' },
        { id: 6, name: 'Unspecified' }
    ]

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
        setLoading(true);
        searchProducts(keyword, minPrice, maxPrice, offset, sortBy, categoryId, condition, limit)
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
        fetchProducts();
    };

    useEffect(() => {
        return () => {
            fetchCategories();
        };
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
                            <div className="form-group mb-3">
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
                            <div className="form-group mb-3">
                                <label>Condition:</label>
                                <select
                                    className="form-control"
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {conditions.map((condition) => (
                                        <option key={condition.id} value={condition.name}>
                                            {condition.name}
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
                <div className="products col-md-9">
                    <div className='scrollable-content'>
                        {loading ? (
                            <p className='d-flex justify-content-center'><FadeLoader color="#000000" size={50} /></p>
                        ) : products.length === 0 ? (
                            <p>Product not available.</p>
                        ) : (
                            <Products products={products} expand={true} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Search;