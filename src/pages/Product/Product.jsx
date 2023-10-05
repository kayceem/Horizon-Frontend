import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import Loader from '../../components/Loader/Loader';
import Error404 from '../Error404/Error404';
import { Button } from 'bootstrap';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  useEffect(() => {
    return () => {
      fetchProduct();
    }
  }, []);

  const goToChat = (user) =>{
    navigate(`/chat/${user.username}`);
  }
  
  return (
    <div>
      {
        loading ? (
          <Loader />
        ) : product ? (
          <div>
            <p>{product.name}</p>
            <button className='btn btn-dark' onClick={()=>goToChat(product.user)}>
              Chat
            </button>

          </div>
        ) : (
          <Error404 element={'Product'} />
        )
      }
      {console.log(product)}
    </div>
  );
};

export default Product;