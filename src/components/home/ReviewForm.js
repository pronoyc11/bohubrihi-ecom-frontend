import React, { useState } from "react";
import { doComment, gettAndPutRatings } from "../../api/apiProduct";
import { userInfo } from "../../utils/auth";

const ReviewForm = ({ id, loadProductDetails }) => {
  const [values, setValues] = useState({ rate: 5, comment: "" });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const numRate = parseInt(values.rate);

    gettAndPutRatings(userInfo().token, numRate, id).then((response) => {
      if (response.status === 200) {
        doComment(userInfo().token, id, values.comment).then((response) => {
          if (response.status === 200) {
            loadProductDetails(id);
          }
        });
      }
    });
    setValues({
        rate:5,
        comment:""
    })
  };

  return (
    <div className="border border-secondary rounded mb-5 p-4 pb-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Rate it</label>
          <select
            className="form-control"
            name="rate"
            id="exampleFormControlSelect1"
            onChange={(e) => handleChange(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Your review</label>
          <textarea
            name="comment"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={values.comment}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <button
          type="submit"
          value={values.comment}
          className="btn btn-outline-primary float-right"
        >
          Feedback
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
