import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import { createCategory, deleteCategory, getCategory } from '../../api/category';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const Category = () => {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: async (values) => {
            handleCreateCategory(values);
        },
    });

    const fetchCategories = () => {
        setLoading(true);
        getCategory()
            .then((data) => {
                setCategories([...data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteCategory = (id) => {
        deleteCategory(id)
            .then((data) => {
                setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
                toast.success('Category deleted.')
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }
    const handleCreateCategory = (categoryData) => {
        createCategory(categoryData)
            .then((data) => {
                formik.resetForm();
                toast.success('Category added succesfully.')
                fetchCategories();
            })
            .catch((error) => {
                toast.error(error.message);
                console.error('Error creating category:', error);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div className='container-fluid'>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className='scrollable-content vh-85'>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteCategory(category.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group mb-3 w-50">
                                <label htmlFor="categoryName" className="form-label">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='name'
                                    id="categoryName"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.name && formik.errors.name && <div className='error'>{formik.errors.name}</div>}

                            </div>
                            <div>
                                <button className="btn btn-dark mt-4" type='submit'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default Category;