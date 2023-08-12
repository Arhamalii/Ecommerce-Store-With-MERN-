// import axios from "axios";
// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../../Component/Layout";
// import { useAuth } from "../../../context/auth";
// import "./login.css";

// const Register = () => {
//   const navigate = useNavigate();
//   const Location = useLocation();
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [auth, setAuth] = useAuth();

//   const submintHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         setTimeout(() => {
//           toast.success(res.data.message);
//           setAuth({
//             ...auth,
//             user: res.data.user,
//             token: res.data.token,
//           });
//           localStorage.setItem("auth", JSON.stringify(res.data));
//         }, 50);
//         navigate(Location.state || "/home");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Some thing went wrong");
//     }
//   };

//   return (
//     <Layout tittel={"Login E-commerce"}>
//       <div className="Register">
//         <h2> Login</h2>
//         <Form onSubmit={submintHandler}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Control
//               type="email"
//               placeholder="E-mail"
//               value={email}
//               onChange={(e) => setemail(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setpassword(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <button
//             type="button"
//             onClick={() => {
//               navigate("/forgot-password");
//             }}
//           >
//             Forgot Password
//           </button>
//           <Button variant="dark" type="submit">
//             Login
//           </Button>
//         </Form>
//       </div>
//     </Layout>
//   );
// };

// export default Register;

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../Component/Layout";
import { useAuth } from "../../../context/auth";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
