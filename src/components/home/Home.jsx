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
import Dropdown from "./Dropdown";
import DropdownSortBy from "./DropdownSortBy";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [search,setSearch] = useState("");
 
  useEffect(() => {
    
    getProducts(sortBy, order, limit,skip)
      .then((response) => setProducts(response.data))
      .catch((err) => setError("Failed to load products!"));
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((err) => setError("Failed to load categories!"));
  }, []);

  //HANDELING THE FILTERS START
  const handleFilters = (myFilters, filterBy) => {
    const newFilters = { ...filters };
    let newOrder = order;
    let newSortBy = sortBy;
    let newSkip = skip ;
    if (filterBy === "category") {
      newSkip = 0
      setSkip(0)
      newFilters[filterBy] = myFilters;
    }
    if (filterBy === "price") {
      newSkip = 0
      setSkip(0);
      newFilters[filterBy] = prices[myFilters].arr;
    
    }
    if(filterBy === "order"){
      newSkip = 0
      setSkip(0);
      newOrder = myFilters ;
      setOrder(myFilters);
    }
    if(filterBy === "sort"){
       newSkip = 0
       setSkip(0);
       newSortBy = myFilters;
        setSortBy(myFilters);
      
    }
    setFilters(newFilters);
    getFilteredProducts(newSkip, limit, newFilters, newOrder, newSortBy)
      .then((response) => setProducts(response.data))
      .catch((err) => setError("Failed to load products!"));
  };
 //HANDELING THE FILTERS END
 //SKIP FOROWARD
 const triggerSkip = ()=>{
  let newSkip = skip ;
   newSkip += limit
 
 if(!(products.length < 5)){
  setSkip(newSkip);
 }else{
  alert("No more products availabe!");
  setSkip(0);
  newSkip = 0
 }

 getFilteredProducts(newSkip, limit, filters, order, sortBy)
 .then((response) => setProducts(response.data))
 .catch((err) => setError("Failed to load products!"));
}

//SKIP BACK
const triggerSkipBack = ()=>{
  let newSkip = skip ;
  newSkip -= limit
 if(skip !== 0 && !(skip < 0)){
  setSkip(newSkip)
 
 

 }else{
  setSkip(0);
  newSkip= 0 ;
 }
 

 getFilteredProducts(newSkip, limit, filters, order, sortBy)
 .then((response) => setProducts(response.data))
 .catch((err) => setError("Failed to load products!"));
}

  // SHOW FILTER STARTS

  const showFilters = () => {
    return (
      <div className="row mb-1">
        <div className="col-sm-2">
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
        <div className="col-sm-4">
          <h5>Filter by price</h5>
          <div className="row">
            <Radiobox
              prices={prices}
              handleFilter={(myFilters) => handleFilters(myFilters, "price")}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <h5>Filtering order of products:</h5>

          <ul>
            {" "}
           <Dropdown handleFilter={(myFilters) => handleFilters(myFilters, "order")} />
          </ul>
        </div>
        <div className="col-sm-2">
          <h5>Filter by Sort:</h5>

          <ul>
            {" "}
           <DropdownSortBy handleFilter={(myFilters) => handleFilters(myFilters, "sort")} />
          </ul>
        </div>
      </div>
    );
  };

  // SHOW FILTER ENDS
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

const handleSearchInput = e =>{
setSearch(e.target.value.toLowerCase());
setSkip(0);
getFilteredProducts(0, 0, filters, order, sortBy)
.then((response) => {
  
  let productss = response.data;

  const filteredFproducts = productss.filter(product=>{
   
    if(product.name.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())){
      return product ;
  }
  })

  if(filteredFproducts.length > 0){
    setError("");
    setProducts(filteredFproducts);
  }else{
    setError("No product found on this name!!")
    setProducts(filteredFproducts);
  }

})
.catch((err) => setError("Failed to load products!"));


}

const handleSearchSubmit = e =>{
e.preventDefault();
setSkip(0);
getFilteredProducts(0, 0, filters, order, sortBy)
.then((response) => {
  
  let productss = response.data;

  const filteredFproducts = productss.filter(product=>{
   
    if(product.name.toLowerCase().trim().includes(search.trim())){
      return product ;
  }
  })

  if(filteredFproducts.length > 0){
    setError("");
    setProducts(filteredFproducts);
  }else{
    setError("No product found on this name!!")
    setProducts(filteredFproducts);
  }

})
.catch((err) => setError("Failed to load products!"));
}


  return (
    <Layout title="Home Page" className="container-fluid">
      {showFilters()}
      <div className="d-flex my-3 justify-content-center">
  <form className="form-inline" onSubmit={e=>handleSearchSubmit(e)}>
    <input className="form-control mr-sm-2" type="search" placeholder="Search products by name" aria-label="Search" onChange={e=>handleSearchInput(e)} />
    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
  </form>
</div>
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
      <div style={{display:"flex",justifyContent:"center",gap:"3rem",marginBottom:"2rem"}}>
      <button type="button" className="h-25 btn btn-info"  onClick={triggerSkipBack} >Go back</button>
      <button type="button" className="h-25 btn btn-info"  onClick={triggerSkip} >Load more..</button>

      </div>
     
    </Layout>
  );
};

export default Home;
