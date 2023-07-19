import React from "react";

const AverageReviewScore = ({ reviews }) => {
  const calculateAverageScore = () => {
    if (reviews.length === 0) {
      return "Be the first to review this book!";
    }

    let totalScore = 0;
    for (let i = 0; i < reviews.length; i++) {
      totalScore += reviews[i].score;
    }

    return totalScore / reviews.length;
  };

  const averageScore = calculateAverageScore();

  return (
    <div>
      {typeof averageScore === "number" ? (
        <p className="font-bold">Rating: {averageScore.toFixed(2)} / 5.00</p>
      ) : (
        <p>{averageScore}</p>
      )}
    </div>
  );
};

export default AverageReviewScore;