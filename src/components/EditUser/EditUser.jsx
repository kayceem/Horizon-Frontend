import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './EditUser.scss';
import { updateUser } from '../../api/user';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const EditUser = ({ toggleEdit }) => {
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      first_name: auth.user.first_name,
      last_name: auth.user.last_name,
      email: auth.user.email,
      contact_number: auth.user.contact_number,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name is required').matches(/^[A-Za-z]+$/, 'First Name must contain only alphabets'),
      last_name: Yup.string().required('Last Name is required').matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabets'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      contact_number: Yup.string()
        .required('Contact Number is required')
        .matches(/^\d{10}$/, 'Contact Number must be exactly 10 digits'),
    }),
    onSubmit: async (values) => {
      handleUserEdit(values);
    },
  });
  const handleUserEdit = (userData) => {
    updateUser(userData)
      .then((data) => {
        auth.setUser(data);
        toast.success('Profile edited succesfully.')
        toggleEdit();
      })
      .catch((error) => {
        if (error.response.data.detail.email){
          formik.setFieldError('email', 'Email already exists');
        }
        if (error.response.data.detail.contact_number){
          formik.setFieldError('contact_number', 'Phone number already exists');
        }
        console.error('Error updating user', error);
      })
  }
  return (
    <div className='scrollable-content vh-85 mt-2 mb-4'>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='p-0 m-0' style={{ fontSize: 20 }}>Edit Profile</p>
        <button
          type="button"
          style={{ border: 'none', background: 'transparent' }}
          onClick={toggleEdit}
        >
          <RxCross1 size={'20px'} color='#5a5d60' />
        </button>
      </div>
      <div className="bottom-divider"></div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name='first_name'
                id="firstName"
                value={formik.values.first_name}
                onChange={formik.handleChange}
              />
              {formik.touched.first_name && formik.errors.first_name && <div className='error'>{formik.errors.first_name}</div>}

            </div>
            <div className="form-group mb-3">
              <label className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name='last_name'
                id="lastName"
                value={formik.values.last_name}
                onChange={formik.handleChange}
              />
              {formik.touched.last_name && formik.errors.last_name && <div className='error'>{formik.errors.last_name}</div>}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name='email'
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">
                Contact Info
              </label>
              <input
                type="text"
                className="form-control"
                name='contact_number'
                id="contactNumber"
                value={formik.values.contact_number}
                onChange={formik.handleChange}
              />
              {formik.touched.contact_number && formik.errors.contact_number && <div className='error'>{formik.errors.contact_number}</div>}
            </div>

            <div>
              <button className="btn btn-dark mt-4" type='submit'>
                Submit
              </button>
            </div>
          </form>
    </div>
  );
};

export default EditUser;