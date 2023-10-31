import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Form, Link } from "react-router-dom";
import {
  showError,
  showSuccess,
  showLoading,
  showErrors,
} from "../../utils/messages";
import { createProduct, getCategories } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    quantity: "",
    loading: false,
    error: false,
    success: false,
    disabled: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    quantity,
    loading,
    error,
    success,
    formData,
    disabled,
  } = values;

  useEffect(() => {
    getCategories()
      .then((response) => {
        setValues({
          ...values,
          categories: response.data,
          formData: new FormData(),
        });
      })
      .catch((error) => {
        setValues({
          ...values,
          error: "Failed to load form data",
          formData: new FormData(),
        });
      });
  }, []);

  const handleChange = (e) => {
  const value = e.target.name === "photo"?e.target.files[0]:e.target.value ;

  formData.set(e.currentTarget.name,value);
  setValues({
    ...values,
    error:false,
    success:false,
    [e.target.name]:value
  })

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
        ...values,
        error:false,
        success:false,
        loading:true,
        disabled:true
    })
 console.log(formData.get("name"));
    createProduct(userInfo().token,formData)
    .then(response=>{
       setValues({
        ...values,
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        success:true,
        loading:false,
        disabled:false,
        error:false
       })
    })
    .catch(error=>{
        let errMsg = "Something went wrong!"
if(error.response) errMsg = error.response.data;
setValues({
    ...values,
    error:errMsg,
    loading:false,
    disabled:false,
    success:false
})
    })
  };

  const productForm = () => (
    <form method="POST" className="mb-3" onSubmit={e=>handleSubmit(e)}>
      <h4>Photo:</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            onChange={e=>handleChange(e)}
            accept="image/*"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          name="name"
          onChange={e=>handleChange(e)}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description:</label>
        <textarea
          name="description"
          onChange={e=>handleChange(e)}
          className="form-control"
          value={description}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price:</label>
        <input
          name="price"
          onChange={e=>handleChange(e)}
          className="form-control"
          type="number"
          value={price}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity:</label>
        <input
          name="quantity"
          onChange={e=>handleChange(e)}
          className="form-control"
          type="number"
          value={quantity}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category:</label>
        <select
          name="category"
          value={category}
          onChange={e=>handleChange(e)}
          className="form-control"
          required
        >
          <option value="">----Select Category----</option>
          {categories && categories.map((item) => (
            <option value={item._id} key={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-outline-primary"
        type="submit"
        disabled={disabled}
      >
        Create Product
      </button>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Go to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Add a new product">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showErrors(error, error)}
          {showLoading(loading)}
          {showSuccess(success, "Product Added Successfully!")}
          {productForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
