import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
const CategoryProduct = () => {
  const params = useParams();

  useEffect(() => {
    if (params.slug) getProductByCatHandler();
    // eslint-disable-next-line
  }, [params.slug]);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const getProductByCatHandler = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Category Wise Products"}>
      <div>
        <div className="container mt-3">
          <div>
            <h4 className="text-center">
              {category.name !== undefined && `Category- ${category?.name}`}
            </h4>

            <div className="row mt-5">
              <h2> {products.length} Products Found</h2>
              <div className="d-flex flex-wrap ">
                <br />
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p.slug}`}
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
                        <button className="btn btn-primary">Add to Cart</button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
