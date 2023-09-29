import React, { useState } from 'react';
import { uploadImage } from '../../api/images';
import { createProduct } from '../../api/products';
import { getCategory } from '../../api/category';

const AddProduct = ({ closeModal }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    getCategory()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };


  const handleImageChange = (e) => {
    setSelectedImage(null);
    const file = e.target.files[0];
    setSelectedImage(file);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setImagePreview(null);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }
    uploadImage(selectedImage)
      .then((data) => {
        if (data.success) {
          setProductData({ ...productData, image_url: data.image_url });
          setImageUploaded(true);
        } else {
          alert('Image could not be uploaded');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setImagePreview(null);
    setSelectedImage(null);
    fetchCategories();
  };

  const handleProductSubmit = () => {
    // Call the createProduct API with productData and imageURL
    createProduct(productData)
      .then((response) => {
        console.log('Product created:', response);
        closeModal();
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div className="container-fluid">
      {!imageUploaded ? (
        // Image Upload Section
        <div className="mb-2 p-4 border rounded ">
          <h2 className="mb-3">Image Upload</h2>
          <div className="scrollable-content-image">

            {imagePreview && (
              <img src={imagePreview}
                className="img-thumbnail mb-3 rounded"
                alt="Selected Image"
                style={{ maxWidth: '400px', maxHeight: '300px' }}
              />
            )}

            <div className="mb-3">
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleImageUpload}>
                Next
              </button>
            </div>
          </div>

        </div>
      ) : (
        // Product Information Section
        <div>
          <h4 className="mb-3">Product Information</h4>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="productDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="productDescription"
                rows="4"
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              />
            </div>
            <div className="form-group mb-2">
              <label>Category:</label>
              <select
                className="form-control"
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              >
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          {/* Submit Button */}
          <div className="mb-4">
            <button className="btn btn-primary" onClick={handleProductSubmit}>
              Submit Product
            </button>
            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;