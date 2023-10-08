import React from 'react';
import { useFormik } from 'formik';
import Loader from '../Loader/Loader';
import * as Yup from 'yup';
import { createReview } from '../../api/reviews';
import Stars from '../Stars/Stars';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


const ReviewUser = ({ revieweeId,closeModal }) => {

    const formik = useFormik({
        initialValues: {
            rating: '',
            comment: '',
            reviewee_id:revieweeId
        },
        validationSchema: Yup.object({
            rating: Yup.number().required('Rating is required'),
        }),
        onSubmit: async (values) => {
            giveReview(values);
        },
    });


    const handleRatingChange = (new_rating) =>{
        formik.setFieldValue('rating', new_rating);
    }
    
    const giveReview = (reviewData) => {
        // Call the createProduct API with productData and imageURL
        createReview(reviewData)
            .then((response) => {
                toast.success('Reviewed user succesfully.')
                closeModal();
            })
            .catch((error) => {
                console.error('Error creating review:', error);
            });
    };

    return (
        <div className="container-fluid">
                  <Helmet>
        <title>Review</title>
      </Helmet>
            <div className="mb-2 p-4">
                <Stars rating={formik.values.rating} editable={true} setRating={handleRatingChange} />
                {formik.errors.rating && <div className='error'>{formik.errors.rating}</div>}

                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label">
                            Comment
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            name='comment'
                            id="comment"
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <button className="btn btn-dark mt-2" type='submit'>
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewUser;