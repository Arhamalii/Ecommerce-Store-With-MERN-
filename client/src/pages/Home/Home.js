import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout";
import { prices } from "../../Component/Prices";
import { useCart } from "../../context/Cart";
import "./Home.css";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [catageory, setCatageory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(true);
  const Navigate = useNavigate();

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // get all catagers items from backend
  const getAllCatagers = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data?.success) {
        setCatageory(data.allCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCatagers();
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setButton(true);
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProduct([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  // get all product from backend
  const getAllProducts = async () => {
    try {
      setButton(true);
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/1`);
      setLoading(false);
      setProduct(data?.products);
      setPage(1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      setProduct(null);
      filterProduct();
    }
    // eslint-disable-next-line
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
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setButton(false);
      console.log(data?.products);
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
              {/*                    filter by price                 */}
              <h4 className="mx-3 mt-5">Filter By catageory</h4>
              <div className="d-flex flex-column mx-3">
                {catageory?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handlerFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              {/*                     filter by price                 */}
              <h4 className="mx-3 mt-3 ">Filter By price</h4>
              <div className="d-flex flex-column mx-3">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {prices?.map((p) => (
                    <div key={p.id}>
                      <Radio value={p.array}> {p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column w-50  mt-4  mx-3">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="text-center">
              <h2 className="my-4">Filter Products</h2>
            </div>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div key={p._id}>
                  <div className="card m-2 " style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/products/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      {/* <p className="card-text">{p.category.name}</p> */}
                      <p className="card-text">{p.price}</p>
                      <button
                        className="btn btn-secondary ms-1"
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
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => Navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {button && products && products.length < total && (
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((prev) => prev + 1);
                  }}
                >
                  {loading ? "Loading ......" : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
