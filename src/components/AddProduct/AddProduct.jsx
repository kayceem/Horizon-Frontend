import React, { useState } from 'react';
import { uploadImage } from '../../api/images';
import { createProduct } from '../../api/products';
import { getCategory } from '../../api/category';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../Loader/Loader';


const AddProduct = ({ closeModal }) => {
  const conditions = [
    { id: 1, name: 'Brand new' },
    { id: 2, name: 'Like new' },
    { id: 3, name: 'Used' },
    { id: 4, name: 'Not Working' },
    { id: 5, name: 'Digital Product' },
    { id: 6, name: 'Unspecified' }
  ]
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category_id: '',
      condition: '',
      image_url: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required').matches(/^[a-zA-Z0-9_ ]+$/, 'Product name can only contain numbers, underscores, and alphabets').min(3, 'Product name must be at least 3 characters').max(255, 'Product name can not be greater than 255 characters'),
      category_id: Yup.string().required('Category is required'),
      condition: Yup.string().required('Condition is required'),
      description: Yup.string(),
      price: Yup.number()
        .required('Price is required')
        .min(0, 'Price must be greater than or equal to 0'),
    }),
    onSubmit: async (values) => {
      handleProductSubmit(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(true);
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

  const handleImageUpload = () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }
    setImageUploadLoading(false)
    uploadImage(selectedImage)
      .then((data) => {
        if (data.success) {
          formik.setFieldValue('image_url', data.image_url);
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

  const handleProductSubmit = (productData) => {
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
      {imageUploadLoading ? (
        // Image Upload Section
        <div className="mb-2 p-4">
          <h2 className="mb-3">Upload Image</h2>
          <div className="scrollable-content">

            {imagePreview && (
              <img src={imagePreview}
                className="img-thumbnail mb-3 rounded p-0"
                alt="Selected Image"
                style={{ maxWidth: '300px', maxHeight: '200px' }}
              />
            )}
            {
              !selectedImage ? (
                <div className="mb-3 select-image">
                  <label htmlFor="uploadImage" className="select-img "><small className="text-muted ">Choose an image</small></label>
                  <input type="file" id="uploadImage" accept="image/*" onChange={handleImageChange} />
                </div>
              ) :
                (
                  <div className="mb-3 select-image change">
                    <label htmlFor="uploadImage" className="select-img change "><small className="text-muted ">Change image</small></label>
                    <input type="file" id="uploadImage" accept="image/*" onChange={handleImageChange} />
                  </div>
                )
            }
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleImageUpload}>
                Next
              </button>
            </div>
          </div>

        </div>
      ) : !imageUploaded ? (
        <Loader />
      ) : (
        // Product Information Section
        <div className="mb-2 p-4">
          <h4 className="mb-3">Product Information</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                name='name'
                id="productName"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && <div className='error'>{formik.errors.name}</div>}

            </div>
            <div className="form-group mb-3">
              <label htmlFor="productDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="productDescription"
                name='description'
                rows="4"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                name='price'
                id="productPrice"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price && <div className='error'>{formik.errors.price}</div>}

            </div>
            <div className="form-group mb-2">
              <label>Category:</label>
              <select
                className="form-control"
                value={formik.values.category_id}
                onChange={formik.handleChange}
                name='category_id'
                id='productCategory'
              >
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.category_id && formik.errors.category_id && <div className='error'>{formik.errors.category_id}</div>}

            </div>
            <div className="form-group mb-2">
              <label>Condition:</label>
              <select
                className="form-control"
                value={formik.values.condition}
                onChange={formik.handleChange}
                name='condition'
                id='productCondition'
              >
                <option value="">Select</option>
                {conditions.map((condition) => (
                  <option key={condition.id} value={condition.name}>
                    {condition.name}
                  </option>
                ))}
              </select>
              {formik.touched.condition && formik.errors.condition && <div className='error'>{formik.errors.condition}</div>}

            </div>
            <div>
              <button className="btn btn-primary mt-4" type='submit'>
                Submit Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;