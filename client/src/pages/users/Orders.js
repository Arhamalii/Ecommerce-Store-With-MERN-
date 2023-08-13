import React from "react";
import Layout from "../../Component/Layout";
import Usermenu from "../../Component/Usermenu";

const Orders = () => {
  return (
    <Layout title={"User Order"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-3 m-3">
            {" "}
            <Usermenu />
          </div>
          <div className="col-md-6 p-3 m-3"><h1> orders</h1></div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
