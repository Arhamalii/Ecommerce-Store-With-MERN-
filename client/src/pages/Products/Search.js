import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useSearch } from "../../context/search";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Products</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : ` Total ${values?.results.length} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results?.map((p) => (
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

export default Search;
