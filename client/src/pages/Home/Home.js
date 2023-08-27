import { Checkbox, Radio, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import { prices } from "../../Component/Prices";
import { useCart } from "../../context/Cart";
import Hero from "../../Component/Hero/Hero";
import Feature from "../../Component/Feature/Feature";
import Banner1 from "../../Component/Banner1/Banner1";
import BnrQform from "../../Component/BannerQeryform/bnrQform";
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
  // FUNCTION FOR DISPLAY ONLY 4 PRODUCT
  const limitedProduct = products.slice(0, 4);
  const newArrival = products.slice( 4,8);

  return (
    <Layout title={"Home E-Commerce"}>

      <Hero />
      <Feature />

      <section id="product1" className="section-p1">
        <h2>Feature Product</h2>
        <p>Summer Collection New Arival Desigin</p>
        <div className="proContainer">
          {limitedProduct.map((p) => (
            <Link to={`/product/${p.slug}`}>
              <div key={p._id} className="pro">
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                />

                <div className="des">
                  <h5>{p.name}</h5>
                  <span>{p.description}</span>
                  <div className="start">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>

                  </div>
                  <h4>${p.price}</h4>
                </div>
                <Link to="/">
                  <ShoppingCartOutlined
                    className="fa"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added TO Cart");
                    }}
                  />
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Banner1 />
      {/* NEW ARRIVAL  */}
      <section id="product1" className="section-p1">
        <h2>New Arival</h2>
        <p>Summer Collection New Arival Desigin</p>
        <div className="proContainer">
          {newArrival.map((p) => (
            <div key={p._id} className="pro">
              <img
                src={`/api/v1/products/product-photo/${p._id}`}
                alt={p.name}
              />

              <div className="des">
                <h5>{p.name}</h5>
                <span>{p.description}</span>
                <div className="start">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4>${p.price}</h4>
              </div>
              <Link to="/product/:slug">
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
          ))}
        </div>
      </section>
      <BnrQform />
    </Layout>
  );
};

export default Home;
