import React from "react";
import Layout from "../../Component/Layout";
import Adminmenu from "../../Component/Adminmenu";

const Product = () => {
  return (
    <Layout title={"Create Product"}>
      <div style={{ height: "85vh" }}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3  p-3 m-3">
            <Adminmenu />
          </div>
          <div className="col-md-8  p-3 m-3">Create product</div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
