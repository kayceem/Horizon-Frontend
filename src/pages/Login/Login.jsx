import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../api/auth';
import './Login.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import CompanyCard from '../../components/CompanyCard/CompanyCard';

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
    <div className="container-fluid login-container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="row" style={{ height: '80vh' }}>
        <div className="col-md-6 d-flex align-items-center flex-column">
          <CompanyCard />
        </div>
        <div className="col-md-6 d-flex align-items-center" >
          <div className="card p-4" style={{ height: '50vh', width: '100%' }}>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit} className='d-flex justify-content-between flex-column' style={{ height: '100%'}}>
                  <div>
                  <div className="form-group login-form-group">
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

                  <div className="form-group login-form-group">
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
                  </div>

                <div className='d-flex align-items-end w-100 justify-content-between'>
                  <button className="btn btn-dark me-3" type='submit'>
                    Login
                  </button>
                  <Link to={'/signup'} className='p-0 m-0 me-5' style={{ textDecoration: 'none', color: 'black' }}>
                    Don't have an account? Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;