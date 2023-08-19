import React from "react";
import Layout from "../../Component/Layout";
import Adminmenu from "../../Component/Adminmenu";

const User = () => {
  return (
    <Layout title={"All Users"}>
      <div style={{ minHeight: "105vh" }}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3  p-3 m-3">
            <Adminmenu />
          </div>
          <div className="col-md-8  p-3 m-3">All users</div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
