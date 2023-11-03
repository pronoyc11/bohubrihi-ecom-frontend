import Layout from "../Layout";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import ShowPurchaseHistory from "./ShowPurchaseHistory";
import { useEffect, useState } from "react";
import { deletetOrders, getOrders } from "../../api/apiOrder";

const Dashboard = () => {
  const { name, email, role } = userInfo();
const [orders,setOrders] = useState([]);
const loadOrderHistory = () =>{
  getOrders(userInfo().token).then(
    response =>{
      if(response.status === 200){
        setOrders(response.data)
      }
    }
    ).catch(error=>{
      console.log(error)
    })
}
  useEffect(()=>{
loadOrderHistory();
  },[])

  const handleDeleteOrder = (ids) =>{

   if(!window.confirm("Clear the purchase history?")) return ;
   deletetOrders(userInfo().token,ids)
   .then(response => loadOrderHistory())
   .catch(err => alert(err))
  }

  const UserLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="#">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="#">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const PurchaseHistory = () => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
     {orders.length===0?<li className="list-group-item">No order history is available</li>:orders.map(order=>{
      return  <ShowPurchaseHistory order={order} handleDeleteOrder={handleDeleteOrder} key={order._id} />
     })}
      </ul>
    </div>
  );

  const UserInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role}</li>
      </ul>
    </div>
  );

  return (
    <Layout title="Dashboard" className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <UserLinks />
        </div>
        <div className="col-sm-9">
          <UserInfo />
          <PurchaseHistory />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
