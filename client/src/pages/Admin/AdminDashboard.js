import React from "react";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid" style={{ height: "85vh" }}>
        <div className="row">
          <div className="col-md-3 p-3 m-3">
            {" "}
            <Adminmenu />
          </div>
          <div className="col-md-8 p-3 m-3">
            <div className="card">
              <div className="d-flex">
                <h1>NAME:</h1>
                <h3 className="m-auto"> {auth?.user?.name}</h3>{" "}
              </div>

              <div className="d-flex">
                <h1>E-mail: </h1>
                <h3 className="m-auto"> {auth?.user?.email}</h3>{" "}
              </div>
              <div className="d-flex">
                <h1 className="d-flex">Phone#:</h1>
                <h3 className="m-auto"> {auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
