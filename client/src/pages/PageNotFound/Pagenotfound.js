import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";

const Pagenotfound = () => {
  return (
    <Layout tittel={"Go-back (page not found 404)"}>
      <div className="container">
        <h2>404</h2>
        <h3>Oops, nothing here...</h3>
        <p>Please Check the URL</p>
        <p>
          Otherwise, <Link to="/home">Click here</Link> to redirect to homepage.
        </p>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
