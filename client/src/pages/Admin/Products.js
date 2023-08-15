import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/v1/products/get-product");
      setProducts(res.data.allProducts);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <Adminmenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;