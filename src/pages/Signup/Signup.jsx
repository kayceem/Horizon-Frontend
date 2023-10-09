import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../api/user';
import './Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CompanyCard from '../../components/CompanyCard/CompanyCard';
import toast from 'react-hot-toast';


const Signup = () => {
  const navigate = useNavigate();
  const [nextPage, setNextPage] = useState(false);
  const formikInfo = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      contact_number: '',
      email: '',
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
      setNextPage(true);
    },
  });
  const formikCredentials = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required').matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain numbers, underscores, and alphabets').min(6, 'Username must be at least 6 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'At least 8 characters')
        .test(
          'uppercase-lowercase',
          'At least one uppercase and lowercase letter',
          (value) => {
            return /^(?=.*[a-z])(?=.*[A-Z])/.test(value);
          }
        )
        .test(
          'number-special-character',
          'At least one number and special character',
          (value) => {
            return /^(?=.*\d)(?=.*[@$!%*?&])/.test(value);
          }
        ),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Re-enter password'),
    }),
    onSubmit: async (values) => {
      handleCreateUser({ ...formikInfo.values, ...values });
    },
  });
  const handleCreateUser = (userData) => {
    createUser(userData)
      .then(() => {
        formikInfo.resetForm();
        formikCredentials.resetForm();
        navigate('/login');
        toast.success('User created')
      })
      .catch((error) => {
        error.code === "ERR_NETWORK" ?
          toast.error(error.message) : error.response.status === 400 ?
            toast.error(`Already exists: ${error.response.data.detail[0].msg}`) :
            toast.error(error.response.data.detail);
      });
    setNextPage(false);
  }
  return (
    <div className="container-fluid login-container">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="row" style={{ height: '80vh' }}>
        <div className="col-md-6 d-flex align-items-center flex-column">
          <CompanyCard />
        </div>
        <div className="col-md-6 d-flex align-items-center" >
          {/* <div className="card p-2" style={{ height: '100%', width: '100%' }}> */}
          <div className="card p-4" style={{ height: '60vh', width: '100%' }}>
            <div className="card-body">
              {!nextPage ? (
                <form onSubmit={formikInfo.handleSubmit} className='d-flex justify-content-between flex-column' style={{ height: '100%' }}>
                  <div className="form-group sign-up-form-group d-flex">
                    <div className='me-4'>
                      <label className="form-label">
                        First Name
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          value={formikInfo.values.first_name}
                          onChange={formikInfo.handleChange} />
                      </label>
                      {formikInfo.touched.first_name && formikInfo.errors.first_name && <div className='error'>{formikInfo.errors.first_name}</div>}
                    </div>
                    <div className="form-group sign-up-form-group">
                      <label className="form-label">
                        Last Name
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          value={formikInfo.values.last_name}
                          onChange={formikInfo.handleChange} />
                      </label>
                      {formikInfo.touched.last_name && formikInfo.errors.last_name && <div className='error'>{formikInfo.errors.last_name}</div>}
                    </div>
                  </div>
                  <div className="form-group sign-up-form-group">
                    <label className="form-label">
                      Email
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formikInfo.values.email}
                        onChange={formikInfo.handleChange} />
                    </label>
                    {formikInfo.touched.email && formikInfo.errors.email && <div className='error'>{formikInfo.errors.email}</div>}
                  </div>
                  <div className="form-group mb-3 sign-up-form-group">
                    <label className="form-label">
                      Contact Number
                      <input
                        type="text"
                        name="contact_number"
                        className="form-control"
                        value={formikInfo.values.contact_number}
                        onChange={formikInfo.handleChange} />
                    </label>
                    {formikInfo.touched.contact_number && formikInfo.errors.contact_number && <div className='error'>{formikInfo.errors.contact_number}</div>}
                  </div>
                  <div className='d-flex align-items-end w-100 justify-content-between'>
                    <button className="btn btn-dark me-5" type='submit'>Next</button>
                    <Link to={'/login'} className='p-0 m-0 me-5' style={{ textDecoration: 'none', color: 'black' }}>
                      Already have an account? Login
                    </Link>
                  </div>
                </form>

              ) : (

                <form onSubmit={formikCredentials.handleSubmit} className='d-flex justify-content-between flex-column' style={{ height: '100%' }}>
                  <div>
                    <div className="form-group sign-up-form-group">
                      <label className="form-label">
                        Username
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          value={formikCredentials.values.username}
                          onChange={formikCredentials.handleChange} />
                      </label>
                      {formikCredentials.touched.username && formikCredentials.errors.username && <div className='error'>{formikCredentials.errors.username}</div>}
                    </div>

                    <div className="form-group mb-3 sign-up-form-group d-flex">
                      <div className='me-4'>
                        <label className="form-label">
                          Password
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formikCredentials.values.password}
                            onChange={formikCredentials.handleChange} />
                        </label>
                        {formikCredentials.touched.password && formikCredentials.errors.password && <div className='error' style={{ width: '80%' }}>{formikCredentials.errors.password}</div>}
                      </div>
                      <div>
                        <label className="form-label">
                          Confirm Password
                          <input
                            type="password"
                            name="confirm_password"
                            className="form-control"
                            value={formikCredentials.values.confirm_password}
                            onChange={formikCredentials.handleChange} />
                        </label>
                        {formikCredentials.touched.confirm_password && formikCredentials.errors.confirm_password && <div className='error'>{formikCredentials.errors.confirm_password}</div>}
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-end w-100 justify-content-between'>
                    <button className="btn btn-dark me-5" type='submit'>Register</button>
                    <Link to={'/login'} className='p-0 m-0 me-5' style={{ textDecoration: 'none', color: 'black' }}>
                      Already have an account? Login
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;