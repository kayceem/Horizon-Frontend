import React from 'react';
import { useEffect, useState } from 'react';
// import { searchProducts } from '../../api/search';
// import { getInbox, getMessages, sendMessage } from '../../api/messages';
import { getWishList, addToWishList, deleteFromWishList } from '../../api/wishlist';
// import { getGivenReviews,getReceivedReviews,getReceivedReviewsById, createReview } from '../../api/reviews';


const Products = () => {
    const productData ={
      'product_id':30
    }	
    const testFunction = () => {
        getWishList()
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      useEffect(() => {
        // Fetch initial products data
        return () => testFunction();
      }, []);
    
  return (
    <div>Products</div>
  )
}

export default Products