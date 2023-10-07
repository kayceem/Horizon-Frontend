import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import Loader from '../../components/Loader/Loader';
import Error404 from '../Error404/Error404';
import { useAuth } from '../../context/AuthContext';
import { getCategory } from '../../api/category';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { addToWishList, deleteFromWishList } from '../../api/wishlist';
import './Product.scss';
import ExpandableImage from '../../components/ImageModal/ImageModal';

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
        })
        .catch((error) => {
          console.error('Error removing from wishlist:', error);
        });
    } else {
      addToWishList({ product_id: product.id })
        .then(() => {
          setWishListed(true);
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
    return () => {
      fetchCategory();
      fetchProduct();
    }
  }, []);

  const goToChat = (user) => {
    navigate(`/chat/${user.username}`);
  }

  return (
    <div className='scrollable-content vh-85 w-100'>
      {
        loading ? (
          <Loader />
        ) : product ? (
          <div className='row'>
            <div className='col-md-5'>
              <ExpandableImage imageUrl={`${process.env.REACT_APP_BACKEND_URL}/${product.image_url}`}
              />
            </div>
            <div className='col-md-7'>
              <div className="d-flex flex-start"></div>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.condition}</p>
              <p>{categories.find((cat) => cat.id === product.category_id)?.name}</p>
              {
                auth.isLoggedIn ? (
                  <div className="contact-seller">
                    <Link to={`/user/${product.user_id}`} style={{ textDecoration: 'none' , color:'black'}}>
                      <p>@{product.user.username}</p>
                    </Link>
                    <button className='btn btn-dark contact-button' onClick={() => goToChat(product.user)}>
                      Contact Seller
                    </button>
                    <button className='wish-list-heart' onClick={handleToggleWishlist}>
                      {wishlisted ? (
                        <AiFillHeart size={35} />
                      ) : (
                        <AiOutlineHeart size={35} />
                      )}
                    </button>
                  </div>
                ) : (
                  <button className='btn btn-dark  contact-button' onClick={() => { navigate("/login", { state: { path: location.pathname } }) }}>
                    Login to contact seller
                  </button>

                )
              }
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