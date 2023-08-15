import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const Header = () => {
  const Navigate= useNavigate()
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Succesfully");
      Navigate("/home")
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link " to="/home">
                home
              </Link>
              <Link className="nav-link " to="/">
                category
              </Link>
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
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin":"user"}`}
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

              <Link className="nav-link " to="/">
                cart (<span>0</span>){" "}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
