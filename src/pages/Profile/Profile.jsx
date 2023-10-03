import React, { useEffect, useState } from 'react';
import { searchProducts } from '../../api/search';
import { getCategory } from '../../api/category';
import { useLocation } from 'react-router-dom';
import Products from '../Products/Products';
import { FadeLoader } from 'react-spinners';
import { getProducts } from '../../api/products';
import { getUser } from '../../api/user';
import { getReceivedReviews } from '../../api/reviews';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    getProducts(offset,null, 1, true)
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

  const fetchUser = () => {
    setLoading(true);
    getUser(1)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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


  useEffect(() => {
    return () => {
      fetchUser();
      fetchProducts();
    };
  }, []);


  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-3 ">
            {loading ? (
              <p className='d-flex justify-content-center'><FadeLoader color="#000000" size={50} /></p>
            ) :(
        <h2>{user?.username}</h2>)
            }
        </div>
        
        <div className="col-md-9">

          <div className='scrollable-content vh-85'>
            {loading ? (
              <p className='d-flex justify-content-center'><FadeLoader color="#000000" size={50} /></p>
            ) : products.length === 0 ? (
              <p>Product not available.</p>
            ) : (
              <Products products={products} setProducts={setProducts} expand={true} profile={true} />
            )}
          </div>
        </div>
      </div>
      </div>

  )
};

export default Profile;