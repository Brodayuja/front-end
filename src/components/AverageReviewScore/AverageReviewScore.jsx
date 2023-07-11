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
        <h2>Average Review Score: {averageScore.toFixed(2)}</h2>
      ) : (
        <h2>{averageScore}</h2>
      )}
    </div>
  );
};

export default AverageReviewScore;