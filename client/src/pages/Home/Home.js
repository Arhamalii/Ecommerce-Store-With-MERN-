import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import "./Home.css";
import { prices } from "../../Component/Prices";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [catageory, setCatageory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // get all catagers items from backend
  const getAllCatagers = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data.success) {
        setCatageory(data.allCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCatagers();
  }, []);

  // get all product from backend
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      setProduct(data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();

  
  }, [checked, radio]);

  // filter by category

  const handlerFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filter product from backend
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/products/product-filters", {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Home E-Commerce"}>
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "85vh" }}>
          <div className=" col-md-3">
            <div className="text">
              {/*           filter by price                         */}
              <h4>Filter By catageory</h4>
              <div className="d-flex flex-column">
                {catageory.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handlerFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              {/*                     filter by price                 */}
              <h4>Filter By price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {prices?.map((p) => (
                    <div key={p.id}>
                      <Radio value={p.array}> {p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {" "}
            <div className="text-center">
              <h2>All product</h2>
            </div>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div key={p._id}>
                  <div className="card m-2 " style={{ width: "18rem" }}>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
