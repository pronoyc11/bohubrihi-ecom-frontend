import React, { useState, useEffect } from "react";
import { getCartItems, getProfile } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { getCoupon } from "../../api/apiCoupon";

const Checkout = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [values, setValues] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [coupon,setCoupon] = useState('');
  const [couponValue,setCouponValue] = useState(1);
  const [couponMsg,setCouponMsg] = useState(null);

  const { phone, address1, address2, city, postcode, country } = values;

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setOrderItems(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile(userInfo().token)
      .then((response) => setValues(response.data))
      .catch((err) => {});
    loadCart();
  }, []);

  const getOrderTotal = () => {
    const arr = orderItems.map((cartItem) => cartItem.price * cartItem.count);
    let sum = arr.reduce((a, b) => a + b, 0);
  if(couponValue!== 1){
    let discount = Math.round(sum * (couponValue/100));
    sum = sum - discount ;
  }

    return sum;
  };
const handleChange = (e) =>{
setCoupon(e.target.value);
}
const handleSubmit =  (e) =>{
  e.preventDefault();
  getCoupon(coupon).then(response=>{
    if(response.status === 200){
      setCouponValue(response.data.discount);
      setCouponMsg(null);
    }
  }).catch(error=>{
    if(error.response){
      setCouponMsg(error.response.data);
    }
  })
}
  const shippinDetails = () => (
    <>
      To,
      <br /> <b>{userInfo().name}</b>
      <br /> Phone: {phone}
      <br /> {address1}
      {address2 ? (
        <>
          <br />
          {address2}
        </>
      ) : (
        ""
      )}
      <br /> {city}-{postcode}, {country}
    </>
  );

  if (address1 && phone && address2 && city && postcode && country)
    return (
      <>
        <Layout
          title="Checkout"
          description="Complete your order!"
          className="container"
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="#">Order</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Cart</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Shipping Address</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="card mb-5" style={{ height: "auto" }}>
                  <div className="card-header">Shipping Details</div>
                  <div className="card-body">{shippinDetails()}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ height: "auto" }}>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {orderItems.map((item) => (
                        <li
                          key={item._id}
                          className="list-group-item"
                          align="right"
                        >
                          {item.product ? item.product.name : ""} x {item.count}{" "}
                          = ৳ {item.price * item.count}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <span className="float-left">
                      <b>Order Total</b>
                    </span>
                    <span className="float-right">
                      <b>৳ {getOrderTotal()}</b>
                    </span>
                  </div>
                </div>
               
                {couponMsg &&  <><br /><div className="alert alert-danger">{couponMsg}</div></>}
             
                <form onSubmit={e=>handleSubmit(e)} className="form-inline">
                <input
            name="coupon"
            value={coupon}
            placeholder="Type coupon name"
            className="form-control mr-sm-2"
            onChange={e=>handleChange(e)}
           
          />
          <button
            type="submit"
            className="btn btn-outline-primary btn-md my-2 my-sm-0"
          >
          Apply coupon
          </button>
                </form>
                <br />
                <p>
                  <Link className="btn btn-warning btn-md float-right" to="/payment" state={{couponValue:couponValue}}>
                    Make Payment
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  else <></>;
};

export default Checkout;
