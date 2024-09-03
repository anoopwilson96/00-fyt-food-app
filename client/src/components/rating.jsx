import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export const StarRating = ({ stars }) => {
  // Create an array of length 5 for the 5-star rating
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5; // Determine if a half star is needed

    // Return the appropriate star based on the rating value
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar />
        ) : stars >= number ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });

  return <div className="flex">{ratingStar}</div>;
};
