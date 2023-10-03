import React from 'react'
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import Products from '../Products/Products';
import './Home.scss';
import { FadeLoader } from 'react-spinners';

const Home = () => {
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);


  const fetchProducts = async (newOffset = 0) => {
    setOffset(newOffset);
    setLoading(true);
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

  const fetchData = async () => {
    const newOffset = offset + 20;
    await fetchProducts(newOffset);
  };
  const handleLoadMore = () => {
    fetchData();
    if (isAvailable) {
      alert('No more products available.');
    }
  };

  return (
    <div className='product container-fluid'>
      {loading ? (
        <p className='d-flex justify-content-center'><FadeLoader color="#000000" size={50} /></p>
      ) : mostViewedProducts.length === 0 && latestProducts.length === 0 ? (
        <p className='d-flex justify-content-center'>No products available :(</p>
      ) : (
        <div className="scrollable-content vh-85">
          <h2>Trending Products</h2>
          <Products products={mostViewedProducts} />
          <h2>Newly Added </h2>
          <Products products={latestProducts} />
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