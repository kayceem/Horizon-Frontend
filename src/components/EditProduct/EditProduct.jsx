import React, { useEffect, useState } from 'react';
import { updateProduct} from '../../api/products';
import { getCategory } from '../../api/category';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../AddProduct/AddProduct.scss';
import { conditions } from '../../config';


const EditProduct = ({ closeModal, product }) => {
  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id || '',
      condition: product.condition || '',
      image_url: product.image_url,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required').matches(/^[a-zA-Z0-9_ ]+$/, 'Product name can only contain numbers, underscores, and alphabets').min(3, 'Product name must be at least 3 characters').max(255,'Product name can not be greater than 255 characters'),
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


useEffect (()=>{
    return () => {
        fetchCategories();
    };
},[]);

  const handleProductSubmit = (productData) => {
    // Call the createProduct API with productData and imageURL
    updateProduct(productData, product.id)
      .then((response) => {
        console.log('Product updated:', response);
        closeModal();
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="container-fluid">
        <div className="mb-2 p-4">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${product.image_url}`}
                className="img-thumbnail mb-3 border rounded p-0"
                alt="Selected Image"
                style={{ maxWidth: '300px', maxHeight: '200px' }}
              />
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
              {formik.touched.category_id && formik.errors.category_id&& <div className='error'>{formik.errors.category_id}</div>}

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
              <button className="btn btn-dark mt-4" type='submit'>
                Submit Product
              </button>
            </div>
          </form>
        </div>
        </div>

  );
};

export default EditProduct;