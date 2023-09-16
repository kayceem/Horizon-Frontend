import React from 'react'
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import './Home.scss';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchProducts = (newOffset) => {
    getProducts(newOffset)
      .then((data) => {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setOffset(newOffset);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    // Fetch initial products data
    return () => fetchProducts(0);
  }, []);

  const handleLoadMore = () => {
    // Increase the offset to load more products
    const newOffset = offset + 20; // Adjust the number to the desired batch size
    fetchProducts(newOffset);
  };

  return (
    <div className='products'>
      {products.length === 0 ? (
        <p>Loading...</p>
        ) : (
          <div className='row'>
          {products.map((product) => (
            <div key={product.id} className='col-md-3 mb-4'>
              <div className='card' style={{ width: '15rem', height: '30rem'}}>
                <img
                  src={product.image_url}
                  className='card-img-top'
                  alt='...'
                  style={{ width: '15rem', height: '200px' }}
                  />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>{product.description}</p>
                  <p className='card-text'>{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
   {products.length !== 0 ? (
     <div className='text-center'>
     <button className='btn btn-primary mt-3' onClick={handleLoadMore}>
       Load More
     </button>
   </div>
   ):(<div></div>)}
 </div>
  );
};

export default Home;