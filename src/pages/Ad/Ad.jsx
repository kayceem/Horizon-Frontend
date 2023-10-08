import React, { useState } from 'react';
import { createAd } from '../../api/ad';
import { uploadImage } from '../../api/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../../components/Loader/Loader';
import {LuRefreshCw} from 'react-icons/lu';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Ad = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      sub_title: '',
      provider: '',
      image_url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Ad title is required').matches(/^[a-zA-Z0-9_ ]+$/, 'Ad title can only contain numbers, underscores, and alphabets').min(1, 'Ad title must be at least one character').max(255, 'Ad title can not be greater than 255 characters'),
      provider: Yup.string().required('Provider is required'),
      sub_title: Yup.string(),
    }),
    onSubmit: async (values) => {
      handleAdSubmit(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(true);
  const navigate = useNavigate();
  
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
      toast.error('Please select an image.')
      return;
    }
    setImageUploadLoading(false)
    uploadImage(selectedImage)
    .then((data) => {
      if (data.success) {
        formik.setFieldValue('image_url', data.image_url);
        setImageUploaded(true);
      } else {
          toast.error('Image could not be uploaded.')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setImagePreview(null);
    setSelectedImage(null);
  };
  
  const handleAdSubmit = (adData) => {
    // Call the createProduct API with productData and imageURL
    createAd(adData)
      .then((data) => {
        formik.resetForm();
        toast.success('Ad added succesfully.')
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating ad:', error);
      });
  };
    
  return (
    <div className="container-fluid">
    {imageUploadLoading ? (
      // Image Upload Section
      <div className="mb-2 p-4">
        <h2 className="mb-3">Choose Image</h2>
        <div className="scrollable-content">

          {imagePreview && (
           <div className="image-container position-relative mb-3">
           <img
             src={imagePreview}
             className="img-fluid p-0"
             alt="Selected Image"
             style={{maxHeight: '250px', borderRadius:'10px' }}
           />
           <div className="rounded overlay">
             <label htmlFor="uploadImage" className="select-img change">
               <LuRefreshCw size={80}/>
             </label>
             <input type="file" id="uploadImage" accept="image/*" onChange={handleImageChange} />
           </div>
         </div>
         
          )}
          {
            !selectedImage && (
              <div className="mb-3 select-image">
                <label htmlFor="uploadImage" className="select-img "><small className="text-muted ">Choose an image</small></label>
                <input type="file" id="uploadImage" accept="image/*" onChange={handleImageChange} />
              </div>
            )
          }
          <div className="mb-3">
            <button className="btn btn-dark" onClick={handleImageUpload}>
              Next
            </button>
          </div>
        </div>

      </div>
    ) : !imageUploaded ? (
      <Loader />
    ) : (
      // Ad Information Section
      <div className="mb-2 p-4">
        <h4 className="mb-3">Ad Information</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="adTitle" className="form-label">
              Ad Name
            </label>
            <input
              type="text"
              className="form-control"
              name='title'
              id="adTitle"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && <div className='error'>{formik.errors.title}</div>}

          </div>
          <div className="form-group mb-3">
            <label htmlFor="adSubTitle" className="form-label">
              Sub Title
            </label>
            <textarea
              className="form-control"
              id="adSubTitle"
              name='sub_title'
              rows="4"
              value={formik.values.sub_title}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="adProvider" className="form-label">
              Ad Provider
            </label>
            <input

              className="form-control"
              id="adProvider"
              name='provider'
              value={formik.values.provider}
              onChange={formik.handleChange}
              />
              {formik.touched.provider && formik.errors.provider && <div className='error'>{formik.errors.provider}</div>}
          </div>

          
          <div>
            <button className="btn btn-dark mt-4" type='submit'>
              Submit Ad
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
  )
}

export default Ad