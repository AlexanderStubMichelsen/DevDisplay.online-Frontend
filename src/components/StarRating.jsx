import React from 'react';

const StarRating = ({ selectedStars, onRate }) => {
  const totalStars = 5;

  const handleRate = (value) => {
    onRate(value);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleRate(ratingValue)}
            style={{ color: ratingValue <= selectedStars ? 'yellow' : 'gray', cursor: 'pointer' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
