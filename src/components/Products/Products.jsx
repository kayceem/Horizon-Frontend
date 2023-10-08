import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import backendBaseUrl from '../../config';
import './Products.scss';
import { Dropdown } from 'react-bootstrap';
import { deleteProduct, updateProduct } from '../../api/products';
import EditProductModal from '../EditProduct/EditProductModal';
import { deleteFromWishList, addToWishList } from '../../api/wishlist';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Products = ({ products, setProducts, expand = false, profile = false }) => {

  const [wishlistedProducts, setWishlistedProducts] = useState([]);
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
          toast.success('Removed from wishlist.')
        })
        .catch((error) => {
          console.error('Error removing from wishlist:', error);
        });
      } else {
        // Add to wishlist
        addToWishList({ product_id: productId })
        .then(() => {
          setWishlistedProducts((prevProducts) => [...prevProducts, productId]);
          toast.success('Added to wishlist.')
        })
        .catch((error) => {
          console.error('Error adding to wishlist:', error);
        });
    }
  };

  const handleAvailability = (product) => {
    product.available = !product.available;
    updateProduct(product, product.id)
      .then(() => {
        setProducts((prevData) => prevData.map((item) => (item.id === product.id ? product : item)));
        toast.success('Marked.');

      })
      .catch((error) => {
        console.error('Error marking product: ', error);
      });
  };

  const handleDelete = (product) => {
    deleteProduct(product.id)
      .then(() => {
        setProducts((prevData) => prevData.filter((item) => item !== product));
        toast.success('Product deleted.')
      })
      .catch((error) => {
        console.error('Error marking product: ', error);
        toast.error('Product could not be deleted.')
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
            <div className={`card justify-content-center d-flex  ${product.available ? '' : 'sold-overlay'}`}>
              {/* <div style={{ height: `${expand ? '10vh' : '20vh'}` }} */}
          <Link to={`/product/${product.id}` } className='card-link'>
              <div className='image-container' style={{ height: '25vh' }}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${product.image_url}`}
                  className='card-img-top img-fluid'
                  alt='...'
                  style={{ maxHeight: '25vh' }}
                />
              </div>
          </Link>


              <div className='card-body w-100 '>
          <Link to={`/product/${product.id}`} className='card-link'>
                <h5 className='card-title'>
                  {product.name.length > 50 ? `${product.name.slice(0, 50)} ...` : product.name}
                </h5>
                <small className='card-text product-condition'>{product.condition}</small>
          </Link>
                <div className='d-flex justify-content-between align-items-center mt-2 mb-2'>
                <p className='card-text m-0'>Rs. {product.price.toFixed(2)}</p>

                  {
                    profile ? (
                      <Dropdown className=' kebab-menu'>
                        <Dropdown.Toggle variant="dark" className="p-0" id="product-dropdown">
                          <BiDotsVerticalRounded color="#000000" size={22} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => toggleModal(product)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleAvailability(product)}>{product.available ? (<p className='m-0'>Mark as Sold</p>) : (<p className='m-0' style={{opacity:'100%'}}> Mark as Available</p>)}</Dropdown.Item>
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
      ))
      }
    </div >
  );
};

export default Products;
