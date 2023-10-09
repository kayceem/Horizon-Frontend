import React from 'react'
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import Products from '../../components/Products/Products';
import './Home.scss';
import Loader from '../../components/Loader/Loader';
import { AdCarousel, AdHero } from '../../components/AdUi/AdUI';
import Footer from '../../components/Footer/Footer';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);


  const fetchMostViewedProducts = async () => {
    getProducts(offset)
      .then((data) => {
        setMostViewedProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };
  const fetchLatestProducts = async (newOffset = 0) => {
    setOffset(newOffset);
    getProducts(newOffset, 'Latest')
      .then((data) => {
        setLatestProducts((prevProducts) => [...prevProducts, ...data]);
        if (data.length !== 18) {
          setIsAvailable(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
        error.code === "ERR_NETWORK"
        ? toast.error(error.message)
        : toast.error(error.response.data.detail)
      });
  };

  const fetchData = async () => {
    setLoading(true);
    fetchMostViewedProducts();
    fetchLatestProducts()
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch initial products data
    return () => {
      fetchData();
      setLatestProducts([]);
      setMostViewedProducts([]);
    }
  }, []);

  const handleLoadMore = () => {
    setLoadingLoadMore(true);
    const newOffset = offset + 18;
    fetchLatestProducts(newOffset)
      .finally(() => {
        setLoadingLoadMore(false);
      })
  };


  return (
    <div className="scrollable-content vh-85" style={{ width: '100vw' }}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : mostViewedProducts.length === 0 && latestProducts.length === 0 ? (
        <p className='d-flex justify-content-center mt-4'>No products available :(</p>
      ) : (
        <div className='product container-fluid shrinked'>
          <AdCarousel />
          <h2 className='d-flex justify-content-center align-items-center m-5 mt-0 pt-5'>Featured Products</h2>
          <Products products={mostViewedProducts} />
          <AdHero />
          <h2 className='d-flex justify-content-center align-items-center m-5 pt-5'>New Drops</h2>
          <Products products={latestProducts} />
          {isAvailable ? (
            loadingLoadMore ? (
              <Loader height={false} />
            ) : (
              <div className='text-center'>
                <button className='btn btn-dark load-more' onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )
          ) : (
            <p></p>
          )
          }
        </div>
      )}
      <Footer />
    </div>
  )
};

export default Home;