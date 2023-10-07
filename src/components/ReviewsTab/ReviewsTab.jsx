import React, { useEffect, useState } from 'react'
import { getReceivedReviewsById } from '../../api/reviews';
import Loader from '../Loader/Loader';
import { Card } from 'react-bootstrap';
import Stars from '../Stars/Stars';
import { Link } from 'react-router-dom';


const ReviewsTab = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchReviews = () => {
    setLoading(true);
    getReceivedReviewsById(userId)
      .then((data) => {
        setReviews([...data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

  };
  useEffect(() => {
    return () => {
      fetchReviews();
    }
  }, [])
  return (
    <div className="reviews-tab">
      {
        loading ? (
          <Loader />
        ) : reviews.length === 0 ? (
          <p className='d-flex justify-content-center align-items-center h-80'>No reviews yet :(</p>
        ) : (
          <div className="scrollable-content mt-3">
            {reviews.map((review) => (
              <Card key={review.id} className="mb-3 v-85">
                <Card.Body>
                  <div className='d-flex justify-content-between'>
                    <Link to={`/user/${review.reviewer_id}`}  style={{ textDecoration: 'none' , color:'black'}}>
                      <Card.Title>@{review.reviewer_username}</Card.Title>
                    </Link>
                    <p>{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                  <Card.Subtitle className="mb-2 text-muted"><Stars rating={review.rating} /></Card.Subtitle>
                  <Card.Text>{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default ReviewsTab;