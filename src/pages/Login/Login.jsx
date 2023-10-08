import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../api/auth';
import './Login.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast, { ToastBar } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || '/'

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username and password is required'),
      password: Yup.string().required('Username and password is required')
    }),
    onSubmit: async (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = (loginCredentials) => {
    login(loginCredentials)
      .then((data) => {
        auth.login(data);
        setErrorMessage('');
        formik.resetForm();
        toast.success('Logged in');
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        error.code === "ERR_NETWORK"
          ? toast.error(error.message)
          : toast.error(error.response.data.detail)
        // setErrorMessage(error.response?.data.detail);
      });
  }
  return (
    <div className="container-fluid">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label">
            Username
            <input
              type="text"
              name="username"
              className="form-control"
              value={formik.values.username}
              onChange={formik.handleChange} />
          </label>
        </div>

        <div>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange} />
          </label>
        </div>
        {(formik.touched.username && formik.errors.username) || (formik.touched.password && formik.errors.password) ? (
          <div className='error'>{formik.errors.username || formik.errors.password}</div>
        ) : null}
        {errorMessage && <div className='error'>{errorMessage}</div>}
        <div>
          <button className="btn btn-dark" type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;