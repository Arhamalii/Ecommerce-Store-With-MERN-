import { Badge } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import useCategory from "../hooks/useCategory";
import { logo } from "../img";
import "./header.css";

const Header = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
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

  return (
    /* <Navbar
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
                      to={`/categories`}
                      className="dropdown-item"
                      style={dropDownStyle}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
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

              <Badge count={cart?.length}>

                <Link className="nav-link " to="/cart">
                  cart
                </Link>
              </Badge>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     */
    <>
      <section id="header">
        <Link to={"/"}>
          <img src={logo} className="logo" alt="" />
        </Link>
        <div>
          <ul
            id="navbar"
            className={open ? "active" : ""}
            style={{ margin: "0" }}
          >
            <li>
              <Link
                className={location.pathname === "/" ? "active" : ""}
                to="/"
              >
                home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={location.pathname === "/products" ? "active" : ""}
              >
                shop
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn">categories</button>
                <div className="dropdown-content">
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link to={`/category/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </div>
              </div>
            </li>

            {!auth.user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className={location.pathname === "/login" ? "active" : ""}
                  >
                    login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={
                      location.pathname === "/register" ? "active" : ""
                    }
                  >
                    register
                  </Link>
                </li>
              </>
            ) : (
              <div className="dropdown">
                <button className="dropbtn"> {auth?.user?.name}</button>
                <div className="dropdown-content">
                  <li>
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </div>
              </div>
            )}
            <Badge count={cart?.length}>
              <li id="lg-bag">
                <Link
                  to="/cart"
                  className={
                    location.pathname === "/addto-cart" ? "active" : ""
                  }
                >
                  <i className="fa fa-thin fa-cart-shopping" />
                </Link>
              </li>
            </Badge>
            <p id="close">
              <i className="fa fa-times" onClick={() => setOpen(false)} />
            </p>
          </ul>
        </div>
        <div id="mobile">
          <Link>
            <i className="fa fa-thin fa-cart-shopping" />
          </Link>
          <i
            id="bar"
            className="fas fa-outdent"
            onClick={() => setOpen(true)}
          />
        </div>
      </section>
    </>
  );
};

export default Header;
