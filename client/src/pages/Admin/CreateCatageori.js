import React from "react";
import Layout from "../../Component/Layout";
import Adminmenu from "../../Component/Adminmenu";

const Catageroy = () => {
  return (
    <Layout title={"Create Catageroy"}>
      <div style={{ height: "85vh" }}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3  p-3 m-3">
            <Adminmenu />
          </div>
          <div className="col-md-6  p-3 m-3">Create catageroy</div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catageroy;
