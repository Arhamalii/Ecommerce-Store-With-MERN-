import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import useCategory from "../../hooks/useCategory";

const AllCategories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <h2
        className="text-center
      "
      >
        All Categorires{" "}
      </h2>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <button className="btn btn-primary">
                <Link to={`/category/${c.slug}`} className="btn btn-primary">
                  {c.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllCategories;
