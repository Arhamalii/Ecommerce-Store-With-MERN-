import React from "react";
import { Link } from "react-router-dom";

const Usermenu = () => {
  return (
    <>
      <div className="text-center" style={{ height: "85vh" }}>
        <div className="list-group">
          <h4>User Pannel</h4>
          <Link
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
            style={{ color: "black" }}
          >
            profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
            style={{ color: "black" }}
          >
            orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default Usermenu;
