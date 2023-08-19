import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/auth";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const Navigate = useNavigate();

  // cart price adding functionality
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // cart remove function
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ minHeight: "85vh" }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You Have ${cart.length} Item In Your Cart 
  ${auth?.token ? "" : "plase login to checkout"}`
                : "your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((p) => (
              <div className="row mb-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"190xp"}
                    width={"70px"}
                  />
                </div>
                <div className="col-md-8 p-3">
                  <p> {p.name}</p>
                  <p> {p.description.substring(0, 30)}</p>
                  <p> Price: {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2> Cart Summaru</h2>
            <p> Total || Payment || checkout </p>
            <hr />
            <h4> Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4> Current Address</h4>
                  <h5> {auth?.user?.address}</h5>
                  <button
                    onClick={() => Navigate("/dashboard/user/profile")}
                    className="btn btn-outline-warning"
                  >
                    {" "}
                    update address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    onClick={() => Navigate("/dashboard/user/profile")}
                    className="btn btn-outline-warning"
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      Navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    {" "}
                    please login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
