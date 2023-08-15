import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Component/Routes/Private";
import About from "./pages/About/About";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/Register";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Pagenotfound from "./pages/PageNotFound/Pagenotfound";
import Policy from "./pages/Policy/Policy";
import Dashboard from "./pages/users/dashboard";
import AdminRoute from "./Component/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Catageroy from "./pages/Admin/CreateCatageori";
import Product from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Profile from "./pages/users/Profile";
import Orders from "./pages/users/Orders";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />

        </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/catageroy" element={<Catageroy />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/user" element={<User />} />
  
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;
