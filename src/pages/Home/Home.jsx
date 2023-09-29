import React from 'react'
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import './Home.scss';

const Home = () => {
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);


  const fetchProducts = async (newOffset = 0) => {
    setOffset(newOffset);
    getProducts(newOffset)
      .then((data) => {
        setMostViewedProducts((prevProducts) => [...prevProducts, ...data]);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsAvailable(false);
      });
    getProducts(newOffset, 'Latest')
      .then((data) => {
        setLatestProducts((prevProducts) => [...prevProducts, ...data]);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsAvailable(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    // Fetch initial products data
    return () => {
      fetchProducts();
      setLatestProducts([]);
      setMostViewedProducts([]);
    }
  }, []);

  const handleLoadMore = () => {
    const fetchData = async () => {
      const newOffset = offset + 20;
      await fetchProducts(newOffset);
    };
    fetchData();
    if (isAvailable) {
      alert('No more products available.');
    }
  };

  return (
    <div className='product container-fluid'>
      {loading ? (
        <p>Loading...</p>
      ) : mostViewedProducts.length === 0 && latestProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="scrollable-content">
          <h2>Most Viewed Products</h2>
          <div className='row mt-5'>
            {mostViewedProducts.map((product) => (
              <div key={product.id} className='col-md-3 mb-4'>
                <div className='card' style={{ width: '15rem', height: '30rem' }}>
                  <img
                    src={product.image_url}
                    className='card-img-top'
                    alt='...'
                    style={{ width: '15rem', height: '200px' }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text justify-text'>
                      {product.description.length > 100
                        ? `${product.description.slice(0, 100)} ...`
                        : product.description}
                    </p>

                    <p className='card-text position-absolute bottom-0 mb-5'>Rs. {product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2>Latest Products </h2>
          <div className='row mt-5'>
            {latestProducts.map((product) => (
              <div key={product.id} className='col-md-3 mb-4'>
                <div className='card' style={{ width: '15rem', height: '30rem' }}>
                  <img
                    src={product.image_url}
                    className='card-img-top'
                    alt='...'
                    style={{ width: '15rem', height: '200px' }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description}</p>
                    <p className='card-text'>Rs. {product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            isAvailable ? (
              <div className='text-center'>
                <button className='btn btn-primary mt-3' onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            ) : (<p></p>)
          }
        </div>
      )}
    </div>
  )
};

export default Home;