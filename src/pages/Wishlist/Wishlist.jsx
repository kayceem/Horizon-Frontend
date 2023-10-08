import React, { useEffect, useState } from 'react'
import { getWishList } from '../../api/wishlist'
import Products from '../../components/Products/Products';
import Loader from '../../components/Loader/Loader';

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
  const groupedItems = products.reduce((groups, item) => {
    const createdAt = new Date(item.created_at).toLocaleDateString();
    if (!groups[createdAt]) {
      groups[createdAt] = [];
    }
    groups[createdAt].push(item);
    return groups;
  }, {});


  useEffect(() => {
    return () => {
      fetchWishList();
    };
  }, []);
  return (

<div className='product container-fluid mt-4'>
{
      loading ? (
        <Loader/>
      ) : Object.keys(groupedItems).length === 0 ? (
  <p className='d-flex justify-content-center'>Your wish list is empty :(</p>
) : (
      <div className='scrollable-content vh-85'>
      {Object.entries(groupedItems).map(([date, items]) => (
        <div key={date}>
          <h5>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day:'2-digit' })}</h5>
        <Products products={items} />
        </div>
      ))}
      </div>
)}
</div>
  );
};

export default Wishlist;