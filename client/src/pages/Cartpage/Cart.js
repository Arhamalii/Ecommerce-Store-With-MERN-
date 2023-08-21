import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/auth";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
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

  // get payment get way token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  
  // make payment button 
const handelPayment  = async  ()=>{
 try{
  setLoading(true)
  const {nonce} = await instance.requestPaymentMethod()
  setLoading(false)
localStorage.removeItem("cart")
setCart([])
Navigate("/dashboard/user/orders")
toast.success("your order is placed successfully")
const {data} =await axios.post("/api/v1/products/braintree/payment",{
  nonce,cart
})
 }catch(error){
  console.log(error)
  setLoading(false)
 }
}

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
            <h2> Cart Summary</h2>
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
        <div className="mt-2">
        {
          !clientToken || !cart?.length ? (""):(
            <>
            <DropIn
            options={{
              authorization:clientToken,
              paypal:{
                flow:"checkout"
              }
            }}

            onInstance={instance => setInstance(instance)}
          />
          <button className="btn btn-primary" onClick={handelPayment}
          disabled={!instance || !auth?.user?.address}>
          { loading ?  "Processing....":"Make Payment"}
          </button>

            </>
          )
        }
         
        </div>
        </div>
      </div>
          </div>
    </Layout>
  );
};

export default Cart;
