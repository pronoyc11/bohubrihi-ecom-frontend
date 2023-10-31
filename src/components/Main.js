import { Navigate, Outlet, Route, Routes } from "react-router";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Dashboard from "./user/Dashboard";
import { isAuthenticated, userInfo } from "../utils/auth";
import AdminDashboard from "./admin/AdminDashboard";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import PrivateAdmin from "./privateRoutes/PrivateAdmin";
import PrivateUser from "./privateRoutes/PrivateUser";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import ProductDetails from "./home/ProductDetails";
import Cart from "./order/Cart";
import ShippingAddress from "./order/ShippingAddress";
import Checkout from "./order/Checkout";
import Payment from "./order/Payment";

const Main = () => {

    return (<div>

<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/product/:id" element={<ProductDetails />} />
   

    <Route path="/admin/dashboard" element={<PrivateAdmin />}>
   <Route path="/admin/dashboard" element={<AdminDashboard />} />
   </Route>
    <Route path="/create/category" element={<PrivateAdmin />}>
   <Route path="/create/category" element={<CreateCategory />} />
   </Route>
    <Route path="/create/product" element={<PrivateAdmin />}>
   <Route path="/create/product" element={<CreateProduct />} />
   </Route>
   <Route path="/user/dashboard" element={<PrivateUser />}>
   <Route path="/user/dashboard" element={<Dashboard />} />
   </Route>
   <Route path="/shipping" element={<PrivateUser />}>
   <Route path="/shipping" element={<ShippingAddress />} />
   </Route>
   <Route path="/checkout" element={<PrivateUser />}>
   <Route path="/checkout" element={<Checkout />} />
   </Route>

   <Route path="/cart" element={<PrivateUser />}>
   <Route path="/cart" element={<Cart />} />
   </Route>

   <Route path="/payment" element={<PrivateUser />}>
   <Route path="/payment" element={<Payment />} />
   </Route>



    <Route path="*" element={<Home />} />
</Routes>

    </div>)
}
/*PROTECTED ROUTE E PATH DOUBLE TIME
 DEFINE KORLE SETA RELOAD KORLE AR HOME PAGE E COLE JAOAR
CHANCE THAKE NA*/
/*ALLWAYS REMEMBER TO CREATE COMPONENT WHILE DEFINING  PRIVATE ROUTES */
export default Main;