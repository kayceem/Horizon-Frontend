import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../api/user';
import './Signup.scss';
import { useNavigate  } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      first_name: '',                                     
      last_name: '',
      email: '',
      password: '',
      contact_number: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required').matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain numbers, underscores, and alphabets').min(6, 'Username must be at least 6 characters'),
      first_name: Yup.string().required('First Name is required').matches(/^[A-Za-z]+$/, 'First Name must contain only alphabets'),
      last_name: Yup.string().required('Last Name is required').matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabets'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
      ),
      contact_number: Yup.string()
        .required('Contact Number is required')
        .matches(/^\d{10}$/, 'Contact Number must be exactly 10 digits'),
    }),
    onSubmit: async (values) => {
      try {
        await createUser(values);
        formik.resetForm();
        console.log('User created successfully');
        navigate('/login');
      } catch (error) {
        console.log('Error creating user: ', error.message);
      }
    },
  });

  return (
    <div className="signup-container">
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          Username
          <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
        </label>
        {formik.touched.username && formik.errors.username && <div className='error'>{formik.errors.username}</div>}
      </div>
      <div>
        <label>
          First Name
          <input type="text" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
        </label>
        {formik.touched.first_name && formik.errors.first_name && <div className='error'>{formik.errors.first_name}</div>}
      </div>
      <div>
        <label>
          Last Name
          <input type="text" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
        </label>
        {formik.touched.last_name && formik.errors.last_name && <div className='error'>{formik.errors.last_name}</div>}
      </div>
      <div>
        <label>
          Email
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
        </label>
        {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
      </div>
      <div>
        <label>
          Password
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
        </label>
        {formik.touched.password && formik.errors.password && <div className='error'>{formik.errors.password}</div>}
      </div>
      <div>
        <label>
          Contact Number
          <input type="text" name="contact_number" value={formik.values.contact_number} onChange={formik.handleChange} />
        </label>
        {formik.touched.contact_number && formik.errors.contact_number && <div className='error'>{formik.errors.contact_number}</div>}
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    </div>
  );
};

export default Signup;