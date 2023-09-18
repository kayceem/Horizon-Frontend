import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../api/auth';
import './Login.scss';
import { useNavigate  } from 'react-router-dom';

const Login = () => {
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();
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
      try {
        await login(values);
        setErrorMessage(''); 
        formik.resetForm();
        navigate('/');
      } catch (error) {
        setErrorMessage(error.response.data.detail);;
      }
    },
  });

  return (
    <div className="login-container">
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          Username
          <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
        </label>
      </div>
      
      <div>
        <label>
          Password
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
        </label>
      </div>
      {(formik.touched.username && formik.errors.username) || (formik.touched.password && formik.errors.password) ? (
  <div className='error'>{formik.errors.username|| formik.errors.password}</div>
): null}
      {errorMessage && <div className='error'>{errorMessage}</div>}
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    </div>
  );
};

export default Login;