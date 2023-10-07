import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePassword, updateUser } from '../../api/user';
import { useAuth } from '../../context/AuthContext';

const ChangePassword = ({ toggleChangePassword }) => {
    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            username: auth.user.username,
            password: '',
            new_password: '',
            confirm_password:'',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Password is required'),
            new_password: Yup.string().required('New password is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
            ),
            confirm_password: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
        const { confirm_password, ...dataToSend } = values;
        handleChangePassword(dataToSend);
        },
    });
    const handleChangePassword = (userData) => {
        changePassword(userData)
            .then((data) => {
                toggleChangePassword();
            })
            .catch((error) => {
                if (error.response.data.detail) {
                    formik.setFieldError('password', 'Invalid Credentials');
                }
                console.error('Error updating user', error);
            })
    }
    return (
        <div className='scrollable-content vh-85 mt-2 mb-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <p className='p-0 m-0' style={{ fontSize: 20 }}>Change Password</p>
                <button
                    type="button"
                    style={{ border: 'none', background: 'transparent' }}
                    onClick={toggleChangePassword}
                >
                    <RxCross1 size={'19px'} color='#5a5d60' />
                </button>
            </div>
            <div className="bottom-divider mb-4"></div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                    <label className="form-label">
                        Old Password
                    </label>
                    <input
                        type="password"
                        className="form-control"    
                        name='password'
                        id="password"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password && <div className='error'>{formik.errors.password}</div>}

                </div>
                <div className="form-group mb-3">
                    <label className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name='new_password'
                        id="newPassword"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.new_password && formik.errors.new_password &&<div className='error'>{formik.errors.new_password}</div>}
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name='confirm_password'
                        id="confirmPassword"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password && <div className='error'>{formik.errors.confirm_password}</div>}
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

export default ChangePassword;