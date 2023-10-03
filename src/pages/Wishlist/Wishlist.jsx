import React, { useEffect, useState } from 'react'
import { getWishList } from '../../api/wishlist'
import Products from '../Products/Products';
import { FadeLoader } from 'react-spinners';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchWishList = async () => {
    setLoading(true);
    getWishList()
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.log('Error fetching wishlist: ', error)
      })
      .finally(()=>{
        setLoading(false);
      })
  }

  useEffect(() => {
    return () => {
      fetchWishList();
    };
  }, []);
  return (
    <div className='product container-fluid'>
    <h1>Wish List</h1>
    {
      loading ? (
        <p className='d-flex justify-content-center'><FadeLoader color="#000000" size={50} /></p>
        ) : products.length !==0 ? (
          <div className='scrollable-content'>
            <Products products={products} />
            </div>
        ) : (
          <p className='d-flex justify-content-center'>Your wishlit is empty :(</p> 
        )
        
      }
      </div>
  );
};

export default Wishlist;