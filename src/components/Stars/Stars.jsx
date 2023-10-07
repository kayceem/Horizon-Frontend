import React from 'react'
import ReactStars from 'react-stars';

const Stars = ({rating, size=26, editable=false, half=false, setRating}) => {
  const maxStars=5;

  const handleChange = (new_rating) =>{
    rating=new_rating
    setRating(new_rating)
  }
  
  return (
    <div className='d-flex align-items-center'>
      <ReactStars
      edit={editable}
        half={half}
        value={rating}
        count={maxStars}
        size={size}
        onChange={handleChange}
        color1={'#cbd3e3'}
        color2={'#000000'}
      />
  </div>
  );
}

export default Stars;