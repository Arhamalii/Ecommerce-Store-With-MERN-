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

const App = () => {
  return (
    <>
      {/* hello */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;
