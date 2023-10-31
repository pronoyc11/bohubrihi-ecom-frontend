import { useState, useEffect } from "react";
import Layout from "../Layout";
import Card from "./Card";
import { showError, showErrors, showSuccess } from "../../utils/messages";
import {
  getCategories,
  getProducts,
  getProductDetails,
  getFilteredProducts,
} from "../../api/apiProduct";
import CheckBox from "./CheckBox";
import Radiobox from "./Radiobox";
import { prices } from "../../utils/prices";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(30);
  const [skip, setSkip] = useState(0);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  useEffect(() => {
    getProducts(sortBy, order, limit)
      .then((response) => setProducts(response.data))
      .catch((err) => setError("Failed to load products!"));
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((err) => setError("Failed to load categories!"));
  }, []);
  const handleFilters = (myFilters, filterBy) => {
    const newFilters = { ...filters };
    if (filterBy === "category") {
      newFilters[filterBy] = myFilters;
    }
    if (filterBy === "price") {
      newFilters[filterBy] = prices[myFilters].arr;
    }
    setFilters(newFilters);
    getFilteredProducts(skip, limit, newFilters, order, sortBy)
      .then((response) => setProducts(response.data))
      .catch((err) => setError("Failed to load products!"));
  };
  const showFilters = () => {
    return (
      <div className="row">
        <div className="col-sm-3">
          <h5>Filter by categories:</h5>

          <ul>
            {" "}
            <CheckBox
              categories={categories}
              handleFilters={(myFilters) =>
                handleFilters(myFilters, "category")
              }
            />
          </ul>
        </div>
        <div className="col-sm-5">
          <h5>Filter by price</h5>
          <div className="row">
            <Radiobox
              prices={prices}
              handleFilter={(myFilters) => handleFilters(myFilters, "price")}
            />
          </div>
        </div>
      </div>
    );
  };
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
  return (
    <Layout title="Home Page" className="container-fluid">
      {showFilters()}
      <div style={{ width: "100%" }}>
        {showErrors(error, error)}
        {showSuccess(success, "Added to cart successfully!")}
      </div>
      <div className="row">
        {products &&
          products.map((product) => (
            <Card
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart(product)}
            />
          ))}
      </div>
    </Layout>
  );
};

export default Home;
