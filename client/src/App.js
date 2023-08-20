import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./Component/Routes/AdminRoute";
import PrivateRoute from "./Component/Routes/Private";
import About from "./pages/About/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Catageroy from "./pages/Admin/CreateCatageori";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import User from "./pages/Admin/User";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/Register";
import Cart from "./pages/Cartpage/Cart";
import AllCategories from "./pages/Categories/allCategories";
import CategoryProduct from "./pages/Categories/categoryProduct";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Pagenotfound from "./pages/PageNotFound/Pagenotfound";
import Policy from "./pages/Policy/Policy";
import ProductDetail from "./pages/Products/ProductDetail";
import Search from "./pages/Products/Search";
import Orders from "./pages/users/Orders";
import Profile from "./pages/users/Profile";
import Dashboard from "./pages/users/dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-catageroy" element={<Catageroy />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/user" element={<User />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;
