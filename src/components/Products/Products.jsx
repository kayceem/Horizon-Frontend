import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import backendBaseUrl from '../../config';
import './Products.scss';
import { Dropdown } from 'react-bootstrap';
import { deleteProduct, updateProduct } from '../../api/products';
import EditProductModal from '../EditProduct/EditProductModal';
import { deleteFromWishList,addToWishList } from '../../api/wishlist';

const Products = ({ products, setProducts, expand=false, profile=false }) => {
  
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const conditionColors =
  {
    'Brand new': 'rgb(156, 243, 89)',
    'Like new': 'rgb(177, 205, 156)',
    'Used': 'rgb(244, 217, 159)',
    'Not Working': 'rgb(232, 142, 142)',
    'Digital Product': 'rgb(140, 240, 240)',
    'Unspecified': 'gray'
  }
  const colClass = expand ? 'col-md-3' : 'col-md-2';

  // Function to check if a product is wishlisted
  const isProductWishlisted = (productId) => {
    return wishlistedProducts.includes(productId);
  };

  // Function to handle adding/removing a product from the wishlist
  const handleToggleWishlist = (productId) => {
    if (isProductWishlisted(productId)) {
      // Remove from wishlist
      deleteFromWishList({ product_id: productId })
        .then(() => {
          setWishlistedProducts((prevProducts) =>
            prevProducts.filter((id) => id !== productId)
          );
        })
        .catch((error) => {
          console.error('Error removing from wishlist:', error);
        });
    } else {
      // Add to wishlist
      addToWishList({ product_id: productId })
        .then(() => {
          setWishlistedProducts((prevProducts) => [...prevProducts, productId]);
        })
        .catch((error) => {
          console.error('Error adding to wishlist:', error);
        });
    }
  };

  const handleAvailability = (product) =>{
    product.available = !product.available;
    updateProduct(product, product.id)
    .then(() => {
      setProducts((prevData) => prevData.map((item) => (item.id === product.id ?  product : item))
);

    })
    .catch((error) => {
      console.error('Error marking product: ', error);
    });
  };

  const handleDelete = (product) =>{
    deleteProduct(product.id)
    .then(() => {
      setProducts((prevData) => prevData.filter((item) => item !== product));
    })
    .catch((error) => {
      console.error('Error marking product: ', error);
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);

  const toggleModal = (product) => {
    setCurrentProduct(product);
      setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  
  
  // Initialize the wishlisted products when the component mounts
  useEffect(() => {
    const initialWishlistedProducts = products
      .filter((product) => product.wishlisted)
      .map((product) => product.id);
    setWishlistedProducts(initialWishlistedProducts);
  }, [products]);

  return (
    <div className='row mt-4'>
      {products.map((product) => (
        <div key={product.id} className={`mb-4 ${colClass}`}>
          <div className={`card justify-content-center d-flex  ${product.available ? '' : 'sold-overlay'} ${expand ? 'w-200':'w-100'}`}>
            <div style={{ height: `${expand ? '20vh' : '30vh'}` }}
>
            <img
              src={`${product.image_url}`}
              className='card-img-top border rounded w-100'
              alt='...'
              style={{ height: `${expand ? '20vh' : '30vh'}` }}
              />
              </div>
            <div className='card-body w-100 '>
              <h5 className='card-title'>
                {product.name.length > 50 ? `${product.name.slice(0, 50)} ...` : product.name}
              </h5>
              <small className='card-text product-condition' style={{ backgroundColor: conditionColors[product.condition] }}>{product.condition}</small>
              <div className='d-flex justify-content-between align-items-center mt-2'>
                <p className='card-text m-0 mt-4 mb-1'>Rs. {product.price}</p>
                {
                  profile ? (
                    <Dropdown className=' kebab-menu'>
                    <Dropdown.Toggle variant="dark" className="p-0" id="product-dropdown">
                      <BiDotsVerticalRounded  color="#000000" size={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => toggleModal(product)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAvailability(product)}>{product.available ? (<p className='m-0'>Mark as Sold</p>):(<p className='m-0'> Mark as Available</p>)}</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(product)}>Delete</Dropdown.Item>
                      <EditProductModal isModalOpen={isModalOpen} closeModal={closeModal} product={currentProduct} />
                    </Dropdown.Menu>
                  </Dropdown>

                  ) : (
                    <button className='wish-list-heart' onClick={() => handleToggleWishlist(product.id)}>
                      {isProductWishlisted(product.id) ? (
                        <AiFillHeart size={22} />
                      ) : (
                        <AiOutlineHeart size={22} />
                      )}
                    </button>

                  )
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
