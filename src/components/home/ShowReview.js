import React from "react";

const ShowReview = ({ comments, ratings}) => {
  const loadCommentsToRatings = () => {
    let reviewArr = [];
    for (let c = 0; c < comments.length; c++) {
      for (let r = 0; r < ratings.length; r++) {
        if (
          comments[c].postedBy.toString() === ratings[r].postedBy.toString()
        ) {
          let review = {
            name: comments[c].name,
            comment: comments[c].comment,
            rating: ratings[r].star,
          };
          reviewArr.push(review);
        }
      }
    }
    return reviewArr;
  };

  const loadRatingsToComments = () => {
    let reviewArr = [];
    for (let r = 0; r < ratings.length; r++) {
      for (let c = 0; c < comments.length; c++) {
        if (
          comments[c].postedBy.toString() === ratings[r].postedBy.toString()
        ) {
          let review = {
            name: comments[c].name,
            comment: comments[c].comment,
            rating: ratings[r].star,
          };
          reviewArr.push(review);
        }
      }
    }
    return reviewArr;
  };

  const loadReviewArr = () => {
    if (comments.length > ratings.length) {
      return loadCommentsToRatings();
    } else if (ratings.length > comments.length) {
      return loadRatingsToComments();
    } else {
      return loadCommentsToRatings();
    }
  };

  return (
    <div className="mt-2">
      {loadReviewArr().length > 0? loadReviewArr().map((review) => {
        return (
          <div key={new Date()*Math.random()} className="card mb-2">
            <div className="card-header">
              <strong>{review.name}</strong> 
              <span align="right" className="float-right">
                Rated:{review.rating}
              </span>
            </div>

            <ul className="list-group">
              <li className="list-group-item rounded mb-2">
                {review.comment}
              </li>
            </ul>
          </div>
        );
      }) :<div className="alert alert-warning text-center">No reviews yet!</div>}
    </div>
  );
};

export default ShowReview;
