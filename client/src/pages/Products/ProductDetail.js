import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import {ShoppingCartOutlined} from "@ant-design/icons"
import "./Style.css";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
    //eslint-disable-next-line
  }, [params?.slug]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.singleProduct);
      similarProudctHandler(
        data?.singleProduct._id,
        data?.singleProduct.category._id
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product

  const similarProudctHandler = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          {product._id !== undefined && (
            <img
              src={`/api/v1/products/product-photo/${product?._id}`}
              width="100%"
              id="Main Img"
              alt={product?.name}
            />
          )}
        </div>
        <div className="single-pro-details">
          {product && (
            <div key={product._id}>
              <h6>{product?.category?.name}</h6>
              <h4>{product?.name}</h4>
              <h2>RS :{product?.price}</h2>
              <select>
                <option>Select Size</option>
                <option>XL</option>
                <option>XXL</option>
                <option>Small</option>
                <option>Large</option>
              </select>
              <input type="number" defaultValue={1} />
              <button
                className="normal"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added TO Cart");
                }}
              >
                Add To Cart
              </button>
              <h4>Product Details</h4>
              <span>{product?.description}</span>
            </div>
          )}
        </div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Related Product</h2>
        <p>Summer Collection New Arival Desigin</p>

        {relatedProducts?.map((p) => (
          <div 
            key={p._id}
          >
          <Link
            to={`/dashboard/admin/update-product/${p.slug}`}
            className="text-dark"
            style={{ textDecoration: "none" }}
          >
            <div className="proContainer">
              <div className="pro">
                <img
                  src={`/api/v1/products/product-photo/${p._id} `}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="des">
                  <span>{p.name}</span>
                  <h5>{p.description}</h5>
                  <div className="start">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h4>78$</h4>
                </div>
                <Link to="/">
                <ShoppingCartOutlined
                  className="fa"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added TO Cart");
                  }}
                />
                </Link>
              </div>
            </div>
          </Link>
          </div>
        ))}
      </section>

      {/* <div className="row">
        <h3>Related Products</h3>
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/update-product/${p.slug}`}
              className="text-dark"
              style={{ textDecoration: "none" }}
            >
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/products/product-photo/${p._id} `}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added TO Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
    </Layout>
  );
};

export default ProductDetail;
