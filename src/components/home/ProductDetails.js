import { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { getBoughtProducts, getProductDetails } from "../../api/apiProduct";
import { showSuccess, showErrors } from "../../utils/messages";
import { addToCart } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";
import ShowReview from "./ShowReview";
import ReviewForm from "./ReviewForm";

const ProductDetails = (props) => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [reviewSwitch, setReviewSwitch] = useState(false);
  const [reviewOk,setReviewOk] = useState(false);
  const id = params.id;
  const loadProductDetails = (id) => {
    getProductDetails(id)
      .then((response) => {
        setProduct(response.data);
        setComments(response.data.comments);
        setRatings(response.data.ratings);
      })
      .catch((err) => setError("Failed to load product."));
  };
  useEffect(() => {
    loadProductDetails(id);
    getBoughtProducts(userInfo().token).then((response) => {
      if (response.status === 200) {
        let userBoughtProducts = response.data.products;
        userBoughtProducts.forEach(item=>{
    
          if(item.toString()=== id.toString()){
            setReviewOk(true);
          }
        })
      }
    })
    .catch(error=>{
      console.log(error);
      setReviewOk(false);
    });
  }, []);

  const handleAddToCart = (product) => () => {
    if (isAuthenticated()) {
      setError(false);
      setSuccess(false);
      const user = userInfo();
      const cartItem = {
        user: user._id,
        product: product._id,
        price: product.price,
      };
      addToCart(user.token, cartItem)
        .then((response) => {
          setSuccess(true);
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data);
          } else {
            setError("Failed to add product to the cart!");
          }
        });
    } else {
      setSuccess(false);
      setError("Please log in first!");
    }
  };
  //REVIEW FUNCTIONS
  const showReviewToggler = () => {
    setReviewSwitch(!reviewSwitch);
  };
  return (
    <Layout title="Product Page">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Product</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.category ? product.category.name : ""}
          </li>
        </ol>
      </nav>
      <div>
        {showSuccess(success, "Item Added to Cart!")}
        {showErrors(error, error)}
      </div>
      <div className="row container">
        <div className="col-6">
          <img
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            width="100%"
          />
        </div>
        <div className="col-6">
          <h3>{product.name}</h3>
          <span style={{ fontSize: 20 }}>&#2547;</span>
          {product.price}
          <p>
            {product.quantity ? (
              <span className="badge badge-pill badge-primary">In Stock</span>
            ) : (
              <span className="badge badge-pill badge-danger">
                Out of Stock
              </span>
            )}
            <span className="badge badge-pill badge-info ml-1">
              Ratings:{product.totalRating}
            </span>
            <span className="badge badge-pill badge-warning ml-1">
              Sold:{product.sold}
            </span>
          </p>
          <p>{product.description}</p>
          {product.quantity ? (
            <>
              &nbsp;
              <button
                className="btn btn-outline-primary btn-md"
                onClick={handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </>
          ) : (
            ""
          )}
          <br />
          <button
            className="btn btn-outline-info w-75 my-2 ml-5 align-center text-center"
            onClick={showReviewToggler}
          >
            {reviewSwitch ? "Hide reviews" : "See reviews"}
          </button>
          {reviewSwitch && <ShowReview comments={comments} ratings={ratings} />}
         {reviewOk && <ReviewForm id={id} loadProductDetails={loadProductDetails} />}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
