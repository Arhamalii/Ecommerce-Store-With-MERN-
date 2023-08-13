import React from "react";
import Layout from "../../Component/Layout";
import Adminmenu from "../../Component/Adminmenu";

const User = () => {
  return (
    <Layout title={"All Users"}>
      <div style={{ height: "85vh" }}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-8">All users</div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
