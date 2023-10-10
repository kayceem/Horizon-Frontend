import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import Loader from '../../components/Loader/Loader';
import Error404 from '../Error404/Error404';
import { useAuth } from '../../context/AuthContext';
import { getCategory } from '../../api/category';
import { addToWishList, deleteFromWishList } from '../../api/wishlist';
import './Product.scss';
import ExpandableImage from '../../components/ImageModal/ImageModal';
import Stars from '../../components/Stars/Stars';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [wishlisted, setWishListed] = useState();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const fetchProduct = () => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product', error);
      })
      .finally(() => {
        setLoading(false);
      })
  }
  const fetchCategory = () => {
    getCategory()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching product', error);
      })
  }
  const handleToggleWishlist = () => {
    if (wishlisted) {
      deleteFromWishList({ product_id: product.id })
        .then(() => {
          setWishListed(false);
          toast.success('Removed from wishlist');
        })
        .catch((error) => {
          console.error('Error removing from wishlist:', error);
        });
      } else {
        addToWishList({ product_id: product.id })
        .then(() => {
          setWishListed(true);
          toast.success('Added to wishlist');
        })
        .catch((error) => {
          console.error('Error adding to wishlist:', error);
        });
    }
  };

  useEffect(() => {
    setWishListed(product?.wishlisted);
  }, [product])

  useEffect(() => {
      fetchCategory();
      fetchProduct();
  }, []);

  const goToChat = (user) => {
    user !== auth.user.username ?
    navigate(`/inbox/${user.username}`) :
    navigate('/inbox') ;
  }

  return (
    <div className='w-100'>
      <Helmet>
        <title>Product</title>
      </Helmet>
      {
        loading ? (
          <Loader />
        ) : product ? (
          <div className='row'>
            <div className='col-md-6'>
              <ExpandableImage imageUrl={`${process.env.REACT_APP_BACKEND_URL}/${product.image_url}`} />
              {

                auth.isLoggedIn ? (
                  <>
                    <div className='user-name mt-4 mb-2'>
                      <h4>{product.user.first_name} {product.user.last_name}</h4>
                      <Link to={`/user/${product.user.username}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <p>@{product.user.username}</p>
                      </Link>
                    </div>
                    <div className='d-flex align-items-center justify-content-start mb-2' style={{ gap: '2rem' }}>
                      <Stars rating={product.user.rating} size={26} half={true} />
                      <p className='my-0 me-2'>{product.user.rating}(5)</p>
                    </div>
                    <p className='m-0 p-0 mb-2'>Member since: {new Date(product.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                  </>
                ) : (<></>)
              }
            </div>
            <div className='col-md-5'>
              <div className='scrollable-content vh-85'>
                <div className="d-flex flex-column ms-4">
                  <p className='product-name'>{product.name}</p>
                  {product.description.length !== 0 ? (<p className='ms-2'>{product.description}</p>) : (<p className='ms-2' style={{ opacity: '50%' }}>No description</p>)}
                  <div className='product-info-tags'>
                    <p className='product-info-tag'>{product.condition}</p>
                    <p className='product-info-tag'>{categories.find((cat) => cat.id === product.category_id)?.name}</p>
                  </div>
                </div>
                {
                  auth.isLoggedIn ? (
                    <div className="contact-seller ms-4">
                      <div className='d-flex justify-content-start logged-in-buttons' >
                        <button className='btn btn-dark contact-button' onClick={() => goToChat(product.user)}>
                          Contact Seller
                        </button>
                        <button className='btn btn-dark contact-button ' onClick={handleToggleWishlist}>
                          {wishlisted ? (
                            <>
                              Remove from wishlist
                            </>
                          ) : (
                            <>
                            Add to wishlist
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button className='btn btn-dark login-contact-button ms-4' onClick={() => { navigate("/login", { state: { path: location.pathname } }) }}>
                      Login to contact seller
                    </button>

                  )
                }
              </div>
            </div>

          </div>
        ) : (
          <Error404 element={'Product'} />
        )
      }
    </div>
  );
};

export default Product;