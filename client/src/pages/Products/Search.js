import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import { useSearch } from "../../context/search";

const Search = () => {
  const [values] = useSearch();
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
  return (
    // <Layout title={"Search Results"}>
    //   <div className="container">
    //     <div className="text-center">
    //       <h1>Search Products</h1>
    //       <h6>
    //         {values?.results.length < 1
    //           ? "No Product Found"
    //           : ` Total ${values?.results.length} Products`}
    //       </h6>
    //       <div className="d-flex flex-wrap mt-4">
    //         {values.results?.map((p) => (
    //           <Link
    //             key={p._id}
    //             to={`/dashboard/admin/update-product/${p.slug}`}
    //             className="text-dark"
    //             style={{ textDecoration: "none" }}
    //           >
    //             <div className="card m-2" style={{ width: "18rem" }}>
    //               <img
    //                 src={`/api/v1/products/product-photo/${p._id} `}
    //                 className="card-img-top"
    //                 alt={p.name}
    //               />
    //               <div className="card-body">
    //                 <h5 className="card-title">{p.name}</h5>
    //                 <p className="card-text">{p.description}</p>
    //               </div>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </Layout>

    <Layout title={"Search-Products"}>
      <section id="products-header">
        <h2>#findbest</h2>
        <p>Save More with Coupons & upto 70% off</p>
      </section>
      <h2 style={{ marginTop: "4rem", textAlign: "center" }}>
        {values?.results.length < 1
          ? "No Product Found"
          : ` Total ${values?.results.length} Products`}
      </h2>
      <section id="product1_new" className="section-p1">
        <div className="proContainer_new ">
          {values.results?.map((p) => (
            <Link to={`/product/${p.slug}`} style={{ width: "min-content" }}>
              <div className="pro" key={p._id}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="des">
                  <h5>{p.name}</h5>
                  <div className="start">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h4>$ {p.price}</h4>
                </div>
                <Link
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added TO Cart");
                  }}
                >
                  <i className="fa fal fa-shopping-cart" />
                </Link>
              </div>
            </Link>
          ))}
          <div className="mx-auto">
            {button && products && products.length < total && (
              <button
                className="pagination_btn "
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => prev + 1);
                }}
              >
                {loading ? "Loading ......" : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Search;
