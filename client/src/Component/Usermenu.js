import React from "react";
import { Link } from "react-router-dom";

const Usermenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 style={{ fontSize: "1.4rem", color: "#333" }}>User Pannel</h4>
          <Link
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action "
            style={{ color: "black", padding: "1rem" }}
          >
            Update Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
            style={{ color: "black", padding: "1rem" }}
          >
            Your Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default Usermenu;
