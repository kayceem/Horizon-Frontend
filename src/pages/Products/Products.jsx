import React from 'react';
import { useEffect, useState } from 'react';
// import { searchProducts } from '../../api/search';
import { uploadImage } from '../../api/images';
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
      const [selectedImage, setSelectedImage] = useState(null);

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
      };

      const handleImageUpload = async () => {
        if (!selectedImage) {
          alert('Please select an image first.');
          return;
        }
          uploadImage(selectedImage)
            .then((data) => {
              console.log(data)
            })
            .catch((error) => {
              console.error('Error:', error);
            });

      }

      // useEffect(() => {
      //   // Fetch initial products data
      //   return () => testFunction();
      // }, []);
    
      return (
        <div>
          <h2>Image Upload</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleImageUpload}>Upload Image</button>
        </div>
      );
    
}

export default Products;