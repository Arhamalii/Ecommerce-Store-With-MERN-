import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import useCategory from "../hooks/useCategory";
import SearchForm from "./form/SearchForm";
import { useCart } from "../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const Navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Succesfully");
      Navigate("/home");
    }, 50);
  };

  const dropDownStyle = {
    padding: "1rem 1.2rem",
    color: "#fff",
  };
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/home" className="nav_logo ">
              🛒 Shoppad
            </Link>
          </Navbar.Brand>
          <SearchForm />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link " to="/home">
                home
              </Link>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      to={`/category/category`}
                      className="dropdown-item"
                      style={dropDownStyle}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        to={`/category/${c.slug}`}
                        className="dropdown-item"
                        style={dropDownStyle}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <Link className="nav-link " to="/register">
                    register
                  </Link>
                  <Link className="nav-link " to="/login">
                    login
                  </Link>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          style={dropDownStyle}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="dropdown-item"
                          style={dropDownStyle}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <Badge count={cart?.length} s>
                <Link className="nav-link " to="/cart">
                  cart{" "}
                </Link>
                {/* <Avatar shape="square" size="large" /> */}
              </Badge>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
